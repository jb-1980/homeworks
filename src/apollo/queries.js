import gql from "graphql-tag"

export const GET_HOUSEHOLD = gql`
  {
    household {
      id
      name
      img
      pts
    }
  }
`

export const GET_MEMBER = gql`
  query member($id: ID!) {
    member(id: $id) {
      id
      name
      img
      pts
    }
  }
`

export const GET_REDEEMABLES = gql`
  {
    redeemables {
      id
      name
      img
      cost
    }
  }
`

export const GET_REDEEMABLE = gql`
  query redeemable($id: ID!) {
    redeemable(id: $id) {
      id
      name
      img
      cost
    }
  }
`
