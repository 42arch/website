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
    const { searchParams, host, protocol } = new URL(req.url)

    // todo:
    // bug: doetn't support chinese characters

    // const hasTitle = searchParams.has('title')
    // const title = hasTitle
    //   ? searchParams.get('title')?.slice(0, 100)
    //   : 'My default title'

    // const creator = searchParams.get('creator') || '42arch'
    // const date = new Date(
    //   searchParams.get('date') || '2022-11-05T12:00:00.000Z'
    // )

    const cover = `${protocol}//${host}/_next/image?url=${encodeURIComponent(
      searchParams.get('cover') || '/images/default-cover.jpg'
    )}&w=1200&q=75`

    return new ImageResponse(
      (
        <div tw="flex w-full h-full flex-col justify-end bg-slate-200 items-stretch">
          <img
            src={cover}
            alt=""
            tw="flex-1 w-full h-full"
            style={{ objectFit: 'contain', objectPosition: 'center' }}
          />
          {/* <div tw="flex flex-col bg-white p-8">
            <div tw="text-5xl mb-4">{title}</div>
            <div tw="text-2xl">
              {+' – ' + date.toLocaleDateString('en-US', { dateStyle: 'long' })}
            </div>
          </div> */}
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
