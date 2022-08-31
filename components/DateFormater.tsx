import moment from "moment"

export default function Date({ datetime }: {datetime: number}) {
	const date = moment(datetime).format('LL')
	return <time className='opactity-80' dateTime={date}>{date}</time>
}