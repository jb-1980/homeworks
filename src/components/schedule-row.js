import React from "react"
import ReactModal from "react-modal"
import { StyleSheet, css } from "aphrodite"
import { themeColors, getCurrentSunday, formatDate } from "../utils"
import { Query, Mutation } from "react-apollo"
import Chore from "./chore"
import { GET_CHORES, GET_ASSIGNMENTS } from "../apollo/queries"
import {
  TOGGLE_ASSIGNMENT_COMPLETE,
  CREATE_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  UPDATE_MEMBER_POINTS,
} from "../apollo/mutations"

export default class ScheduleRow extends React.Component {
  state = {
    assignmentModalOpen: false,
  }

  openModal = () => this.setState({ assignChoreModalOpen: true })
  closeModal = () => this.setState({ assignChoreModalOpen: false })

  render() {
    const { assignments, date, member } = this.props
    const d = new Date(d)
    return (
      <React.Fragment>
        <ReactModal isOpen={this.state.assignChoreModalOpen}>
          <Query query={GET_CHORES}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching chores ...</div>
              if (error) return <div>Error fetching chores.</div>

              const chores = data.chores === null ? [] : data.chores
              return (
                <div>
                  <h2>Select chore from list</h2>
                  {chores.map(chore => (
                    <Mutation
                      key={chore.id}
                      mutation={CREATE_ASSIGNMENT}
                      variables={{
                        choreId: chore.id,
                        memberId: member.id,
                        date: date,
                      }}
                      refetchQueries={[
                        {
                          query: GET_ASSIGNMENTS,
                          variables: {
                            memberId: member.id,
                            date: getCurrentSunday(date).getTime(),
                          },
                        },
                      ]}
                      onCompleted={this.closeModal}
                    >
                      {(createAssignment, { loading, error, data }) => {
                        if (loading) return <div>saving ... </div>

                        return (
                          <div onClick={createAssignment}>
                            <Chore chore={chore} />
                          </div>
                        )
                      }}
                    </Mutation>
                  ))}
                </div>
              )
            }}
          </Query>
        </ReactModal>
        <tr>
          <td>{formatDate(new Date(date))}</td>
          <td className={css(styles.choresColumn)}>
            {assignments.map(assignment => (
              <div key={assignment.id} className={css(styles.choreButton)}>
                <Mutation
                  mutation={UPDATE_MEMBER_POINTS}
                  variables={{
                    id: member.id,
                    pts: assignment.completed
                      ? -assignment.chore.pts
                      : assignment.chore.pts,
                  }}
                >
                  {(updateMemberPts, { data }) => {
                    return (
                      <Mutation
                        mutation={TOGGLE_ASSIGNMENT_COMPLETE}
                        variables={{
                          id: assignment.id,
                          completed: !assignment.completed,
                        }}
                      >
                        {(updateAssignment, { loading, error, data }) => {
                          if (loading) return <div>..</div>
                          return (
                            <input
                              type="checkbox"
                              onChange={() => {
                                updateAssignment()
                                updateMemberPts()
                              }}
                              checked={assignment.completed}
                            />
                          )
                        }}
                      </Mutation>
                    )
                  }}
                </Mutation>

                {assignment.chore.name}
                <Mutation
                  mutation={DELETE_ASSIGNMENT}
                  variables={{
                    id: assignment.id,
                  }}
                  refetchQueries={[
                    {
                      query: GET_ASSIGNMENTS,
                      variables: {
                        memberId: member.id,
                        date: getCurrentSunday(date).getTime(),
                      },
                    },
                  ]}
                >
                  {(deleteAssignment, { loading, data }) => {
                    if (loading) return <div>..</div>

                    return <button onClick={deleteAssignment}>x</button>
                  }}
                </Mutation>
              </div>
            ))}

            <div
              className={css(styles.addChoreButton)}
              onClick={this.openModal}
            >
              +
            </div>
          </td>
        </tr>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  addChoreButton: {
    background: themeColors.secondaryDark,
    border: "2px solid",
    borderColor: themeColors.textOnSecondary,
    borderRadius: "50%",
    width: 25,
    height: 25,
    maxWidth: 25,
    minWidth: 25,
    maxHeight: 25,
    minHeight: 25,
    color: themeColors.textOnSecondary,
    fontSize: 25,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    marginLeft: "auto",
    lineHeight: 25,
  },
  choreButton: {
    border: "thin solid",
    borderColor: themeColors.textOnSecondary,
    padding: 5,
    margin: 5,
    borderRadius: 5,
    color: themeColors.textOnSecondary,
    background: themeColors.secondary,
    fontFamily: "Roboto",
    fontSize: "1.2rem",
  },
  choresColumn: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
})
