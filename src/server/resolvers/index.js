const {
  getMembers,
  getMember,
  createMember,
  deleteMember,
  updateMember,
  updateMemberPts,
} = require("../controllers/household-member")
const {
  getRedeemables,
  getRedeemable,
  createRedeemable,
  deleteRedeemable,
  updateRedeemable,
} = require("../controllers/redeemable")
const {
  getChores,
  getChore,
  createChore,
  deleteChore,
  updateChore,
} = require("../controllers/chore")
const {
  getAssignments,
  getAssignment,
  createAssignment,
  deleteAssignment,
  updateAssignment,
} = require("../controllers/assignment")
const {
  getRedeemedForMember,
  createRedeemed,
  updateRedeemed,
  deleteRedeemed,
} = require("../controllers/redeemed-history")

exports.resolvers = {
  Query: {
    // household queries
    household: () => getMembers(),
    member: (root, { id }) => getMember(id),

    // redeemable queries
    redeemables: () => getRedeemables(),
    redeemable: (root, { id }) => getRedeemable(id),

    // chore queries
    chores: () => getChores(),
    chore: (root, { id }) => getChore(id),

    // assignment queries
    assignments: (root, { memberId, date }) =>
      getAssignments(memberId, date).then(assignments => {
        return {
          date,
          assignments,
        }
      }),
    assignment: (root, { id }) => getAssignment(id),

    // redeemed queries
    redeemed: (root, { memberId }) => getRedeemedForMember(memberId),
  },
  Mutation: {
    // Member resolvers
    createMember: (root, { name, img }) =>
      createMember(name, img, 0).then(member => ({
        id: member.id,
        name: member.name,
        img: member.img,
        pts: member.pts,
      })),
    deleteMember: (root, { id }) =>
      deleteMember(id).then(member => ({ id: member.id })),
    updateMember: (root, { id, name, img, pts }) =>
      updateMember(id, name, img, pts),
    updateMemberPts: (root, { id, pts }) => updateMemberPts(id, pts),

    // redeemable resolvers
    createRedeemable: (root, { name, img, cost }) =>
      createRedeemable(name, img, cost).then(redeemable => ({
        id: redeemable.id,
        name: redeemable.name,
        img: redeemable.img,
        cost: redeemable.cost,
      })),
    deleteRedeemable: (root, { id }) =>
      deleteRedeemable(id).then(redeemable => ({ id: redeemable.id })),
    updateRedeemable: (root, { id, name, img, cost }) =>
      updateRedeemable(id, name, img, cost),

    // chore resolvers
    createChore: (root, { name, img, description, pts }) =>
      createChore(name, img, description, pts).then(chore => ({
        id: chore.id,
        name: chore.name,
        description: chore.description,
        img: chore.img,
        pts: chore.pts,
      })),
    deleteChore: (root, { id }) =>
      deleteChore(id).then(chore => ({ id: chore.id })),
    updateChore: (root, { id, name, description, img, pts }) =>
      updateChore(id, name, description, img, pts),

    // assignment resolvers
    createAssignment: (root, { date, memberId, choreId }) =>
      createAssignment(date, memberId, choreId).then(assignment => {
        return {
          id: assignment.id,
          chore: assignment.chore,
          member: assignment.member,
          date: assignment.date.getTime(),
          completed: assignment.completed,
        }
      }),
    deleteAssignment: (root, { id }) =>
      deleteAssignment(id).then(assignment => assignment),
    updateAssignment: (root, { id, completed }) =>
      updateAssignment(id, completed),

    // redeemed resolvers
    createRedeemed: (root, { memberId, redeemableId, date }) =>
      createRedeemed(memberId, redeemableId, date),
  },
}
