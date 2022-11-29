import dayjs from 'dayjs'
import { FC } from 'react'

const DateTime: FC<{ datetime: number }> = ({ datetime }) => {
  const formatdt = dayjs(datetime).format('YYYY-MM-DD')
  return <time dateTime={formatdt}>{formatdt}</time>
}

export default DateTime
