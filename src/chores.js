import React from "react"
import ReactModal from "react-modal"
import { Query, Mutation } from "react-apollo"
import { StyleSheet, css } from "aphrodite"
import { themeColors } from "./utils"
import { GET_CHORES } from "./apollo/queries"
import { CREATE_CHORE } from "./apollo/mutations"
import Chore from "./components/chore"

ReactModal.setAppElement("#root")

export default class Chores extends React.Component {
  defaultState = {
    modalOpen: false,
    choreName: "",
    choreImg: "https://via.placeholder.com/100x120",
    choreDescription: "",
    chorePts: 0,
  }

  state = this.defaultState

  handleOpenModal = () => this.setState({ modalOpen: true })

  handleCloseModal = () => this.setState({ modalOpen: false })

  updateChoreName = event => this.setState({ choreName: event.target.value })

  updateChoreImg = choreImg => this.setState({ choreImg })

  updateChoreDescription = event =>
    this.setState({ choreDescription: event.target.value })

  updateChorePoints = event =>
    this.setState({ chorePts: Number(event.target.value) })

  resetState = () => this.setState(this.defaultState)

  render() {
    const chores = (
      <Query query={GET_CHORES}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching data ...</div>
          if (error) return <div>Error fetching data!</div>

          const chores = data.chores === null ? [] : data.chores
          return chores.map(chore => <Chore key={chore.id} chore={chore} />)
        }}
      </Query>
    )
    return (
      <React.Fragment>
        <ReactModal isOpen={this.state.modalOpen}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "90%",
            }}
          >
            <div className="card" style={{ width: 150 }}>
              <img
                src="https://via.placeholder.com/150x150"
                alt="placeholder"
              />
              <div className="card-body">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={this.state.choreName}
                    onChange={this.updateChoreName}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    value={this.state.choreDescription}
                    onChange={this.updateChoreDescription}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="points">Points</label>
                  <input
                    type="number"
                    id="points"
                    className="form-control"
                    value={this.state.chorePts}
                    onChange={this.updateChorePoints}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{ float: "right" }}>
            <Mutation
              mutation={CREATE_CHORE}
              update={(cache, { data: { createChore } }) => {
                const { chores } = cache.readQuery({
                  query: GET_CHORES,
                })
                cache.writeQuery({
                  query: GET_CHORES,
                  data: { chores: [...chores, createChore] },
                })
              }}
              onCompleted={this.resetState}
            >
              {(createChore, { data }) => (
                <button
                  onClick={() =>
                    createChore({
                      variables: {
                        name: this.state.choreName,
                        img: this.state.choreImg,
                        description: this.state.choreDescription,
                        pts: this.state.chorePts,
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
        <section>
          <button className="btn btn-primary" onClick={this.handleOpenModal}>
            Add Chore
          </button>
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            {chores}
          </div>
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
  modalAvatarImg: {
    height: 200,
  },
  modalAvatarSelectorButton: {
    fontSize: "5rem",
    background: "none",
    border: 0,
    color: themeColors.primaryDark,
  },
  links: {
    textDecoration: "none",
    color: "inherit",
    ":hover": {
      opacity: "0.9",
    },
  },
})
