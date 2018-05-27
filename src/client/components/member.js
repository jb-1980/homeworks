import React from "react"
import { StyleSheet, css } from "aphrodite"
import { themeColors } from "../utils"
import EditProfileModal from "./edit-profile-modal"
import Schedule from "./schedule"
import RedeemModal from "./redeem-modal"
import { Query } from "react-apollo"

import { GET_MEMBER } from "../apollo/queries"

export default class Member extends React.Component {
  state = {
    profileModalOpen: false,
    redeemModalOpen: false,
    showDeleteUserButton: false,
  }

  openProfileModal = () => this.setState({ profileModalOpen: true })
  closeProfileModal = () => this.setState({ profileModalOpen: false })

  openRedeemModal = () => this.setState({ redeemModalOpen: true })
  closeRedeemModal = () => this.setState({ redeemModalOpen: false })

  render() {
    const { match, history } = this.props

    return (
      <Query
        query={GET_MEMBER}
        variables={{ id: match.params.memberId }}
        errorPolicy="none"
      >
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching user...</div>
          if (error) return <div>Error fetching user!</div>
          const member = data.member === null ? {} : data.member
          return (
            <React.Fragment>
              <EditProfileModal
                modalOpen={this.state.profileModalOpen}
                onRequestClose={this.closeProfileModal}
                member={member}
                history={history}
              />
              <div className={css(styles.memberContainer)}>
                <img
                  src={`/images/${member.img}.png`}
                  alt={member.img}
                  className={css(styles.memberImg)}
                />
                <div className={css(styles.memberName)}>{member.name}</div>
                <div className={css(styles.memberPts)}>{member.pts}</div>
                <div
                  className={css(styles.memberEdit)}
                  onClick={this.openProfileModal}
                >
                  <i className="fas fa-cog" />
                </div>
              </div>
              <button className="btn-primary" onClick={this.openRedeemModal}>
                Redeem Points
              </button>
              <RedeemModal
                modalOpen={this.state.redeemModalOpen}
                onRequestClose={this.closeRedeemModal}
                member={member}
                history={history}
              />
              <Schedule member={member} />
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
    width: 300,
    height: 360,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    alignItems: "center",
    background: themeColors.primaryLight,
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 3px 0px",
    borderRadius: 5,
    userSelect: "none",
    cursor: "pointer",
    margin: "20px auto",
  },
  memberImg: { width: 232, height: 300 },
  memberName: { fontSize: "2rem" },
  memberPts: {
    position: "absolute",
    left: 275,
    top: -5,
    background: themeColors.secondary,
    color: themeColors.textOnSecondary,
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 1px 3px 0px",
    border: "thin solid white",
    borderRadius: 15,
    minWidth: 30,
    padding: "2px 8px",
  },
  memberEdit: {
    position: "absolute",
    left: -12,
    top: -12,
    fontSize: "1.8rem",
    color: themeColors.primaryDark,
  },
})
