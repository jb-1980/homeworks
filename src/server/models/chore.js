const mongoose = require("mongoose")

module.exports = new mongoose.Schema({
  name: String,
  img: String,
  description: String,
  pts: Number,
})
