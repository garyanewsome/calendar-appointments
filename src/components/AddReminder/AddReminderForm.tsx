import * as React from "react"

import TextField from "@material-ui/core/TextField"
import { DateTimePicker } from "material-ui-pickers"
import { FormControl } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import { GithubPicker } from "react-color"
import { Reminder } from "../../global"

const initialFormState = {
  text: "",
  date: new Date(),
  color: null
}

interface AddReminderFormProps {
  onSubmit: (reminder: Reminder) => void
}
const AddReminderForm = ({ onSubmit }: AddReminderFormProps) => {
  const [reminder, setReminder] = React.useState(initialFormState)

  const isDisabled = !reminder.text || !reminder.color

  return (
    <div>
      <form>
        <FormControl fullWidth margin="normal">
          <TextField
            required
            id="standard-required"
            label="Required"
            value={reminder.text}
            placeholder="Call Gary"
            helperText={reminder.text ? `${reminder.text.length} of 30 characters.` : "30 character maximum"}
            error={reminder.text.length > 30}
            onChange={({ target: { value } }) =>
              reminder.text.length < 30
                ? setReminder({ ...reminder, text: value })
                : alert("30 Characters MAximum, Please and Thank you.")
            }
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <DateTimePicker
            required
            label="Reminder Date & Time"
            value={reminder.date}
            onChange={e => {
              setReminder({ ...reminder, date: e })
            }}
            disablePast
            showTodayButton
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <GithubPicker onChange={e => setReminder({ ...reminder, color: e.rgb })} />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Button
            variant="contained"
            color="primary"
            disabled={isDisabled}
            onClick={() => {
              onSubmit(reminder)
            }}
          >
            SUBMIT
          </Button>
        </FormControl>
      </form>
    </div>
  )
}

export default AddReminderForm
