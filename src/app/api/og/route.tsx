import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

// const interRegular = fetch(
//   new URL('../../../assets/fonts/Inter-Regular.ttf', import.meta.url)
// ).then((res) => res.arrayBuffer())

// const interBold = fetch(
//   new URL('../../../assets/fonts/CalSans-SemiBold.ttf', import.meta.url)
// ).then((res) => res.arrayBuffer())

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'My default title'

    // const heading =
    //   values.heading.length > 140
    //     ? `${values.heading.substring(0, 140)}...`
    //     : values.heading

    // const { mode } = values

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: 'black',
            backgroundSize: '150px 150px',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap'
          }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center'
            }}>
            <img
              alt="Vercel"
              height={200}
              src="data:image/svg+xml,%3Csvg width='116' height='100' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M57.5 0L115 100H0L57.5 0z' /%3E%3C/svg%3E"
              style={{ margin: '0 30px' }}
              width={232}
            />
          </div>
          <div
            style={{
              fontSize: 60,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              color: 'white',
              marginTop: 30,
              padding: '0 120px',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap'
            }}>
            {title}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630
      }
    )
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500
    })
  }
}
