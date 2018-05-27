const Redeemed = require("../models/redeemed-history")
const Redeemable = require("../models/redeemable")
const Member = require("../models/household-member")

exports.getRedeemedForMember = memberId =>
  Redeemed.find({ member: memberId })
    .populate("member")
    .populate("redeemable")
    .then(redeemed => redeemed)

exports.createRedeemed = (memberId, redeemableId, date) => {
  return Member.findById(memberId).then(member => {
    console.log(member.pts)
    return Redeemable.findById(redeemableId).then(redeemable => {
      member.pts -= redeemable.cost
      if (member.pts < 0)
        throw RangeError(`Cost for ${redeemable.name} exceeds member pts`)
      member.save()

      return Redeemed.create({
        date,
        pts: redeemable.cost,
        member: member.id,
        redeemable: redeemable.id,
      }).then(redeemed => {
        console.log(member.pts)
        redeemed.member = member
        redeemed.redeemable = redeemable
        return redeemed
      })
    })
  })
}
