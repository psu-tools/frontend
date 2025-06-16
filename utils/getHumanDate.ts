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

  const { t } = useI18n()
  if (diffInMinutes < 1) return t('humanDateNow')
  if (diffInHours < 1) return `${diffInMinutes} ` + t('humanDateMinutes')
  if (diffInDays < 1) return `${diffInHours} ` + t('humanDateHours')
  if (diffInDays === 1) return t('humanDateYesterday')
  if (diffInDays <= 7) return `${diffInDays} ` + t('humanDateDay')

  return date.format('D MMMM')
}
