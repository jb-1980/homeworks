import React from "react"
import ReactModal from "react-modal"
import { StyleSheet, css } from "aphrodite"
import { themeColors } from "../utils"
import IconSelector from "./icon-selector"
import { Mutation } from "react-apollo"

import { GET_MEMBER, GET_HOUSEHOLD } from "../apollo/queries"
import { UPDATE_MEMBER, DELETE_MEMBER } from "../apollo/mutations"

ReactModal.setAppElement("#root")

export default class EditProfileModal extends React.Component {
  state = {
    memberName: this.props.member.name,
    avatars: [
      "batgirl",
      "batman",
      "captain-america",
      "spider-girl",
      "spiderman",
      "supergirl",
      "superman",
      "wonder-woman",
    ],
    selectedAvatar: this.props.member.img,
    memberPts: this.props.member.pts,
    showDeleteUserButton: false,
  }

  handleCloseModal = this.props.onRequestClose

  updateName = event => this.setState({ memberName: event.target.value })

  updateAvatar = selectedAvatar => this.setState({ selectedAvatar })

  updatePts = event => this.setState({ memberPts: Number(event.target.value) })

  revealDeleteUserButton = () => this.setState({ showDeleteUserButton: true })
  hideDeleteUserButton = () => this.setState({ showDeleteUserButton: false })

  render() {
    const { member, history } = this.props
    return (
      <ReactModal
        isOpen={this.props.modalOpen}
        onRequestClose={this.props.onRequestClose}
        style={{
          content: { width: 250, margin: "auto", position: "initial" },
        }}
      >
        <Mutation
          mutation={UPDATE_MEMBER}
          update={(cache, { data: { updateMember } }) => {
            console.log("data", updateMember)
            cache.writeQuery({
              query: GET_MEMBER,
              variables: { id: this.props.memberId },
              data: { member: updateMember },
            })
          }}
          onCompleted={this.handleCloseModal}
        >
          {(updateMember, { loading, error, data }) => (
            <div className={css(styles.modalContainer)}>
              <div className={css(styles.profileContainer)}>
                <IconSelector
                  icons={this.state.avatars}
                  clickHandler={this.updateAvatar}
                  initialIcon={this.state.selectedAvatar}
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={this.state.memberName}
                  onChange={this.updateName}
                  className={css(styles.input)}
                />
                <input
                  type="number"
                  value={this.state.memberPts}
                  onChange={this.updatePts}
                  className={css(styles.input)}
                />
                {error ? (
                  <div style={{ color: "red" }}>Error updating profile!</div>
                ) : (
                  ""
                )}
              </div>
              <div>
                {loading ? (
                  <button className={css(styles.modalButton)}>
                    <i className="fas fa-spinner" />
                  </button>
                ) : (
                  <button
                    className={css(styles.modalButton, styles.primaryButton)}
                    onClick={() =>
                      updateMember({
                        variables: {
                          id: this.props.member.id,
                          name: this.state.memberName,
                          img: this.state.selectedAvatar,
                          pts: this.state.memberPts,
                        },
                      })
                    }
                  >
                    Save
                  </button>
                )}

                <button
                  className={css(styles.modalButton, styles.primaryButton)}
                  onClick={this.handleCloseModal}
                >
                  Close
                </button>
              </div>
              <h6 style={{ color: themeColors.danger, margin: "10px 0 0 0" }}>
                Danger Zone!
              </h6>
              <hr style={{ width: "100%", borderColor: themeColors.danger }} />
              <button
                onClick={this.revealDeleteUserButton}
                className={css(styles.modalButton, styles.dangerButton)}
                style={{
                  display: this.state.showDeleteUserButton ? "none" : null,
                }}
              >
                Delete User
              </button>
              <div
                style={{
                  display: this.state.showDeleteUserButton ? null : "none",
                }}
              >
                <h5>Do you really want to delete {member.name}?</h5>
                <div className={css(styles.deleteButtonGroup)}>
                  <Mutation
                    mutation={DELETE_MEMBER}
                    variables={{ id: member.id }}
                    update={(cache, { data: { deleteMember } }) => {
                      const { household } = cache.readQuery({
                        query: GET_HOUSEHOLD,
                      })
                      cache.writeQuery({
                        query: GET_HOUSEHOLD,
                        data: {
                          household: household.filter(
                            member => member.id !== deleteMember.id
                          ),
                        },
                      })
                    }}
                    onCompleted={() => history.replace("/")}
                  >
                    {(deleteMember, { data }) => (
                      <button
                        className={css(styles.modalButton, styles.dangerButton)}
                        onClick={deleteMember}
                      >
                        Delete
                      </button>
                    )}
                  </Mutation>
                  <button
                    className={css(styles.modalButton, styles.dangerButton)}
                    onClick={this.hideDeleteUserButton}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </Mutation>
      </ReactModal>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "90%",
    fontFamily: "Roboto",
  },
  profileContainer: {
    width: 250,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "7px 10px",
    borderRadius: 5,
    margin: 2,
    border: "1px solid #616161",
    boxSizing: "border-box",
    color: "#616161",
    fontSize: "1.1rem",
    textAlign: "center",
  },
  modalButton: {
    border: "thin solid",
    borderColor: themeColors.textOnSecondary,
    padding: 5,
    margin: 5,
    borderRadius: 5,
    color: themeColors.textOnSecondary,
    fontFamily: "Roboto",
    fontSize: "1.2rem",
  },
  primaryButton: {
    background: themeColors.secondary,
  },
  dangerButton: {
    background: themeColors.danger,
  },
  deleteButtonGroup: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
})
