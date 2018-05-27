const { gql } = require("apollo-server")

exports.typeDefs = gql`
  type HouseholdMember {
    id: ID
    name: String
    img: String
    pts: Int
  }

  type Redeemable {
    id: ID
    name: String
    img: String
    cost: Int
  }

  type Chore {
    id: ID
    name: String
    img: String
    description: String
    pts: Int
  }

  type Assignment {
    id: ID
    chore: Chore
    member: HouseholdMember
    date: Float
    completed: Boolean
  }

  type Assignments {
    date: Float
    assignments: [Assignment]
  }

  type Redeemed {
    id: ID
    date: Float
    member: HouseholdMember
    redeemable: Redeemable
    pts: Int
  }

  type Query {
    # member and household queries
    household: [HouseholdMember]
    member(id: ID!): HouseholdMember
    # redeemables queries
    redeemables: [Redeemable]
    redeemable(id: ID!): Redeemable
    # chores queries
    chores: [Chore]
    chore(id: ID!): Chore
    # assignments queries
    assignment(id: ID!): Assignment
    assignments(memberId: ID!, date: Float): Assignments
    # redeemed queries
    redeemed(memberId: ID!): [Redeemed]
  }

  type Mutation {
    # member and household mutations
    createMember(name: String!, img: String!, pts: Int): HouseholdMember
    deleteMember(id: ID!): HouseholdMember
    updateMember(id: ID!, name: String, img: String, pts: Int): HouseholdMember
    updateMemberPts(id: ID!, pts: Int!): HouseholdMember

    # redeemable mutations
    createRedeemable(name: String!, img: String!, cost: Int!): Redeemable
    deleteRedeemable(id: ID!): Redeemable
    updateRedeemable(id: ID!, name: String, img: String, cost: Int): Redeemable

    # chores mutations
    createChore(
      name: String!
      img: String!
      description: String
      pts: Int!
    ): Chore
    deleteChore(id: ID!): Chore
    updateChore(
      id: ID!
      name: String
      description: String
      img: String
      pts: Int
    ): Chore

    # assignments mutations
    createAssignment(date: Float!, memberId: ID!, choreId: ID!): Assignment
    deleteAssignment(id: ID!): Assignment
    updateAssignment(id: ID!, completed: Boolean!): Assignment

    # redeemed mutations
    createRedeemed(memberId: ID!, redeemableId: ID!, date: Float!): Redeemed
  }
`
