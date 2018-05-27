const Chore = require("../models/chore")

exports.getChores = () =>
  Chore.find({}, (err, chores) => {
    if (err) throw err

    return chores
  })

exports.getChore = id =>
  Chore.findById(id, (err, chore) => {
    if (err) return err

    return chore
  })

exports.createChore = (name, img, description, pts) =>
  Chore.create({ name, img, description, pts })

exports.deleteChore = id => {
  return Chore.findByIdAndRemove(id)
}

exports.updateChore = (id, name, description, img, pts) =>
  Chore.findByIdAndUpdate(
    id,
    { name, img, pts },
    { new: true },
    (err, chore) => {
      if (err) return err

      return chore
    }
  )

exports.updateChoreCost = (id, pts) =>
  Chore.findByIdAndUpdate(id, { pts }, { new: true }, (err, chore) => {
    if (err) return err

    return chore
  })
