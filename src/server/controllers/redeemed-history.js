const Redeemed = require("../models/redeemed-history")
const User = require("../models/user")

exports.getRedeemedForMember = (userid, memberid) =>
  User.findById(userid)
    .then(user =>
      Redeemed.find({ member: memberid }).then(redeemeds =>
        redeemeds.map(redeemed => ({
          id: redeemed.id,
          date: redeemed.date,
          redeemable: user.redeemables.id(redeemed.redeemable),
          member: user.householdMembers.id(redeemed.member),
          pts: redeemed.pts,
        }))
      )
    )
    .catch(err => err)

exports.createRedeemed = (userid, memberid, redeemableid, date) =>
  User.findById(userid)
    .then(user => {
      const cost = user.redeemables.id(redeemableid).cost
      const member = user.householdMembers.id(memberid)

      member.pts -= cost
      return user.save()
    })
    .then(user =>
      Redeemed.create({
        date,
        pts: user.redeemables.id(redeemableid).cost,
        member: memberid,
        redeemable: redeemableid,
      }).then(redeemed => ({
        id: redeemed.id,
        date: redeemed.date,
        redeemable: user.redeemables.id(redeemed.redeemable),
        member: user.householdMembers.id(redeemed.member),
        pts: redeemed.pts,
      }))
    )
    .catch(err => err)
