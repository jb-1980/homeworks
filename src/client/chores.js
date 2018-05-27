import React from "react"
import ReactModal from "react-modal"
import { Query } from "react-apollo"
import { StyleSheet, css } from "aphrodite"
import { themeColors } from "./utils"
import { GET_CHORES } from "./apollo/queries"
import Card from "./components/card"
import ChoreModal from "./components/chore-modal"
import EditChoreModal from "./components/edit-chore-modal"

ReactModal.setAppElement("#root")

export default class Chores extends React.Component {
  defaultState = {
    modalOpen: false,
    editChoreModalOpen: false,
    editingChore: {},
  }

  state = this.defaultState

  handleOpenModal = () => this.setState({ modalOpen: true })
  handleCloseModal = () => this.setState({ modalOpen: false })

  handleOpenEditChoreModal = () => this.setState({ editChoreModalOpen: true })
  handleCloseEditChoreModal = () => this.setState({ editChoreModalOpen: false })

  setEditingChore = chore =>
    this.setState(
      () => ({ editingChore: chore }),
      this.handleOpenEditChoreModal
    )

  render() {
    const chores = (
      <Query query={GET_CHORES}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching data ...</div>
          if (error) return <div>Error fetching data!</div>

          const chores = data.chores === null ? [] : data.chores
          return chores.map(chore => (
            <div key={chore.id} onClick={() => this.setEditingChore(chore)}>
              <Card data={chore} />
            </div>
          ))
        }}
      </Query>
    )
    return (
      <React.Fragment>
        <ChoreModal
          modalOpen={this.state.modalOpen}
          onRequestClose={this.handleCloseModal}
        />
        <EditChoreModal
          modalOpen={this.state.editChoreModalOpen}
          onRequestClose={this.handleCloseEditChoreModal}
          chore={this.state.editingChore}
          history={this.props.history}
        />
        <section>
          <div className={css(styles.container)}>{chores}</div>
          <button
            className={css(styles.addChoreButton)}
            onClick={this.handleOpenModal}
          >
            Add Chore
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
  addChoreButton: {
    background: themeColors.secondary,
    border: "white",
    borderRadius: 20,
    width: 200,
    height: 50,
    fontSize: "1rem",
    color: themeColors.textOnSecondary,
  },
  links: {
    textDecoration: "none",
    color: "inherit",
    ":hover": {
      opacity: "0.9",
    },
  },
})
