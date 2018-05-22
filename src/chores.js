import React from "react"
import ReactModal from "react-modal"

ReactModal.setAppElement("#root")

export default class Chores extends React.Component {
  state = {
    chores: [
      {
        name: "Lavar trastes",
        icon: "https://via.placeholder.com/100x100",
        description: "Ayudar a Mommy o Daddy lavar los trastes",
        pts: 10,
      },
      {
        name: "Sacar basura",
        icon: "https://via.placeholder.com/100x100",
        description: "Sacar la basura de los dos baños",
        pts: 5,
      },
      {
        name: "Tarea",
        icon: "https://via.placeholder.com/100x100",
        description: "Haz tu tarea de la escuela",
        pts: 5,
      },
      {
        name: "Dar agua a las plantas",
        icon: "https://via.placeholder.com/100x100",
        description: "Dar agua a las plantas",
        pts: 7,
      },
      {
        name: "Lavar calcetines",
        icon: "https://via.placeholder.com/100x100",
        description: "Poner las calcetines en la secadora",
        pts: 10,
      },
    ],
    addedChore: {
      name: "",
      icon: "https://via.placeholder.com/100x100",
      description: "",
      pts: 0,
    },
  }
  handleOpenModal = () => this.setState({ modalOpen: true })

  handleCloseModal = () => this.setState({ modalOpen: false })

  updateAddChoreName = event => {
    const name = event.target.value
    this.setState(({ addedChore }) => ({ addedChore: { ...addedChore, name } }))
  }

  updateAddChoreDescription = event => {
    const description = event.target.value
    this.setState(({ addedChore }) => ({
      addedChore: { ...addedChore, description },
    }))
  }

  updateAddChorePoints = event => {
    const pts = Number(event.target.value)
    this.setState(({ addedChore }) => ({ addedChore: { ...addedChore, pts } }))
  }

  saveChore = () =>
    this.setState(
      ({ chores, addedChore }) => ({
        chores: [...chores, addedChore],
        addedChore: { ...addedChore, name: "", description: "", pts: 0 },
      }),
      this.handleCloseModal
    )

  render() {
    const chores = this.state.chores.map(chore => (
      <div key={chore.name} className="card" style={{ width: 100 }}>
        <img src={chore.icon} alt="placeholder" />
        <div className="card-body">
          <div>{chore.name}</div>
          <div>{chore.pts}</div>
        </div>
      </div>
    ))
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
                    value={this.state.addedChore.name}
                    onChange={this.updateAddChoreName}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    value={this.state.addedChore.description}
                    onChange={this.updateAddChoreDescription}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="points">Points</label>
                  <input
                    type="number"
                    id="points"
                    className="form-control"
                    value={this.state.addedChore.pts}
                    onChange={this.updateAddChorePoints}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{ float: "right" }}>
            <button onClick={this.saveChore}>Save</button>
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
