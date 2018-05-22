import React from "react"
import ReactModal from "react-modal"
import { Link } from "react-router-dom"
import { StyleSheet, css } from "aphrodite"
import { themeColors } from "./utils"
import IconSelector from "./components/icon-selector"
import { Query, Mutation } from "react-apollo"

import { GET_HOUSEHOLD } from "./apollo/queries"
import { SAVE_MEMBER } from "./apollo/mutations"

ReactModal.setAppElement("#root")

export default class Family extends React.Component {
  state = {
    modalOpen: false,
    addedUserName: "",
    avatars: [
      "batgirl",
      "batman",
      "captain-america",
      "spider-girl",
      "spiderman",
      "supergirl",
      "superman",
      "wonder-woman",
    ],
    selectedAvatar: "batgirl",
  }

  handleOpenModal = () => this.setState({ modalOpen: true })

  handleCloseModal = () => this.setState({ modalOpen: false })

  updateAddUserName = event => {
    const addedUserName = event.target.value
    this.setState({ addedUserName })
  }

  updateAvatar = selectedAvatar => this.setState({ selectedAvatar })

  render() {
    const portraits = (
      <Query query={GET_HOUSEHOLD}>
        {({ loading, error, data }) => {
          if (loading) return <div>Still loading ...</div>
          if (error) return <div>Error fetching data!</div>

          const members = data.household === null ? [] : data.household
          return members.map(member => (
            <Link
              key={member.id}
              to={`/member/${member.id}`}
              className={css(styles.links)}
            >
              <div className={css(styles.memberContainer)}>
                <img
                  src={`images/${member.img}.png`}
                  alt={member.img}
                  style={{ width: 100, height: 120 }}
                />
                <div>{member.name}</div>
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
                  {member.pts}
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
          <Mutation
            mutation={SAVE_MEMBER}
            update={(cache, { data: { addMember } }) => {
              const { household } = cache.readQuery({ query: GET_HOUSEHOLD })
              cache.writeQuery({
                query: GET_HOUSEHOLD,
                data: { household: [...household, addMember] },
              })
            }}
          >
            {(addMember, { data }) => (
              <React.Fragment>
                <div className={css(styles.modalContainer)}>
                  <div>
                    <IconSelector
                      icons={this.state.avatars}
                      clickHandler={this.updateAvatar}
                    />

                    <input
                      type="text"
                      className="form-control"
                      id="member-name"
                      placeholder="Name"
                      value={this.state.addedUserName}
                      onChange={this.updateAddUserName}
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div style={{ float: "right" }}>
                  <button
                    onClick={() => {
                      addMember({
                        variables: {
                          name: this.state.addedUserName,
                          img: this.state.selectedAvatar,
                          pts: 0,
                        },
                      })
                      this.setState({ addedUserName: "" })
                      this.handleCloseModal()
                    }}
                  >
                    Save
                  </button>
                  <button onClick={this.handleCloseModal}>Close</button>
                </div>
              </React.Fragment>
            )}
          </Mutation>
        </ReactModal>
        <section>
          <div className={css(styles.container)}>{portraits}</div>
          <button
            className={css(styles.addFamilyButton)}
            onClick={this.handleOpenModal}
          >
            Add family member
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
    userSelect: "none",
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
