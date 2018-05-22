import React from "react"
import ReactModal from "react-modal"
import { Link } from "react-router-dom"
import { StyleSheet, css } from "aphrodite"
import { themeColors } from "./utils"
import IconSelector from "./components/icon-selector"
import { Query, Mutation } from "react-apollo"

import { GET_REDEEMABLES } from "./apollo/queries"
import { SAVE_REDEEMABLE } from "./apollo/mutations"

ReactModal.setAppElement("#root")

export default class Redeemables extends React.Component {
  defaultState = {
    modalOpen: false,
    addedRedeemableName: "",
    icons: ["money_bag", "computer", "ipad", "tv"],
    selectedIcon: "money_bag",
    cost: 0,
  }

  state = this.defaultState

  handleOpenModal = () => this.setState({ modalOpen: true })

  handleCloseModal = () => this.setState({ modalOpen: false })

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
            <Link key={redeemable.id} to={`/redeemables/edit/${redeemable.id}`}>
              <div className={css(styles.memberContainer)}>
                <img
                  src={`images/${redeemable.img}.png`}
                  alt={redeemable.img}
                  style={{ height: 100, margin: "10px 0 10px 3px" }}
                />
                <div>{redeemable.name}</div>
                <div
                  style={{
                    position: "absolute",
                    left: 160,
                    top: -5,
                    background: themeColors.secondary,
                    color: themeColors.textOnSecondary,
                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 1px 3px 0px",
                    border: "thin solid white",
                    borderRadius: 15,
                    minWidth: 30,
                    padding: "2px 8px",
                  }}
                >
                  {redeemable.cost}
                </div>
              </div>
            </Link>
          ))
        }}
      </Query>
    )

    return (
      <React.Fragment>
        <ReactModal isOpen={this.state.modalOpen}>
          <div className={css(styles.modalContainer)}>
            <div>
              <IconSelector
                icons={this.state.icons}
                clickHandler={this.updateSelectedIcon}
              />
              <input
                type="text"
                id="redeemable-name"
                placeholder="Name"
                value={this.state.addedRedeemableName}
                onChange={this.updateAddRedeemableName}
                style={{ width: "100%" }}
              />
              <input
                type="number"
                id="redeemable-cost"
                placeholder="0"
                value={this.state.cost}
                onChange={this.updateAddRedeemableCost}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div style={{ float: "right" }}>
            <Mutation
              mutation={SAVE_REDEEMABLE}
              update={(cache, { data: { addRedeemable } }) => {
                const { redeemables } = cache.readQuery({
                  query: GET_REDEEMABLES,
                })
                cache.writeQuery({
                  query: GET_REDEEMABLES,
                  data: { redeemables: [...redeemables, addRedeemable] },
                })
              }}
              onCompleted={this.resetState}
            >
              {(addRedeemable, { data }) => (
                <button
                  onClick={() => {
                    addRedeemable({
                      variables: {
                        name: this.state.addedRedeemableName,
                        img: this.state.selectedIcon,
                        cost: this.state.cost,
                      },
                    })
                  }}
                >
                  Save
                </button>
              )}
            </Mutation>
            <button onClick={this.handleCloseModal}>Close</button>
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
  memberContainer: {
    width: 200,
    height: 120,
    display: "flex",
    position: "relative",
    alignItems: "center",
    background: themeColors.primaryLight,
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 3px 0px",
    borderRadius: 5,
    RedeemableSelect: "none",
    cursor: "pointer",
    margin: 20,
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
    height: "90%",
  },
  modalIconImg: {
    height: 200,
  },
  modalIconSelectorButton: {
    fontSize: "5rem",
    background: "none",
    border: 0,
    color: themeColors.primaryDark,
  },
})
