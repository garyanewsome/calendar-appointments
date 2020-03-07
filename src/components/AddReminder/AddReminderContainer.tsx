import { connect } from "react-redux"
import AddReminder from "./AddReminder"
import { closeAddReminder, submitReminder } from "../../redux/actions"

interface State {
  addReminderStatus: {
    isOpen: boolean
  }
}

const mapStateToProps = (state: State) => {
  return {
    isOpen: state.addReminderStatus.isOpen
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClose: () => {
      dispatch(closeAddReminder())
    },
    onSubmit: reminder => {
      dispatch(closeAddReminder())
      dispatch(submitReminder(reminder))
    }
  }
}

const AddReminderContainer = connect(mapStateToProps, mapDispatchToProps)(AddReminder)

export default AddReminderContainer
