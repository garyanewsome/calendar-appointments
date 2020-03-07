import { connect } from "react-redux"
import CalendarDay from "./CalendarDay"
import { openAgenda } from "../../redux/actions"
import { Reminder } from "../../global"
import { getCurrentRemindersByDate } from "../../redux/selectors"

interface Props {
  dateObj: {
    date: Date
  }
}

interface State {
  reminders: Reminder[]
}

interface DateObj {
  date: Date
}

const mapStateToProps = (state: State, ownProps: Props) => {
  return { ...state, ...ownProps, reminders: getCurrentRemindersByDate(state.reminders, ownProps.dateObj.date) }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onDayClick: (dateObj: DateObj) => {
      dispatch(openAgenda(dateObj))
    },
    fetchReminders: state => {
      return state.reminders
    }
  }
}

const CalendarDayContainer = connect(mapStateToProps, mapDispatchToProps)(CalendarDay)

export default CalendarDayContainer
