const mongoose = require("mongoose")

const choreSchema = new mongoose.Schema({
  name: String,
  img: String,
  description: String,
  pts: Number,
})

const Chore = mongoose.model("Chore", choreSchema)

module.exports = Chore
