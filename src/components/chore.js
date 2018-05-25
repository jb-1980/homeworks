import React from "react"
import { StyleSheet, css } from "aphrodite"
import { themeColors } from "../utils"

export default ({ chore }) => (
  <div className={css(styles.chore)}>
    <img
      src={"https://via.placeholder.com/100x120" /*chore.img*/}
      alt={chore.img}
      style={{ width: 100, height: 120 }}
    />
    <div>{chore.name}</div>
    <div className={css(styles.pts)}>{chore.pts}</div>
  </div>
)

const styles = StyleSheet.create({
  chore: {
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
  pts: {
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
  },
})
