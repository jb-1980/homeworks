const mongoose = require("mongoose")

// mongoose.model("Chore", Chore)
// mongoose.model("Member", Member)

const assignmentSchema = new mongoose.Schema({
  date: Date,
  chore: { type: mongoose.Schema.Types.ObjectId, ref: "Chore" },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
  completed: { type: Boolean, default: false },
})

const Assignment = mongoose.model("Assignment", assignmentSchema)

module.exports = Assignment
