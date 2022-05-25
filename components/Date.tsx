import { parseISO, format } from 'date-fns'

export default function Date({ dateString }: {dateString: string}) {
	const date = parseISO(dateString)
	return <time className='opactity-80' dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}