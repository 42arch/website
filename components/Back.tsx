import { useRouter } from "next/router"

const Back = () => {
  const router = useRouter()

  return (
    <div className="prose m-auto mt-16 mb-8">
      <a onClick={ () => { router.back() } } className="font-mono text-xl cursor-pointer no-underline hover:opacity-90">
        cd ..
      </a>
    </div>
  )
}

export default Back