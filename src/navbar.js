import React from "react"
import { NavLink } from "react-router-dom"
import { StyleSheet, css } from "aphrodite"
import { themeColors } from "./utils"

const styles = StyleSheet.create({
  navbar: {
    display: "flex",
    alignItems: "center",
    background: themeColors.primary,
    color: themeColors.textOnPrimary,
    padding: 7,
  },
  link: {
    textDecoration: "none",
    margin: "0 20px",
    color: themeColors.textOnPrimary,
  },
  activeLink: {
    color: themeColors.secondaryDark,
  },
})

export default () => (
  <nav className={css(styles.navbar)}>
    <NavLink className={css(styles.link)} to="/">
      HOMEWORKS
    </NavLink>
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
  </nav>
)
