import React from "react"
import { NavLink } from "react-router-dom"
import { StyleSheet, css } from "aphrodite/no-important"
import { themeColors } from "./utils"

const screenSize = {
  smartphone: "@media only screen and (max-width: 470px)",
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
      justifyContent: "center",
    },
  },
  logo: {
    [screenSize.smartphone]: {
      display: "none",
    },
  },
  link: {
    textDecoration: "none",
    margin: "0 20px",
    color: themeColors.textOnPrimary,
    [screenSize.smartphone]: {},
  },
  activeLink: {
    color: themeColors.secondaryDark,
  },
  linksParentContainer: {
    [screenSize.smartphone]: {
      display: "none",
    },
  },
  linksContainer: {},
})

export default class Nav extends React.Component {
  state = { viewMenu: false }

  render() {
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
      </nav>
    )
  }
}
