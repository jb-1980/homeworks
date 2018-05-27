const Redeemable = require("../models/redeemable")

exports.getRedeemables = () =>
  Redeemable.find({}, (err, redeemables) => {
    if (err) throw err

    return redeemables
  })

exports.getRedeemable = id =>
  Redeemable.findById(id, (err, redeemable) => {
    if (err) return err

    return redeemable
  })

exports.createRedeemable = (name, img, cost) =>
  Redeemable.create({ name, img, cost })

exports.deleteRedeemable = id => {
  return Redeemable.findByIdAndRemove(id)
}

exports.updateRedeemable = (id, name, img, cost) =>
  Redeemable.findByIdAndUpdate(
    id,
    { name, img, cost },
    { new: true },
    (err, redeemable) => {
      if (err) return err

      return redeemable
    }
  )

exports.updateRedeemableCost = (id, cost) =>
  Redeemable.findByIdAndUpdate(
    id,
    { cost },
    { new: true },
    (err, redeemable) => {
      if (err) return err

      return redeemable
    }
  )
