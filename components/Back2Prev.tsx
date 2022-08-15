import { useRouter } from "next/router"

export default function Back2Prev() {
  const router = useRouter()

  return (
    <div className="prose dark:prose-invert m-auto mt-16 mb-8 select-none">
      <a onClick={ () => { router.back() } } className="text-xl cursor-pointer no-underline opacity-80 hover:opacity-100">
        cd ..
      </a>
    </div>
  )
}
