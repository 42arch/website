import { format } from 'date-fns'

export default function formateDate(date: Date | string) {
  return format(
    date instanceof Date ? date : new Date(date),
    'PP',
  )
}
