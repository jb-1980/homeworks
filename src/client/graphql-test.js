import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"

export default () => (
  <Query
    query={gql`
      {
        family {
          name
          img
          pts
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <div>Still loading ...</div>
      if (error) return <div>Error fetching data!</div>

      return data.family.map(member => (
        <div key={member.name}>
          <img style={{ height: 200 }} src={`/images/${member.img}.png`} />
          <h4>{member.name}</h4>
          <h4>{member.pts}</h4>
        </div>
      ))
    }}
  </Query>
)
