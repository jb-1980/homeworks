const mongoose = require("mongoose")

const redeemedSchema = new mongoose.Schema({
  date: Date,
  redeemable: { type: mongoose.Schema.Types.ObjectId, ref: "Redeemable" },
  member: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
  pts: Number,
})

const Redeemed = mongoose.model("Redeemed", redeemedSchema)

module.exports = Redeemed
