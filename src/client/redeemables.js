import React from "react"
import ReactModal from "react-modal"
import { Link } from "react-router-dom"
import { StyleSheet, css } from "aphrodite"
import { themeColors } from "./utils"
import IconSelector from "./components/icon-selector"
import { Query, Mutation } from "react-apollo"
import Card from "./components/card"
import EditReemableModal from "./components/edit-redeemable-modal"

import { GET_REDEEMABLES } from "./apollo/queries"
import { CREATE_REDEEMABLE } from "./apollo/mutations"

ReactModal.setAppElement("#root")

export default class Redeemables extends React.Component {
  defaultState = {
    modalOpen: false,
    editModalOpen: false,
    addedRedeemableName: "",
    selectedIcon: "money_bag",
    cost: 0,
    editingRedeemable: {},
  }

  state = this.defaultState

  handleOpenModal = () => this.setState({ modalOpen: true })
  handleCloseModal = () => this.setState({ modalOpen: false })

  openEditModal = () => this.setState({ editModalOpen: true })
  closeEditModal = () => this.setState({ editModalOpen: false })

  setEditingRedeemable = editingRedeemable =>
    this.setState(
      () => ({
        editingRedeemable,
      }),
      this.openEditModal()
    )

  updateAddRedeemableName = event => {
    const addedRedeemableName = event.target.value
    this.setState({ addedRedeemableName })
  }

  updateAddRedeemableCost = event =>
    this.setState({ cost: Number(event.target.value) })

  updateSelectedIcon = selectedIcon => this.setState({ selectedIcon })

  resetState = () => this.setState(this.defaultState)

  render() {
    const portraits = (
      <Query query={GET_REDEEMABLES}>
        {({ loading, error, data }) => {
          if (loading) return <div>Still loading ...</div>
          if (error) return <div>Error fetching data!</div>

          const redeemables = data.redeemables === null ? [] : data.redeemables
          return redeemables.map(redeemable => (
            <div
              key={redeemable.id}
              onClick={() => this.setEditingRedeemable(redeemable)}
            >
              <Card data={redeemable} />
            </div>
          ))
        }}
      </Query>
    )

    return (
      <React.Fragment>
        <EditReemableModal
          modalOpen={this.state.editModalOpen}
          onRequestClose={this.closeEditModal}
          redeemable={this.state.editingRedeemable}
          history={this.props.history}
        />
        <ReactModal
          isOpen={this.state.modalOpen}
          style={{
            content: { width: 250, margin: "auto", position: "initial" },
          }}
          onRequestClose={this.handleCloseModal}
        >
          <div className={css(styles.modalContainer)}>
            <div className={css(styles.profileContainer)}>
              <IconSelector
                icons={["money_bag", "computer", "ipad", "tv", "old-tv"]}
                initialIcon={this.state.selectedIcon}
                clickHandler={this.updateSelectedIcon}
              />
              <input
                type="text"
                placeholder="Name"
                value={this.state.addedRedeemableName}
                onChange={this.updateAddRedeemableName}
                className={css(styles.input)}
              />
              <input
                type="number"
                placeholder="0"
                value={this.state.cost}
                onChange={this.updateAddRedeemableCost}
                className={css(styles.input)}
              />
            </div>
            <div>
              <Mutation
                mutation={CREATE_REDEEMABLE}
                update={(cache, { data: { createRedeemable } }) => {
                  const { redeemables } = cache.readQuery({
                    query: GET_REDEEMABLES,
                  })
                  cache.writeQuery({
                    query: GET_REDEEMABLES,
                    data: { redeemables: [...redeemables, createRedeemable] },
                  })
                }}
                onCompleted={this.resetState}
              >
                {(createRedeemable, { data }) => (
                  <button
                    onClick={() =>
                      createRedeemable({
                        variables: {
                          name: this.state.addedRedeemableName,
                          img: this.state.selectedIcon,
                          cost: this.state.cost,
                        },
                      })
                    }
                    className={css(styles.modalButton)}
                  >
                    Save
                  </button>
                )}
              </Mutation>
              <button
                onClick={this.handleCloseModal}
                className={css(styles.modalButton)}
              >
                Close
              </button>
            </div>
          </div>
        </ReactModal>
        <section>
          <div className={css(styles.container)}>{portraits}</div>
          <button
            className={css(styles.addFamilyButton)}
            onClick={this.handleOpenModal}
          >
            Add redeemable
          </button>
        </section>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "space-around",
    marginTop: 20,
    marginBottom: 20,
  },
  profileContainer: {
    width: 250,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  addFamilyButton: {
    background: themeColors.secondary,
    border: "white",
    borderRadius: 20,
    width: 200,
    height: 50,
    fontSize: "1rem",
    color: themeColors.textOnSecondary,
  },
  modalContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "90%",
    fontFamily: "Roboto",
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
