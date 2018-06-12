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
    household: (root, _, { user }) => getMembers(user.id),
    member: (root, { id }, { user }) => getMember(user.id, id),

    // redeemable queries
    redeemables: (root, _, { user }) => getRedeemables(user.id),
    redeemable: (root, { id }, { user }) => getRedeemable(user.id, id),

    // chore queries
    chores: (root, _, { user }) => getChores(user.id),
    chore: (root, { id }, { user }) => getChore(user.id, id),

    // assignment queries
    assignments: (root, { memberId, date }, { user }) =>
      getAssignments(user.id, memberId, date).then(assignments => {
        return {
          date,
          assignments,
        }
      }),
    assignment: (root, { id }, { user }) => getAssignment(user.id, id),

    // redeemed queries
    redeemed: (root, { memberId }, { user }) =>
      getRedeemedForMember(user.id, memberId),
  },
  Mutation: {
    // Member resolvers
    createMember: (root, { name, img }, { user }) =>
      createMember(user.id, name, img, 0),
    deleteMember: (root, { id }, { user }) => deleteMember(user.id, id),
    updateMember: (root, { id, name, img, pts }, { user }) =>
      updateMember(user.id, id, name, img, pts),
    updateMemberPts: (root, { id, pts }, { user }) =>
      updateMemberPts(user.id, id, pts),

    // redeemable resolvers
    createRedeemable: (root, { name, img, cost }, { user }) =>
      createRedeemable(user.id, name, img, cost),
    deleteRedeemable: (root, { id }, { user }) => deleteRedeemable(user.id, id),
    updateRedeemable: (root, { id, name, img, cost }, { user }) =>
      updateRedeemable(user.id, id, name, img, cost),

    // chore resolvers
    createChore: (root, { name, img, description, pts }, { user }) =>
      createChore(user.id, name, img, description, pts),
    deleteChore: (root, { id }, { user }) => deleteChore(user.id, id),
    updateChore: (root, { id, name, description, img, pts }, { user }) =>
      updateChore(user.id, id, name, description, img, pts),

    // assignment resolvers
    createAssignment: (root, { date, memberId, choreId }, { user }) =>
      createAssignment(user.id, date, memberId, choreId),
    deleteAssignment: (root, { id }) =>
      deleteAssignment(id).then(assignment => assignment),
    updateAssignment: (root, { id, completed }, { user }) =>
      updateAssignment(user.id, id, completed),

    // redeemed resolvers
    createRedeemed: (root, { memberId, redeemableId, date }, { user }) =>
      createRedeemed(user.id, memberId, redeemableId, date),
  },
}
