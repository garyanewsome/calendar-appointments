import isSameDay from "date-fns/isSameDay"
import { Reminder } from "../global"
import { isAfter } from "date-fns"

export const getRemindersByDate = (reminders, day: Date) => {
  let todays = reminders.filter(r => isSameDay(r.date, day))

  if (todays.length <= 1) {
    return todays
  } else {
    return todays.slice().sort((a: Reminder, b: Reminder) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }
}

export const getCurrentRemindersByDate = (reminders, day: Date) => {
  let todays = reminders.filter(r => isSameDay(r.date, day) && isAfter(r.date, new Date()))

  if (todays.length <= 1) {
    return todays
  } else {
    return todays.slice().sort((a: Reminder, b: Reminder) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }
}
