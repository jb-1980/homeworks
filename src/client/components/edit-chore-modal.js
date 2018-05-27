import React from "react"
import ReactModal from "react-modal"
import { StyleSheet, css } from "aphrodite"
import { themeColors } from "../utils"
import IconSelector from "./icon-selector"
import { Mutation } from "react-apollo"

import { GET_CHORES } from "../apollo/queries"
import { UPDATE_CHORE, DELETE_CHORE } from "../apollo/mutations"

ReactModal.setAppElement("#root")

export default class EditChoreModal extends React.Component {
  state = {
    choreName: "",
    choreImg: "",
    choreDescription: "",
    chorePts: 0,
    showDeleteButton: false,
  }

  static getDerivedStateFromProps(props, state) {
    return {
      choreName: props.chore.name,
      choreImg: props.chore.img,
      choreDescription: props.chore.description,
      chorePts: props.chore.pts,
    }
  }

  handleCloseModal = this.props.onRequestClose

  updateChoreName = event => this.setState({ choreName: event.target.value })

  updateChoreImg = choreImg => this.setState({ choreImg })

  updateChoreDescription = event =>
    this.setState({ choreDescription: event.target.value })

  updateChorePoints = event =>
    this.setState({ chorePts: Number(event.target.value) })

  revealDeleteButton = () => this.setState({ showDeleteButton: true })
  hideDeleteButton = () => this.setState({ showDeleteButton: false })

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
              icons={[
                "broom",
                "dish-and-soap",
                "dustpan",
                "iron",
                "laundry-soap",
                "pot",
                "soap",
                "sponge",
                "towell-on-hangar",
                "trash-can",
                "washing-machine",
                "window-squeegee",
                "socks",
                "pink-towell-on-rack",
                "vacuum",
              ]}
              initialIcon={this.state.choreImg}
              clickHandler={this.updateChoreImg}
            />
            <input
              type="text"
              placeholder="Name"
              value={this.state.choreName}
              onChange={this.updateChoreName}
              className={css(styles.input)}
            />
            <input
              type="text"
              placeholder="Description"
              value={this.state.choreDescription}
              onChange={this.updateChoreDescription}
              className={css(styles.input)}
            />
            <input
              type="number"
              placeholder="0"
              value={this.state.chorePts}
              onChange={this.updateChorePoints}
              className={css(styles.input)}
            />
          </div>
          <div>
            <Mutation
              mutation={UPDATE_CHORE}
              update={(cache, { data: { updateChore } }) => {
                const { chores } = cache.readQuery({
                  query: GET_CHORES,
                })
                cache.writeQuery({
                  query: GET_CHORES,
                  data: {
                    chores: chores.map(chore => {
                      if (chore.id === updateChore.id) {
                        return updateChore
                      }
                      return chore
                    }),
                  },
                })
              }}
              onCompleted={() => {
                this.props.onRequestClose()
              }}
            >
              {(updateChore, { data }) => (
                <button
                  onClick={() =>
                    updateChore({
                      variables: {
                        id: this.props.chore.id,
                        name: this.state.choreName,
                        img: this.state.choreImg,
                        description: this.state.choreDescription,
                        pts: this.state.chorePts,
                      },
                    })
                  }
                  className={css(styles.modalButton, styles.primaryButton)}
                >
                  Save
                </button>
              )}
            </Mutation>
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
            onClick={this.revealDeleteButton}
            className={css(styles.modalButton, styles.dangerButton)}
            style={{
              display: this.state.showDeleteButton ? "none" : null,
            }}
          >
            Delete Chore
          </button>
          <div
            style={{
              display: this.state.showDeleteButton ? null : "none",
            }}
          >
            <h5>Do you really want to delete {this.props.chore.name}?</h5>
            <div className={css(styles.deleteButtonGroup)}>
              <Mutation
                mutation={DELETE_CHORE}
                variables={{ id: this.props.chore.id }}
                update={(cache, { data: { deleteChore } }) => {
                  const { chores } = cache.readQuery({
                    query: GET_CHORES,
                  })
                  cache.writeQuery({
                    query: GET_CHORES,
                    data: {
                      chores: chores.filter(
                        chore => chore.id !== deleteChore.id
                      ),
                    },
                  })
                }}
                onCompleted={() => {
                  this.handleCloseModal()
                  this.props.history.replace("/chores")
                }}
              >
                {(deleteChore, { data }) => (
                  <button
                    className={css(styles.modalButton, styles.dangerButton)}
                    onClick={deleteChore}
                  >
                    Delete
                  </button>
                )}
              </Mutation>
              <button
                className={css(styles.modalButton, styles.dangerButton)}
                onClick={this.hideDeleteButton}
              >
                Cancel
              </button>
            </div>
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
