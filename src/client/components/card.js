import React from "react"
import { StyleSheet, css } from "aphrodite"
import { themeColors } from "../utils"

export default ({ data }) => {
  const pts = data.pts !== undefined ? data.pts : data.cost
  return (
    <div className={css(styles.card)}>
      <div className={css(styles.imageContainer)}>
        <img
          src={`/images/${data.img}.png`}
          alt={data.img}
          className={css(styles.img)}
        />
      </div>
      <div className={css(styles.name)}>{data.name}</div>
      <div className={css(styles.pts)}> {pts} </div>
    </div>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 220,
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
  imageContainer: {
    width: 120,
    height: 120,
  },
  img: { height: 120 },
  name: { width: 100, overflow: "hidden" },
  pts: {
    position: "absolute",
    left: 193,
    top: -5,
    textAlign: "center",
    background: themeColors.secondary,
    color: themeColors.textOnSecondary,
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 1px 3px 0px",
    border: "thin solid white",
    borderRadius: 15,
    minWidth: 30,
    padding: "2px 8px",
  },
})
