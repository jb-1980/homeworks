export const themeColors = {
  primary: "#8fa3ad",
  primaryLight: "#bfd4df",
  primaryDark: "#61747e",
  secondary: "#0097a7",
  secondaryLight: "#56c8d8",
  secondaryDark: "#006978",
  textOnPrimary: "#000",
  textOnSecondary: "#fafafa",
  danger: "#E53935",
}

// helper function to find the date of Sunday of the current week
export const getCurrentSunday = (d = new Date()) => {
  if (typeof d === "number") {
    d = new Date(d)
  }
  const day = d.getDay()
  // Subtracting number of days from current date will get us to Sunday.
  const diff = d.getDate() - day

  return new Date(d.setDate(diff))
}

export const getPreviousWeek = currentWeek => {
  return currentWeek - 7 * 24 * 3600 * 1000
}

export const getNextWeek = currentWeek => {
  const currentDate = new Date(currentWeek)
  const currentSunday = getCurrentSunday(currentDate)
  return new Date(currentSunday.setDate(currentSunday.getDate() + 7))
}

export const formatDate = date => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  const day = days[date.getDay()]
  const month = months[date.getMonth()]

  return `${day}, ${month} ${date.getDate()}`
}
