const Member = require("../models/household-member")

exports.getMembers = () =>
  Member.find({}, (err, members) => {
    if (err) throw err

    return members
  })

exports.getMember = id =>
  Member.findById(id, (err, member) => {
    if (err) return err

    return member
  })

exports.createMember = (name, img, pts) => Member.create({ name, img, pts })

exports.deleteMember = id => {
  return Member.findByIdAndRemove(id)
}

exports.updateMember = (id, name, img, pts) =>
  Member.findByIdAndUpdate(
    id,
    { name, img, pts },
    { new: true },
    (err, member) => {
      if (err) return err

      return member
    }
  )

exports.updateMemberPts = (id, pts) => {
  return Member.findById(id).then(member => {
    member.pts += pts
    member.save()
    return member
  })
}
