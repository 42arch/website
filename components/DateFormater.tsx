
export default function Date({ dateString }: {dateString: string}) {
	return <time className='opactity-80' dateTime={dateString}>{dateString}</time>
}