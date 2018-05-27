const mongoose = require("mongoose")

const memberSchema = new mongoose.Schema({
  name: String,
  img: String,
  pts: Number,
})

const Member = mongoose.model("Member", memberSchema)

module.exports = Member
