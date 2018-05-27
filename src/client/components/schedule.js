import React from "react"
import { Query } from "react-apollo"
import { StyleSheet, css } from "aphrodite"
import ScheduleRow from "./schedule-row"
import { GET_ASSIGNMENTS } from "../apollo/queries"
import { getCurrentSunday, getPreviousWeek, getNextWeek } from "../utils"

export default ({ member }) => (
  <Query
    query={GET_ASSIGNMENTS}
    variables={{
      memberId: member.id,
      date: getCurrentSunday().getTime(),
    }}
  >
    {({ loading, error, data, refetch }) => {
      if (loading) return <div>fetching assignments...</div>
      if (error) return <div>Error fetching assignments!</div>

      const assignments =
        data.assignments === null ? {} : data.assignments.assignments

      // should be timestamp of Sunday of the week's data
      const date = data.assignments === null ? null : data.assignments.date
      const weekDates = [0, 1, 2, 3, 4, 5, 6].map(
        i => date + i * 24 * 3600 * 1000
      )

      const assignmentByDate = assignments.reduce(
        (acc, assignment) => {
          let day = new Date(assignment.date).getDay()
          switch (day) {
            case 0:
              acc.sun.push(assignment)
              return acc
            case 1:
              acc.mon.push(assignment)
              return acc
            case 2:
              acc.tue.push(assignment)
              return acc
            case 3:
              acc.wed.push(assignment)
              return acc
            case 4:
              acc.thu.push(assignment)
              return acc
            case 5:
              acc.fri.push(assignment)
              return acc
            case 6:
              acc.sat.push(assignment)
              return acc
            default:
              return acc
          }
        },
        { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] }
      )
      return (
        <table className="chore-table">
          <thead>
            <tr>
              <th
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span
                  className={css(styles.dateChanger)}
                  onClick={() =>
                    refetch({
                      date: getPreviousWeek(date),
                      memberId: member.id,
                    })
                  }
                >
                  ‹
                </span>
                <span>Day</span>
                <span
                  className={css(styles.dateChanger)}
                  onClick={() =>
                    refetch({
                      memberId: member.id,
                      date: getNextWeek(date).getTime(),
                    })
                  }
                >
                  ›
                </span>
              </th>
              <th>Chores</th>
            </tr>
          </thead>
          <tbody>
            <ScheduleRow
              assignments={assignmentByDate.sun}
              date={weekDates[0]}
              member={member}
            />
            <ScheduleRow
              assignments={assignmentByDate.mon}
              date={weekDates[1]}
              member={member}
            />
            <ScheduleRow
              assignments={assignmentByDate.tue}
              date={weekDates[2]}
              member={member}
            />
            <ScheduleRow
              assignments={assignmentByDate.wed}
              date={weekDates[3]}
              member={member}
            />
            <ScheduleRow
              assignments={assignmentByDate.thu}
              date={weekDates[4]}
              member={member}
            />
            <ScheduleRow
              assignments={assignmentByDate.fri}
              date={weekDates[5]}
              member={member}
            />
            <ScheduleRow
              assignments={assignmentByDate.sat}
              date={weekDates[6]}
              member={member}
            />
          </tbody>
        </table>
      )
    }}
  </Query>
)

const styles = StyleSheet.create({
  dateChanger: {
    cursor: "pointer",
  },
})
