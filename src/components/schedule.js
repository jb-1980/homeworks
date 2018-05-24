import React from "react"
import { Query } from "react-apollo"

import { GET_ASSIGNMENTS } from "../apollo/queries"
import { getCurrentSunday } from "../utils"

export default ({ member }) => (
  <Query
    query={GET_ASSIGNMENTS}
    variables={{
      memberId: member.id,
      // date: getCurrentSunday().getTime(),
    }}
  >
    {({ loading, error, data, refetch }) => {
      if (loading) return <div>fetching assignments...</div>
      if (error) return <div>Error fetching assignments!</div>

      const assignments =
        data.assignments === null ? {} : data.assignments.assignments

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
                  onClick={() =>
                    refetch({
                      variables: {
                        startDate: this.getPreviousWeekTime(assignments.date),
                      },
                    })
                  }
                >
                  ‹
                </span>
                <span>Day</span>
                <span
                  onClick={() =>
                    refetch({
                      variables: {
                        startDate: this.getNextWeekTime(assignments.date),
                      },
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
            <tr>
              <td>Mon</td>
              <td>
                {assignmentByDate.mon.map(assignment => (
                  <div key={assignment.id}>{assignment.chore.name}</div>
                ))}
              </td>
            </tr>
            <tr>
              <td>Tue</td>
              <td>
                {assignmentByDate.tue.map(assignment => (
                  <div key={assignment.id}>{assignment.chore.name}</div>
                ))}
              </td>
            </tr>
            <tr>
              <td>Wed</td>
              <td>
                {assignmentByDate.wed.map(assignment => (
                  <div key={assignment.id}>{assignment.chore.name}</div>
                ))}
              </td>
            </tr>
            <tr>
              <td>Thur</td>
              <td>
                {assignmentByDate.thu.map(assignment => (
                  <div key={assignment.id}>{assignment.chore.name}</div>
                ))}
              </td>
            </tr>
            <tr>
              <td>Fri</td>
              <td>
                {assignmentByDate.fri.map(assignment => (
                  <div key={assignment.id}>{assignment.chore.name}</div>
                ))}
              </td>
            </tr>
            <tr>
              <td>Sat</td>
              <td>
                {assignmentByDate.sat.map(assignment => (
                  <div key={assignment.id}>{assignment.chore.name}</div>
                ))}
              </td>
            </tr>
            <tr>
              <td>Sun</td>
              <td>
                {assignmentByDate.sun.map(assignment => (
                  <div key={assignment.id}>{assignment.chore.name}</div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      )
    }}
  </Query>
)
