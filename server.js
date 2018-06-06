const express = require("express")
const { ApolloServer, gql } = require("apollo-server")
const { registerServer } = require("apollo-server-express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const { resolvers } = require("./src/server/resolvers")
const { typeDefs } = require("./src/server/schema")
const { isLoggedIn } = require("./src/server/utils")
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
const configPassport = require("./src/server/config/passport")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/graphql"
mongoose.connect(MONGODB_URI)

configPassport(passport)

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json())
app.use(
  session({
    secret: "6qgGTS623NI8o39Nqo65lawwpR4Z5twp",
    resave: false,
    saveUninitialized: false
  })
)
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

morgan.token("body", req => JSON.stringify(req.body, null, 2))
app.use(morgan(":date[iso] :method :url :status :response-time :body"))
app.use(express.static("build", { index: "_" }))
app.set("views", "./src/server/views")
app.set("view engine", "pug")

app
  .route("/login")
  .get((req, res) =>
    res.render("login", { message: req.flash("message"), user: req.user })
  )
  .post(
    passport.authenticate("local-login", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
    })
  )

app
  .route("/signup")
  .get((req, res) =>
    res.render("signup", {
      message: req.flash("message"),
      user: req.user
    })
  )
  .post(
    passport.authenticate("local-signup", {
      successRedirect: "/",
      failureRedirect: "/signup",
      failureFlash: true
    })
  )

app.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/")
})

app.get("*", isLoggedIn, (req, res) =>
  res.sendFile("./build/index.html", { root: __dirname })
)

registerServer({ server, app, path: "/graphql" })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
