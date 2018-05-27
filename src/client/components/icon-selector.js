import React from "react"
import { StyleSheet, css } from "aphrodite"
import { themeColors } from "../utils"

export default class IconSelector extends React.Component {
  state = {
    icons: [],
    selectedIcon: "",
  }

  static getDerivedStateFromProps(props, state) {
    return {
      icons: props.icons,
      selectedIcon: props.initialIcon ? props.initialIcon : props.icons[0],
    }
  }

  changeIcon = val =>
    this.setState(
      ({ icons, selectedIcon }) => {
        const currentIconIndx = icons.indexOf(selectedIcon)

        // handle case of icon is first in list, and back arrow is clicked
        if (currentIconIndx === 0 && val < 0) {
          return {
            selectedIcon: icons[icons.length + val],
          }
        }

        // handle case of icon as last in list, and forward arrow is clicked
        if (currentIconIndx === icons.length - 1 && val > 0) {
          return {
            selectedIcon: icons[0],
          }
        }

        return {
          selectedIcon: icons[currentIconIndx + val],
        }
      },
      // give the selected icon back to the parent
      () => this.props.clickHandler(this.state.selectedIcon)
    )

  render() {
    return (
      <div className={css(styles.container)}>
        <button
          onClick={() => this.changeIcon(-1)}
          className={css(styles.selectorButton)}
        >
          ‹
        </button>
        {this.state.icons.map(icon => (
          <img
            key={icon}
            className={css(styles.icon)}
            src={`/images/${icon}.png`}
            alt={`${icon} icon`}
            style={{
              display: icon === this.state.selectedIcon ? "" : "none",
            }}
          />
        ))}
        <button
          onClick={() => this.changeIcon(1)}
          className={css(styles.selectorButton)}
        >
          ›
        </button>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  icon: {
    height: 200,
  },
  selectorButton: {
    fontSize: "5rem",
    background: "none",
    border: 0,
    color: themeColors.primaryDark,
  },
})
