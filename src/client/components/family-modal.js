import React from "react"
import ReactModal from "react-modal"
import { StyleSheet, css } from "aphrodite"
import { themeColors } from "../utils"
import IconSelector from "./icon-selector"
import { Mutation } from "react-apollo"

import { GET_HOUSEHOLD } from "../apollo/queries"
import { CREATE_MEMBER } from "../apollo/mutations"

ReactModal.setAppElement("#root")

export default class FamilyModal extends React.Component {
  defaultState = {
    userName: "",
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
    selectedAvatar: "batgirl",
  }

  state = this.defaultState

  handleCloseModal = this.props.onRequestClose

  updateUserName = event => this.setState({ userName: event.target.value })

  updateAvatar = selectedAvatar => this.setState({ selectedAvatar })

  resetState = () => this.setState(this.defaultState)

  render() {
    return (
      <ReactModal
        isOpen={this.props.modalOpen}
        onRequestClose={this.props.onRequestClose}
        style={{
          content: { width: 250, margin: "auto", position: "initial" },
        }}
      >
        <div className={css(styles.modalContainer)}>
          <div className={css(styles.profileContainer)}>
            <IconSelector
              icons={this.state.avatars}
              initialIcon={this.state.selectedAvatar}
              clickHandler={this.updateAvatar}
            />
            <input
              type="text"
              placeholder="Name"
              value={this.state.userName}
              onChange={this.updateUserName}
              className={css(styles.input)}
            />
          </div>
          <div>
            <Mutation
              mutation={CREATE_MEMBER}
              update={(cache, { data: { createMember } }) => {
                const { household } = cache.readQuery({ query: GET_HOUSEHOLD })
                cache.writeQuery({
                  query: GET_HOUSEHOLD,
                  data: { household: [...household, createMember] },
                })
              }}
              onCompleted={() => {
                this.resetState()
                this.handleCloseModal()
              }}
            >
              {(createMember, { data }) => (
                <button
                  className={css(styles.modalButton)}
                  onClick={() =>
                    createMember({
                      variables: {
                        name: this.state.userName,
                        img: this.state.selectedAvatar,
                        pts: 0,
                      },
                    })
                  }
                >
                  Save
                </button>
              )}
            </Mutation>
            <button
              className={css(styles.modalButton)}
              onClick={this.handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
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
    background: themeColors.secondary,
    fontFamily: "Roboto",
    fontSize: "1.2rem",
  },
})
