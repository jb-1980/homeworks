const User = require("../models/user")
const Assignment = require("../models/assignment")

exports.getChores = userid =>
  User.findById(userid)
    .then(user => user.chores)
    .catch(err => err)

exports.getChore = (userid, choreid) =>
  User.findById(userid)
    .then(user => user.chores.id(choreid))
    .catch(err => err)

exports.createChore = (userid, name, img, description, pts) =>
  User.findById(userid)
    .then(user => {
      user.chores.push({
        name,
        img,
        description,
        pts,
      })
      return user.save()
    })
    .then(user => user.chores[user.chores.length - 1])
    .catch(err => err)

exports.deleteChore = (userid, choreid) =>
  User.findById(userid)
    .then(user => {
      user.chores.id(choreid).remove()
      return user.save()
    })
    .then(() => Assignment.deleteOne({ chore: choreid }))
    .then(() => ({ id: choreid }))
    .catch(err => err)

exports.updateChore = (userid, choreid, name, description, img, pts) =>
  User.findById(userid)
    .then(user => {
      const chore = user.chores.id(choreid)
      chore.set({
        name: name ? name : chore.name,
        description: description ? description : chore.description,
        img: img ? img : chore.img,
        pts: pts !== undefined ? pts : chore.pts,
      })
      return user.save()
    })
    .then(user => user.chores.id(choreid))
    .catch(err => err)
