const mongoose = require("mongoose")

const redeemableSchema = new mongoose.Schema({
  name: String,
  img: String,
  cost: Number,
})

const Redeemable = mongoose.model("Redeemable", redeemableSchema)

module.exports = Redeemable
