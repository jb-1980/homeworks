const User = require("../models/user")

exports.getRedeemables = userid =>
  User.findById(userid)
    .then(user => user.redeemables)
    .catch(err => err)

exports.getRedeemable = (userid, redeemableid) =>
  User.findById(userid)
    .then(user => user.redeemables.id(redeemableid))
    .catch(err => err)

exports.createRedeemable = (userid, name, img, cost) =>
  User.findById(userid)
    .then(user => {
      user.redeemables.push({ name, img, cost })
      return user.save()
    })
    .then(user => user.redeemables[user.redeemables.length - 1])
    .catch(err => err)

exports.deleteRedeemable = (userid, redeemableid) =>
  User.findById(userid)
    .then(user => {
      user.redeemables.id(redeemableid).remove()
      return user.save()
    })
    .then(() => ({ id: redeemableid }))
    .catch(err => err)

exports.updateRedeemable = (userid, redeemableid, name, img, cost) =>
  User.findById(userid)
    .then(user => {
      const redeemable = user.redeemables.id(redeemableid)
      redeemable.set({
        name: name ? name : redeemable.name,
        img: img ? img : redeemable.img,
        cost: cost !== undefined ? cost : redeemable.pts,
      })
      return user.save()
    })
    .then(user => user.redeemables.id(redeemableid))
    .catch(err => err)

exports.updateRedeemableCost = (userid, redeemableid, cost) =>
  User.findById(userid)
    .then(user => {
      const redeemable = user.redeemables.id(redeemableid)
      redeemable.set({ cost })

      return user.save()
    })
    .then(user => user.redeemables.id(redeemableid))
    .catch(err => err)
