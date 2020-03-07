import { connect } from "react-redux"
import AgendaDay from "./AgendaDay"
import { closeAgenda } from "../../redux/actions"
import { Reminder } from "../../global"
import { getRemindersByDate } from "../../redux/selectors"

interface Props {}

interface State {
  agendaStatus: {
    isOpen: boolean
    date: Date
  }
  reminders: Reminder[]
}

const mapStateToProps = (state: State, ownProps: Props) => {
  const { agendaStatus } = state

  return { agendaStatus, reminders: getRemindersByDate(state.reminders, agendaStatus.date) }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClose: () => {
      dispatch(closeAgenda())
    },
    fetchReminders: state => {
      return state.reminders
    }
  }
}

const AgendaDayContainer = connect(mapStateToProps, mapDispatchToProps)(AgendaDay)

export default AgendaDayContainer
