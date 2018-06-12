import React from "react"
import ReactModal from "react-modal"
import { StyleSheet, css } from "aphrodite"
import { themeColors, imageStrings } from "../utils"
import IconSelector from "./icon-selector"
import { Mutation } from "react-apollo"

import { GET_CHORES } from "../apollo/queries"
import { CREATE_CHORE } from "../apollo/mutations"

ReactModal.setAppElement("#root")

export default class ChoreModal extends React.Component {
  defaultState = {
    choreName: "",
    choreImg: "broom",
    choreDescription: "",
    chorePts: 0
  }

  state = this.defaultState

  handleCloseModal = this.props.onRequestClose

  updateChoreName = event => this.setState({ choreName: event.target.value })

  updateChoreImg = choreImg => this.setState({ choreImg })

  updateChoreDescription = event =>
    this.setState({ choreDescription: event.target.value })

  updateChorePoints = event =>
    this.setState({ chorePts: Number(event.target.value) })

  resetState = () => this.setState(this.defaultState)

  render() {
    return (
      <ReactModal
        isOpen={this.props.modalOpen}
        onRequestClose={this.props.onRequestClose}
        style={{
          content: { width: 250, margin: "auto", position: "initial" }
        }}
      >
        <div className={css(styles.modalContainer)}>
          <div className={css(styles.profileContainer)}>
            <IconSelector
              icons={imageStrings.chores}
              clickHandler={this.updateChoreImg}
              initialIcon={this.state.choreImg}
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
              mutation={CREATE_CHORE}
              update={(cache, { data: { createChore } }) => {
                const { chores } = cache.readQuery({
                  query: GET_CHORES
                })
                cache.writeQuery({
                  query: GET_CHORES,
                  data: { chores: [...chores, createChore] }
                })
              }}
              onCompleted={() => {
                this.resetState()
                this.props.onRequestClose()
              }}
            >
              {(createChore, { data }) => (
                <button
                  onClick={() =>
                    createChore({
                      variables: {
                        name: this.state.choreName,
                        img: this.state.choreImg,
                        description: this.state.choreDescription,
                        pts: this.state.chorePts
                      }
                    })
                  }
                  className={css(styles.modalButton)}
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
    fontFamily: "Roboto"
  },
  profileContainer: {
    width: 250,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
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
    textAlign: "center"
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
    fontSize: "1.2rem"
  }
})
