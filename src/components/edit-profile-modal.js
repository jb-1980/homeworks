import React from "react"
import ReactModal from "react-modal"
import { StyleSheet, css } from "aphrodite"
import { themeColors } from "../utils"
import IconSelector from "./icon-selector"
import { Mutation } from "react-apollo"

import { GET_MEMBER } from "../apollo/queries"
import { UPDATE_MEMBER } from "../apollo/mutations"

ReactModal.setAppElement("#root")

export default class EditProfileModal extends React.Component {
  state = {
    memberName: this.props.memberName,
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
    selectedAvatar: this.props.avatar,
    memberPts: this.props.pts,
  }

  handleCloseModal = this.props.onRequestClose

  updateName = event => this.setState({ memberName: event.target.value })

  updateAvatar = selectedAvatar => this.setState({ selectedAvatar })

  updatePts = event => this.setState({ memberPts: Number(event.target.value) })

  render() {
    return (
      <ReactModal
        isOpen={this.props.modalOpen}
        style={{
          content: { width: 250, margin: "auto", position: "initial" },
        }}
      >
        <Mutation
          mutation={UPDATE_MEMBER}
          update={(cache, { data: { updateMember } }) =>
            cache.writeQuery({
              query: GET_MEMBER,
              variables: { id: this.props.memberId },
              data: { member: updateMember },
            })
          }
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
              <div style={{ float: "right" }}>
                {loading ? (
                  <button className={css(styles.modalButton)}>
                    <i className="fas fa-spinner" />
                  </button>
                ) : (
                  <button
                    className={css(styles.modalButton)}
                    onClick={() =>
                      updateMember({
                        variables: {
                          id: this.props.memberId,
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
                  className={css(styles.modalButton)}
                  onClick={this.handleCloseModal}
                >
                  Close
                </button>
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
  modalAvatarImg: {
    height: 200,
  },
  modalAvatarSelectorButton: {
    fontSize: "5rem",
    background: "none",
    border: 0,
    color: themeColors.primaryDark,
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
    background: themeColors.secondary,
    fontFamily: "Roboto",
    fontSize: "1.2rem",
  },
})
