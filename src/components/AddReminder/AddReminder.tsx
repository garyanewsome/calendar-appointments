import React from "react"
import CloseIcon from "@material-ui/icons/Close"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import { WithStyles, withStyles, createStyles, Theme } from "@material-ui/core/styles"
import { MuiPickersUtilsProvider } from "material-ui-pickers"
import DateFnsUtils from "@date-io/date-fns"
import AddReminderForm from "./AddReminderForm"

const styles = (theme: Theme) =>
  createStyles({
    addReminderFormContainer: {
      minHeight: "250px",
      marginTop: "10px",
      display: "flex",
      flexDirection: "column"
    },
    closeButton: {
      position: "absolute",
      right: "10px",
      top: "10px"
    }
  })

interface Props extends WithStyles<typeof styles> {
  isOpen: boolean
  onClose: () => void
  onSubmit: (dispatch: any) => void
}

const AddReminder = (props: Props) => {
  const { classes, isOpen, onClose, onSubmit } = props

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="md">
        <DialogTitle id="form-dialog-title">
          Add Reminder
          <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider light />
        <DialogContent className={classes.addReminderFormContainer}>
          <Typography>Complete the form below to create a new reminder.</Typography>
          <AddReminderForm onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    </MuiPickersUtilsProvider>
  )
}

export default withStyles(styles)(AddReminder)
