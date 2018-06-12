const mongoose = require("mongoose")
const User = require("../models/user")
const Assignments = require("../models/assignment")
const Member = require("../models/household-member")
const Chore = require("../models/chore")

const choreModel = mongoose.model("Chore", Chore)
const memberModel = mongoose.model("Member", Member)

exports.getAssignments = (userid, memberId, date) =>
  User.findById(userid)
    .then(user => {
      if (date) {
        let startDate = new Date(date)
        let endDate = new Date(date + 7 * 24 * 3600 * 1000)
        return Assignments.find({
          member: memberId,
          date: { $gte: startDate, $lte: endDate },
        }).then(assignments =>
          assignments.map(assignment => ({
            id: assignment.id,
            chore: user.chores.id(assignment.chore),
            member: user.householdMembers.id(assignment.member),
            date: assignment.date,
            completed: assignment.completed,
          }))
        )
      }

      return Assignments.find({ member: memberId }).then(assignments =>
        assignments.map(assignment => ({
          id: assignment.id,
          chore: user.chores.id(assignment.chore),
          member: user.householdMembers.id(assignment.member),
          date: assignment.date,
          completed: assignment.completed,
        }))
      )
    })
    .catch(err => err)

exports.getAssignment = (userid, id) =>
  User.findById(userid)
    .then(user =>
      Assignments.findById(id).then(assignment => ({
        id: assignment.id,
        chore: user.chores.id(assignment.chore),
        member: user.householdMembers.id(assignment.member),
        date: assignment.date,
        completed: assignment.completed,
      }))
    )
    .catch(err => err)

exports.createAssignment = (userid, date, memberId, choreId) =>
  User.findById(userid)
    .then(user =>
      Assignments.create({
        date,
        member: mongoose.mongo.ObjectId(memberId),
        chore: mongoose.mongo.ObjectId(choreId),
      }).then(assignment => ({
        id: assignment.id,
        chore: user.chores.id(choreId),
        member: user.householdMembers.id(memberId),
        date: assignment.date,
        completed: assignment.completed,
      }))
    )
    .catch(err => err)

exports.deleteAssignment = id => Assignments.findByIdAndRemove(id)

exports.updateAssignment = (userid, id, completed) =>
  User.findById(userid)
    .then(user =>
      Assignments.findByIdAndUpdate(
        id,
        { completed },
        { new: true },
        (err, assignment) => {
          if (err) return err

          return {
            id: assignment.id,
            date: assignment.date,
            chore: user.chores.id(assignment.chore),
            member: user.householdMembers.id(assignment.member),
            completed: assignment.completed,
          }
        }
      )
    )
    .catch(err => err)
