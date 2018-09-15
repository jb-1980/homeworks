exports.MONGODB_URI = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : "mongodb://localhost/homeworks"
exports.IS_PRODUCTION = process.env.NODE_ENV === "production"
exports.SESSION_SECRET = process.env.NODE_SECRET
  ? process.env.NODE_SECRET
  : "6qgGTS623NI8o39Nqo65lawwpR4Z5twp"
