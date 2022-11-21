import { NextPage } from 'next'
import {
  getAllPostSlugs,
  getPostBySlug,
  PostDataWithHtml
} from '../../helpers/post'

export async function getStaticPaths() {
  const paths = getAllPostSlugs()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: any) {
  const postData = await getPostBySlug(params.slug)
  console.log('paapapa', postData)

  return {
    props: {
      postData
    }
  }
}

const Post: NextPage<{ postData: PostDataWithHtml }> = ({ postData }) => {
  console.log(98888, postData)
  return (
    <article>
      <div dangerouslySetInnerHTML={{ __html: postData.html }}></div>
    </article>
  )
}

export default Post
