'use client'

import { useRef, useEffect } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'

export default function ProjectGallery() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { scrollXProgress } = useScroll({ container: containerRef })
  let scrollLeft = 0

  // const handleMouseWheel = (e: WheelEvent<HTMLDivElement>) => {
  //   e.preventDefault()
  //   if (ref.current) {
  //     // 获取鼠标滚轮的滚动方向
  //     const delta = e.deltaY || e.detail

  //     // console.log('delta', delta)

  //     // 根据滚动方向调整水平滚动位置
  //     scrollLeft -= delta
  //     scrollLeft = Math.min(
  //       0,
  //       Math.max(scrollLeft, -ref.current.scrollWidth + ref.current.clientWidth)
  //     )

  //     // 阻止全局滚动事件，只允许容器滚动
  //     console.log('prevent', scrollLeft, delta)

  //     // if (
  //     //   scrollLeft !== 0 &&
  //     //   delta > 0 // 防止向下滚动
  //     //   // (scrollLeft === -ref.current.scrollWidth + ref.current.clientWidth &&
  //     //   //   delta < 0) // 防止向上滚动
  //     // ) {
  //     //   e.preventDefault()
  //     // }

  //     // if (
  //     //   (scrollLeft === 0 && delta > 0) || // 防止向下滚动
  //     //   (scrollLeft === -ref.current.scrollWidth + ref.current.clientWidth &&
  //     //     delta < 0) // 防止向上滚动
  //     // ) {
  //     //   e.preventDefault()
  //     // }

  //     // 应用滚动位置
  //     ref.current.scrollLeft = -scrollLeft
  //   }
  // }

  // useEffect(() => {
  //   console.log(2222233333)
  //   const containerElement = containerRef.current
  //   const handleMouseWheel = (e: WheelEvent) => {
  //     // e.preventDefault() // 阻止默认滚动行为
  //     // 在这里添加您自己的滚动处理逻辑

  //     if (!containerElement) {
  //       return
  //     }
  //     const delta = e.deltaY || e.detail

  //     // console.log('delta', delta)

  //     // 根据滚动方向调整水平滚动位置
  //     scrollLeft -= delta
  //     scrollLeft = Math.min(
  //       0,
  //       Math.max(
  //         scrollLeft,
  //         -containerElement.scrollWidth + containerElement.clientWidth
  //       )
  //     )

  //     // 阻止全局滚动事件，只允许容器滚动

  //     // if (
  //     //   scrollLeft !== 0 &&
  //     //   delta > 0 // 防止向下滚动
  //     //   // (scrollLeft === -ref.current.scrollWidth + ref.current.clientWidth &&
  //     //   //   delta < 0) // 防止向上滚动
  //     // ) {
  //     //   e.preventDefault()
  //     // }

  //     // if (
  //     //   (scrollLeft === 0 && delta > 0) || // 防止向下滚动
  //     //   (scrollLeft ===
  //     //     -containerElement.scrollWidth + containerElement.clientWidth &&
  //     //     delta < 0) // 防止向上滚动
  //     // ) {
  //     //   e.preventDefault()
  //     // }

  //     // 应用滚动位置
  //     containerElement.scrollLeft = -scrollLeft
  //   }

  //   if (containerElement) {
  //     containerElement.addEventListener('wheel', handleMouseWheel, {
  //       passive: false
  //     })
  //   }

  //   // 在组件卸载时清除事件监听器
  //   return () => {
  //     if (containerElement) {
  //       containerElement.removeEventListener('wheel', handleMouseWheel)
  //     }
  //   }
  // }, [])

  useEffect(() => {
    const containerElement = containerRef.current

    const handleMouseWheel = (e: WheelEvent) => {
      if (!containerElement) {
        return
      }
      const delta = e.deltaY || e.detail

      // 根据滚动方向调整水平滚动位置
      scrollLeft -= delta
      scrollLeft = Math.min(
        0,
        Math.max(
          scrollLeft,
          -containerElement.scrollWidth + containerElement.clientWidth
        )
      )

      containerElement.scrollLeft = -scrollLeft
    }

    const onScrollX = (latest: number) => {
      console.log(333444, latest)
    }

    if (containerElement) {
      containerElement.addEventListener('wheel', handleMouseWheel, {
        passive: false
      })
    }

    const unsubX = scrollXProgress.on('change', onScrollX)

    return () => {
      unsubX()
      if (containerElement) {
        containerElement.removeEventListener('wheel', handleMouseWheel)
      }
    }
  }, [scrollXProgress])

  // useMotionValueEvent(scrollXProgress, 'change', (latest) => {
  //   console.log('scrollXProgress', latest)
  // })

  return (
    <>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="translate-y-4">
        <circle
          cx="50"
          cy="50"
          r="30"
          pathLength="1"
          fill="none"
          strokeDashoffset={0}
          strokeWidth="15%"
          opacity={0.1}
          className="stroke-zinc-700 dark:stroke-zinc-50"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          pathLength="1"
          fill="none"
          strokeDashoffset={0}
          strokeWidth="15%"
          className="stroke-zinc-700 dark:stroke-zinc-50"
          style={{ pathLength: scrollXProgress }}
        />
      </svg>

      <div
        ref={containerRef}
        // onWheel={handleMouseWheel}
        className="flex mx-auto h-[300px] basis-[600px] gap-6 overflow-x-scroll scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className="grow-0 shrink-0 basis-[200px] flex items-center justify-center h-64 w-48 border-2 bg-zinc-50 dark:bg-zinc-800 border-zinc-700 dark:border-zinc-200 border-opacity-10 rounded ">
            {i}
          </div>
        ))}
      </div>
    </>
  )
  // bg-zinc-700 dark:bg-zinc-50
}
