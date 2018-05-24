import React from "react"
import { Link } from "react-router-dom"
import { StyleSheet, css } from "aphrodite"
import { themeColors } from "./utils"
import FamilyModal from "./components/family-modal"
import { Query } from "react-apollo"

import { GET_HOUSEHOLD } from "./apollo/queries"

export default class Family extends React.Component {
  state = {
    modalOpen: false,
  }

  handleOpenModal = () => this.setState({ modalOpen: true })

  handleCloseModal = () => this.setState({ modalOpen: false })

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
        <FamilyModal
          modalOpen={this.state.modalOpen}
          onRequestClose={this.handleCloseModal}
        />
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
  links: {
    textDecoration: "none",
    color: "inherit",
    ":hover": {
      opacity: "0.9",
    },
  },
})
