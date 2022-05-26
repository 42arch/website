import React from 'react'

export default function Test({children} : any) {
  return (
    <div className=' bg-red-800 text-stroke-sky-800 text-lg'>
      {
        children
      }
    </div>
  )
}
