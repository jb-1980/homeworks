import gql from "graphql-tag"

export const CREATE_MEMBER = gql`
  mutation createMember($name: String!, $img: String!, $pts: Int) {
    createMember(name: $name, img: $img, pts: $pts) {
      id
      name
      img
      pts
    }
  }
`

export const UPDATE_MEMBER = gql`
  mutation updateMember($id: ID!, $name: String, $img: String, $pts: Int) {
    updateMember(id: $id, name: $name, img: $img, pts: $pts) {
      id
      name
      img
      pts
    }
  }
`

export const DELETE_MEMBER = gql`
  mutation deleteMember($id: ID!) {
    deleteMember(id: $id) {
      id
    }
  }
`

export const CREATE_REDEEMABLE = gql`
  mutation createRedeemable($name: String!, $img: String!, $cost: Int!) {
    createRedeemable(name: $name, img: $img, cost: $cost) {
      id
      name
      img
      cost
    }
  }
`

export const DELETE_REDEEMABLE = gql`
  mutation deleteRedeemable($id: ID!) {
    deleteRedeemable(id: $id) {
      id
    }
  }
`

export const UPDATE_REDEEMABLE = gql`
  mutation updateRedeemable($id: ID!, $name: String, $img: String, $cost: Int) {
    updateRedeemable(id: $id, name: $name, img: $img, cost: $cost) {
      id
      name
      img
      cost
    }
  }
`
export const CREATE_CHORE = gql`
  mutation createChore(
    $name: String!
    $img: String!
    $description: String
    $pts: Int!
  ) {
    createChore(name: $name, img: $img, description: $description, pts: $pts) {
      id
      name
      img
      description
      pts
    }
  }
`

export const DELETE_CHORE = gql`
  mutation deleteChore($id: ID!) {
    deleteChore(id: $id) {
      id
    }
  }
`

export const UPDATE_CHORE = gql`
  mutation updateChore(
    $id: ID!
    $name: String
    $img: String
    $description: String
    $pts: Int
  ) {
    updateRedeemable(
      id: $id
      name: $name
      img: $img
      description: $description
      pts: $pts
    ) {
      id
      name
      description
      img
      pts
    }
  }
`
