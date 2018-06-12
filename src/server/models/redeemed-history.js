const mongoose = require("mongoose")

const redeemedSchema = new mongoose.Schema({
  date: Date,
  redeemable: { type: mongoose.Schema.Types.ObjectId, ref: "User.redeemables" },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User.householdMembers",
  },
  pts: Number,
})

const Redeemed = mongoose.model("Redeemed", redeemedSchema)

module.exports = Redeemed
