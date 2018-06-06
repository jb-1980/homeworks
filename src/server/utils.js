exports.isLoggedIn = (req, res, next) => {
  // Store secured url for redirect after successful login
  req.session.lastUrl = req.originalUrl

  //if user autheticated in the session, carry on
  console.log(req.isAuthenticated())
  if (req.isAuthenticated()) return next()

  // if they aren't redirect them to the login page
  res.redirect("/login")
}
