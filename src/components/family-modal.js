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
      <ReactModal isOpen={this.props.modalOpen}>
        <div className={css(styles.modalContainer)}>
          <div>
            <IconSelector
              icons={this.state.avatars}
              clickHandler={this.updateAvatar}
            />

            <input
              type="text"
              className="form-control"
              id="member-name"
              placeholder="Name"
              value={this.state.userName}
              onChange={this.updateUserName}
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div style={{ float: "right" }}>
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
          <button onClick={this.handleCloseModal}>Close</button>
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
    height: "90%",
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
})
