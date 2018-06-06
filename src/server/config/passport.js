const LocalStrategy = require("passport-local").Strategy
const User = require("../models/user")

module.exports = passport => {
  // =========================================================================
  // passport session startup ================================================
  // =========================================================================
  // required for persistent login sessions
  // we must serialize and unserialize users for sessions

  // used to serialize the user for the session
  passport.serializeUser((user, done) => done(null, user.id))

  // used to deserialize the user after the session terminates
  passport.deserializeUser((userId, done) =>
    User.findById(userId, (err, user) => done(err, user))
  )

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // We want to create separate strategies for sign up and login. We are using
  // named strategies since we have one for login and one for signup. By default
  // if there was no name, it would just be called 'local'

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password
        // to override, uncomment and set the wanted values
        // usernameField: 'email',
        // passwordField: 'password',
        passReqToCallback: true // send entire request to callback
      },
      (req, username, password, done) => {
        process.nextTick(() => {
          // find a user whose username matches the given value from the form
          User.findOne({ "local.username": username }, (err, user) => {
            if (err) return done(err)

            // If we found one, respond that username is not available
            if (user)
              return done(null, false, {
                message: "Sorry, that username is already taken."
              })

            // Since the username is available, we can create a new user
            const newUser = new User()

            // now set up the new user's credentials
            newUser.local.username = username
            newUser.local.username_slug = newUser.slugify(username)
            newUser.local.password = newUser.generateHash(password)
            newUser.local.firstname = req.param("firstname")
            newUser.local.lastname = req.param("lastname")

            // save user and return
            newUser.save(err => {
              if (err) throw err
              return done(null, newUser)
            })
          })
        })
      }
    )
  )

  // ===========================================================================
  // Local Login ===============================================================
  // We want to create separate strategies for sign up and login. We are using
  // named strategies since we have one for login and one for signup. By default
  // if there was no name, it would just be called 'local'

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password
        // to override, uncomment and set the wanted values
        // usernameField: 'email',
        // passwordField: 'password',
        passReqToCallback: true // send entire request to callback
      },
      (req, username, password, done) => {
        process.nextTick(() => {
          // find a user whose username matches the given value from the form
          User.findOne({ "local.username": username }, (err, user) => {
            if (err) return done(err)

            // If we did not find one, respond with error
            if (!user)
              return done(
                null,
                false,
                req.flash("loginMessage", "Username or password is incorrect.")
              )

            // If user is found but the password is wrong
            if (!user.validPassword(password))
              return done(
                null,
                false,
                req.flash("loginMessage", "Username or password is incorrect.")
              )

            // all is well, so return the user
            return done(null, user)
          })
        })
      }
    )
  )
}
