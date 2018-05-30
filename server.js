const express = require("express")
const { ApolloServer, gql } = require("apollo-server")
const { registerServer } = require("apollo-server-express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const { resolvers } = require("./src/server/resolvers")
const { typeDefs } = require("./src/server/schema")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/graphql"
mongoose.connect(MONGODB_URI)

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
app.use(bodyParser.json())
morgan.token("body", req => JSON.stringify(req.body, null, 2))
app.use(morgan(":method :url :status :response-time :body"))
app.use(express.static("build"))

app.get("*", (req, res) =>
  res.sendFile("./build/index.html", { root: __dirname })
)
registerServer({ server, app })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
