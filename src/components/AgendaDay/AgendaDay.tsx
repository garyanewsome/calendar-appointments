import React from "react"
import CloseIcon from "@material-ui/icons/Close"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import { WithStyles, withStyles, Theme, createStyles } from "@material-ui/core/styles"
import { Reminder } from "../../global"
import { format, isBefore } from "date-fns"

import * as dateFns from "date-fns"

const styles = (theme: Theme) =>
  createStyles({
    remindersContainer: {
      minHeight: "250px",
      maxHeight: "400px",
      marginTop: "10px"
    },
    closeButton: {
      position: "absolute",
      right: "10px",
      top: "10px"
    },
    toolbarButtonHidden: {
      visibility: "hidden"
    },
    toolbarButtonVisible: {
      visibility: "visible"
    },
    reminder: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      jsutifyContent: "flex-start",
      marginBottom: "8px"
    },
    icon: {
      width: "16px",
      height: "16px",
      marginRight: "16px",
      borderRadius: "50%"
    }
  })

interface Props extends WithStyles<typeof styles> {
  agendaStatus: {
    isOpen: boolean
    date: Date
  }
  onClose: () => void
  reminders: Reminder[]
}

const AgendaDay = (props: Props) => {
  const { classes, agendaStatus, onClose, reminders } = props
  const dateTitle = agendaStatus.date ? dateFns.format(agendaStatus.date, "LLLL do, yyyy") : "Closing"

  const getColor = (reminder: Reminder) => {
    const color = reminder.color
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
  }

  return (
    <Dialog
      open={agendaStatus.isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        {dateTitle}
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent className={classes.remindersContainer}>
        {reminders.map((reminder: Reminder, idx: number) => {
          const before = isBefore(new Date(reminder.date), new Date())
          const color = getColor(reminder)
          return (
            <div key={idx} className={classes.reminder} style={before ? { opacity: 0.25 } : null}>
              <div className={classes.icon} style={{ backgroundColor: color }} />{" "}
              <div>
                {`${format(new Date(reminder.date), "h:mm a")} - ${
                  reminder.text.length < 15 ? reminder.text : `${reminder.text.slice(0, 12)}...`
                }`}
              </div>
            </div>
          )
        })}
      </DialogContent>
    </Dialog>
  )
}

export default withStyles(styles)(AgendaDay)
