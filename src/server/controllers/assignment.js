const Assignments = require("../models/assignment")
const Member = require("../models/household-member")
const Chore = require("../models/chore")

exports.getAssignments = (memberId, date) => {
  if (date) {
    let startDate = new Date(date)
    let endDate = new Date(date + 7 * 24 * 3600 * 1000)
    return Assignments.find({
      member: memberId,
      date: { $gte: startDate, $lte: endDate },
    })
      .populate("chore")
      .populate("member")
      .then(assignments => assignments)
  }

  return Assignments.find({ member: memberId })
    .populate("chore")
    .populate("member")
    .then(assignments => assignments)
}

exports.getAssignment = id =>
  Assignments.findById(id)
    .populate("chore")
    .populate("member")
    .then(assignment => assignment)

exports.createAssignment = (date, memberId, choreId) => {
  return Member.findById(memberId).then(member => {
    return Chore.findById(choreId).then(chore => {
      return Assignments.create({
        date,
        member: member.id,
        chore: chore.id,
      }).then(assignment => {
        assignment.member = member
        assignment.chore = chore
        return assignment
      })
    })
  })
}

exports.deleteAssignment = id => Assignments.findByIdAndRemove(id)

exports.updateAssignment = (id, completed) =>
  Assignments.findByIdAndUpdate(
    id,
    { completed },
    { new: true },
    (err, assignment) => {
      if (err) return err

      return assignment
    }
  )

exports.updateAssignmentCost = (id, cost) =>
  Assignments.findByIdAndUpdate(
    id,
    { cost },
    { new: true },
    (err, assignment) => {
      if (err) return err

      return assignment
    }
  )
