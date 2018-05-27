import React from "react"
import ReactModal from "react-modal"
import { StyleSheet, css } from "aphrodite"
import { themeColors, formatDate } from "../utils"
import { Query, Mutation } from "react-apollo"
import Card from "./card"

import { GET_REDEEMABLES, GET_REDEEMED } from "../apollo/queries"
import { CREATE_REDEEMED } from "../apollo/mutations"

ReactModal.setAppElement("#root")

export default class RedeemModal extends React.Component {
  state = {
    viewRedeemables: true,
  }

  viewRedeemables = () => this.setState({ viewRedeemables: true })
  viewHistory = () => this.setState({ viewRedeemables: false })

  render() {
    const { member } = this.props
    return (
      <ReactModal
        isOpen={this.props.modalOpen}
        onRequestClose={this.props.onRequestClose}
        style={
          {
            //content: { width: 250, margin: "auto", position: "initial" },
          }
        }
      >
        <div className={css(styles.tabs)}>
          <div className={css(styles.tab)} onClick={this.viewRedeemables}>
            Redeemables
          </div>
          <div className={css(styles.tab)} onClick={this.viewHistory}>
            History
          </div>
          <div
            style={{ marginLeft: "auto", cursor: "pointer" }}
            onClick={this.props.onRequestClose}
          >
            &times;
          </div>
        </div>
        <hr style={{ width: "100%" }} />
        <div style={{ display: this.state.viewRedeemables ? null : "none" }}>
          <Query query={GET_REDEEMABLES}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching redeemables ...</div>
              if (error) return <div>Error fetching redeemables!</div>

              const redeemables =
                data.redeemables === null ? [] : data.redeemables
              return (
                <div className={css(styles.modalContainer)}>
                  <div>{this.state.errorMessage}</div>
                  {redeemables.map(redeemable => (
                    <Mutation
                      key={redeemable.id}
                      mutation={CREATE_REDEEMED}
                      variables={{
                        memberId: member.id,
                        redeemableId: redeemable.id,
                        date: new Date().getTime(),
                      }}
                      onCompleted={this.props.onRequestClose}
                    >
                      {(createRedeemed, { data, loading, error }) => {
                        if (error) {
                          console.dir(error)
                          const errorMessage = error.graphQLErrors[0].message
                          return (
                            <div>
                              <Card data={redeemable} />
                              <h6 style={{ textAlign: "center" }}>
                                {errorMessage}
                              </h6>
                            </div>
                          )
                        }

                        return (
                          <div onClick={createRedeemed}>
                            <Card data={redeemable} />
                          </div>
                        )
                      }}
                    </Mutation>
                  ))}
                </div>
              )
            }}
          </Query>
        </div>
        <div style={{ display: this.state.viewRedeemables ? "none" : null }}>
          <Query
            query={GET_REDEEMED}
            variables={{
              memberId: member.id,
            }}
          >
            {({ data, loading, error }) => {
              if (loading) return <div>Fetching redeemed history...</div>
              if (error) return <div>Error retrieving history!</div>
              console.log(data.redeemed)
              const history = data.redeemed === null ? [] : data.redeemed
              return (
                <table className="chore-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Item</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map(record => (
                      <tr key={record.id}>
                        <td>{formatDate(new Date(record.date))}</td>
                        <td>{record.redeemable.name}</td>
                        <td>{record.redeemable.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            }}
          </Query>
        </div>
      </ReactModal>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
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
  tabs: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tab: {
    margin: "0 7px",
    border: "thin solid",
    borderColor: themeColors.secondary,
    color: themeColors.secondary,
    padding: 3,
    borderRadius: 5,
    fontSize: "1.1rem",
    fontFamily: "Roboto",
    cursor: "pointer",
  },
})
