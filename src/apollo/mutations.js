import gql from "graphql-tag"

export const SAVE_MEMBER = gql`
  mutation addMember($name: String!, $img: String!, $pts: Int) {
    addMember(name: $name, img: $img, pts: $pts) {
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

export const SAVE_REDEEMABLE = gql`
  mutation addRedeemable($name: String!, $img: String!, $cost: Int!) {
    addRedeemable(name: $name, img: $img, cost: $cost) {
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
