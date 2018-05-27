import React from "react"
import { StyleSheet, css } from "aphrodite"
import { themeColors } from "../utils"
import IconSelector from "./icon-selector"
import { Query, Mutation } from "react-apollo"

import { GET_REDEEMABLE, GET_REDEEMABLES } from "../apollo/queries"
import { DELETE_REDEEMABLE, UPDATE_REDEEMABLE } from "../apollo/mutations"

export default class Redeemable extends React.Component {
  defaultState = {
    updateRedeemableName: "",
    icons: ["money_bag", "computer", "ipad", "tv"],
    selectedIcon: "",
    cost: 0,
  }

  state = this.defaultState

  updateSelectedIcon = selectedIcon => this.setState({ selectedIcon })

  updateName = event =>
    this.setState({ updateRedeemableName: event.target.value })

  updateCost = event => this.setState({ cost: event.target.value })

  resetState = () => this.setState(this.defaultState)

  render() {
    const { match, history } = this.props
    return (
      <Query
        query={GET_REDEEMABLE}
        variables={{ id: match.params.redeemableId }}
      >
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching redeemable ...</div>
          if (error) return <div>Error fetching redeemable!</div>

          const redeemable = data.redeemable === null ? {} : data.redeemable
          return (
            <React.Fragment>
              <div>
                <IconSelector
                  icons={this.state.icons}
                  initialIcon={redeemable.icon}
                  clickHandler={this.updateSelectedIcon}
                />
                <input
                  type="text"
                  id="redeemable-name"
                  placeholder={redeemable.name}
                  value={this.state.updateRedeemableName}
                  onChange={this.updateName}
                  style={{ width: "100%" }}
                />
                <input
                  type="number"
                  id="redeemable-cost"
                  placeholder={redeemable.cost}
                  value={this.state.cost}
                  onChange={this.updateCost}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ float: "right" }}>
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
                >
                  {(updateRedeemable, { data }) => (
                    <button
                      onClick={() => {
                        updateRedeemable({
                          variables: {
                            id: redeemable.id,
                            name: this.state.updateRedeemableName,
                            img: this.state.selectedIcon,
                            cost: this.state.cost,
                          },
                        })
                        this.resetState()
                      }}
                    >
                      Update
                    </button>
                  )}
                </Mutation>
              </div>
            </React.Fragment>
          )
        }}
      </Query>
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
