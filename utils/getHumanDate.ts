import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/ru'

dayjs.extend(utc)
dayjs.extend(relativeTime)
dayjs.locale('ru')

export function getHumanDate(dateStr: string): string {
  const date = dayjs.utc(dateStr)
  const now = dayjs()

  const diffInMinutes = now.diff(date, 'minute')
  const diffInHours = now.diff(date, 'hour')
  const diffInDays = now.diff(date, 'day')

  if (diffInMinutes < 1) return 'Сейчас'
  if (diffInHours < 1) return `${diffInMinutes} мин. назад`
  if (diffInDays < 1) return `${diffInHours} ч. назад`
  if (diffInDays === 1) return 'Вчера'
  if (diffInDays <= 7) return `${diffInDays} дн. назад`

  return date.format('D MMMM')
}
