import React from "react"
import ReactModal from "react-modal"
import { StyleSheet, css } from "aphrodite"
import { themeColors } from "../utils"
import IconSelector from "./icon-selector"
import { Mutation } from "react-apollo"

import { GET_REDEEMABLES } from "../apollo/queries"
import { UPDATE_REDEEMABLE, DELETE_REDEEMABLE } from "../apollo/mutations"

ReactModal.setAppElement("#root")

export default class EditChoreModal extends React.Component {
  state = {
    name: "",
    img: "",
    cost: 0,
    showDeleteButton: false,
  }

  static getDerivedStateFromProps(props, state) {
    return {
      name: props.redeemable.name,
      img: props.redeemable.img,
      cost: props.redeemable.cost,
    }
  }

  handleCloseModal = this.props.onRequestClose

  updateName = event => this.setState({ name: event.target.value })

  updateImg = img => this.setState({ img })

  updateCost = event => this.setState({ cost: Number(event.target.value) })

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
              icons={["money_bag", "computer", "ipad", "tv", "old-tv"]}
              initialIcon={this.state.img}
              clickHandler={this.updateImg}
            />
            <input
              type="text"
              placeholder="Name"
              value={this.state.name}
              onChange={this.updateName}
              className={css(styles.input)}
            />
            <input
              type="number"
              placeholder="0"
              value={this.state.cost}
              onChange={this.updateCost}
              className={css(styles.input)}
            />
          </div>
          <div>
            <Mutation
              mutation={UPDATE_REDEEMABLE}
              update={(cache, { data: { updateRedeemable } }) => {
                const { redeemables } = cache.readQuery({
                  query: GET_REDEEMABLES,
                })
                cache.writeQuery({
                  query: GET_REDEEMABLES,
                  data: {
                    redeemables: redeemables.map(redeemable => {
                      if (redeemable.id === updateRedeemable.id) {
                        return updateRedeemable
                      }
                      return redeemable
                    }),
                  },
                })
              }}
              onCompleted={() => {
                this.props.onRequestClose()
              }}
            >
              {(updateRedeemable, { data }) => (
                <button
                  onClick={() =>
                    updateRedeemable({
                      variables: {
                        id: this.props.redeemable.id,
                        name: this.state.name,
                        img: this.state.img,
                        cost: this.state.cost,
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
            Delete Redeemable
          </button>
          <div
            style={{
              display: this.state.showDeleteButton ? null : "none",
            }}
          >
            <h5>Do you really want to delete {this.props.redeemable.name}?</h5>
            <div className={css(styles.deleteButtonGroup)}>
              <Mutation
                mutation={DELETE_REDEEMABLE}
                variables={{ id: this.props.redeemable.id }}
                update={(cache, { data: { deleteRedeemable } }) => {
                  const { redeemables } = cache.readQuery({
                    query: GET_REDEEMABLES,
                  })
                  cache.writeQuery({
                    query: GET_REDEEMABLES,
                    data: {
                      redeemables: redeemables.filter(
                        redeemable => redeemable.id !== deleteRedeemable.id
                      ),
                    },
                  })
                }}
                onCompleted={() => {
                  this.handleCloseModal()
                  this.props.history.replace("/redeemables")
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
