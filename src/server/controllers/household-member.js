const User = require("../models/user")

exports.getMembers = userid =>
  User.findById(userid)
    .then(user => user.householdMembers)
    .catch(err => err)

exports.getMember = (userid, memberid) =>
  User.findById(userid)
    .then(user => user.householdMembers.id(memberid))
    .catch(err => err)

exports.createMember = (userid, name, img) =>
  User.findById(userid)
    .then(user => {
      user.householdMembers.push({ name, img, pts: 0 })
      return user.save()
    })
    .then(user => user.householdMembers[user.householdMembers.length - 1])
    .catch(err => err)

exports.deleteMember = (userid, memberid) =>
  User.findById(userid)
    .then(user => {
      user.householdMembers.id(memberid).remove()
      return user.save()
    })
    .then(() => ({ id: memberid }))
    .catch(err => err)

exports.updateMember = (userid, memberid, name, img, pts) =>
  User.findById(userid)
    .then(user => {
      const member = user.householdMembers.id(memberid)
      member.set({
        name: name ? name : member.name,
        img: img ? img : member.img,
        pts: pts !== undefined ? pts : member.pts,
      })
      return user.save()
    })
    .then(user => user.householdMembers.id(memberid))
    .catch(err => err)

exports.updateMemberPts = (userid, memberid, pts) =>
  User.findById(userid)
    .then(user => {
      const member = user.householdMembers.id(memberid)
      member.set({ pts: member.pts + pts })

      return user.save()
    })
    .then(user => user.householdMembers.id(memberid))
    .catch(err => err)
