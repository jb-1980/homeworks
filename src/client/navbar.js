import React from "react"
import { NavLink } from "react-router-dom"
import { StyleSheet, css } from "aphrodite/no-important"
import { themeColors } from "./utils"

const screenSize = {
  smartphone: "@media only screen and (max-width: 470px)"
}

const styles = StyleSheet.create({
  navbar: {
    display: "flex",
    alignItems: "center",
    background: themeColors.primary,
    color: themeColors.textOnPrimary,
    padding: 7,
    width: "100%",
    height: 35,
    [screenSize.smartphone]: {
      position: "fixed",
      bottom: 0,
      zIndex: 10,
      justifyContent: "center"
    }
  },
  logo: {
    [screenSize.smartphone]: {
      display: "none"
    }
  },
  link: {
    textDecoration: "none",
    margin: "0 20px",
    color: themeColors.textOnPrimary,
    [screenSize.smartphone]: {}
  },
  activeLink: {
    color: themeColors.secondaryDark
  },
  linksParentContainer: {
    [screenSize.smartphone]: {
      display: "none"
    }
  },
  userContainer: {
    marginLeft: "auto",
    position: "relative"
  },
  dropDown: {
    position: "absolute",
    background: "white",
    width: "100%",
    border: "1px solid",
    padding: 5,
    top: 32
  }
})

export default class Nav extends React.Component {
  state = { showDropdown: false }

  toggleDropdown = () =>
    this.setState(({ showDropdown }) => ({ showDropdown: !showDropdown }))

  render() {
    const user = window.__HOMEWORKS_USER__
    return (
      <nav className={css(styles.navbar)}>
        <NavLink className={css(styles.link, styles.logo)} to="/">
          HOMEWORKS
        </NavLink>
        <div className={css(styles.wideNav)}>
          <div className={css(styles.linksContainer)}>
            <NavLink
              className={css(styles.link)}
              activeClassName={css(styles.activeLink)}
              to="/family"
            >
              Family
            </NavLink>
            <NavLink
              className={css(styles.link)}
              activeClassName={css(styles.activeLink)}
              to="/chores"
            >
              Chores
            </NavLink>
            <NavLink
              className={css(styles.link)}
              activeClassName={css(styles.activeLink)}
              to="/redeemables"
            >
              Redeemables
            </NavLink>
          </div>
        </div>
        <div className={css(styles.userContainer)}>
          <div onClick={this.toggleDropdown}>
            {`${this.state.showDropdown ? "▲" : "▼"} ${user.firstname} ${
              user.lastname
            }`}
          </div>
          <div
            className={css(styles.dropDown)}
            style={{ display: this.state.showDropdown ? "" : "none" }}
          >
            <a href="/logout">Logout</a>
          </div>
        </div>
      </nav>
    )
  }
}
