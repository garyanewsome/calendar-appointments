import React, { useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import deepPurple from "@material-ui/core/colors/deepPurple"
import { WithStyles, withStyles, Theme, createStyles } from "@material-ui/core/styles"
import { isSameMonth, isSameDay, getDate, format } from "date-fns"
import { Reminder } from "../../global"

const styles = (theme: Theme) =>
  createStyles({
    dayCell: {
      display: "flex",
      flex: "1 0 13%",
      flexDirection: "column",
      border: "1px solid lightgray",
      cursor: "pointer"
    },
    dayCellOutsideMonth: {
      display: "flex",
      flex: "1 0 13%",
      flexDirection: "column",
      border: "1px solid lightgray",
      backgroundColor: "rgba( 211, 211, 211, 0.4 )",
      cursor: "pointer"
    },
    dateNumber: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#000",
      backgroundColor: "transparent"
    },
    todayAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#fff",
      backgroundColor: deepPurple[400]
    },
    focusedAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#000",
      backgroundColor: "#f1f1f1"
    },
    focusedTodayAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#fff",
      backgroundColor: deepPurple[800]
    },
    remindersContainer: {
      position: "relative",
      height: "100%"
    },
    pill: {
      width: "fit-content",
      marginBottom: "4px",
      padding: "2px 8px",
      borderRadius: "8px",
      fontSize: "0.7em"
    },
    more: {
      position: "absolute",
      bottom: "8px",
      right: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      padding: "2px 8px",
      fontSize: "8px",
      backgroundColor: "#46A34A",
      color: "#FFFFFF"
    }
  })

interface DateObj {
  date: Date
}

interface Props extends WithStyles<typeof styles> {
  calendarDate: Date
  dateObj: DateObj
  onDayClick: (dateObj: DateObj) => void
  reminders: Reminder[]
}

const CalendarDay = (props: Props) => {
  const { classes, dateObj, calendarDate, onDayClick, reminders } = props
  const [focused, setFocused] = useState(false)

  const isToday = isSameDay(dateObj.date, new Date())
  const avatarClass =
    isToday && focused
      ? classes.focusedTodayAvatar
      : isToday
      ? classes.todayAvatar
      : focused
      ? classes.focusedAvatar
      : classes.dateNumber

  const onMouseOver = () => setFocused(true)
  const onMouseOut = () => setFocused(false)

  const getColors = (reminder: Reminder) => {
    const color = reminder.color

    const luminance = (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255

    const txt = luminance > 0.5 ? "rgba(0, 0, 0, 1.0)" : "rgba(255, 255, 255, 1.0)"
    const bkg = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
    return { txt, bkg }
  }

  return (
    <div
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={() => onDayClick(dateObj)}
      className={isSameMonth(dateObj.date, calendarDate) ? classes.dayCell : classes.dayCellOutsideMonth}
    >
      <Avatar className={avatarClass}>{getDate(dateObj.date)}</Avatar>
      <div className={classes.remindersContainer}>
        {reminders.slice(0, 3).map((reminder: Reminder, idx: number) => {
          const colors = getColors(reminder)
          return (
            <div className={classes.pill} key={idx} style={{ backgroundColor: colors.bkg, color: colors.txt }}>
              {`${format(new Date(reminder.date), "h:mm a")} | ${
                reminder.text.length < 15 ? reminder.text : `${reminder.text.slice(0, 12)}...`
              }`}
            </div>
          )
        })}
        {reminders.length > 3 && (
          <div className={classes.more}>
            <i>more...</i>
          </div>
        )}
      </div>
    </div>
  )
}

export default withStyles(styles)(CalendarDay)
