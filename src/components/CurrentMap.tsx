"use client"

import { useSpring, animated } from "@react-spring/web"
import { useEffect, useRef, useState } from "react"

interface Props {
  name: string
  artist: string
  mapper: string
  difficulty: string
  pictureUrl: string
}

export const useObserveElementWidth = <T extends HTMLElement>() => {
  const [width, setWidth] = useState(0)
  const ref = useRef<T>(null)

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width)
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      ref.current && observer.unobserve(ref.current)
    }
  }, [])

  return {
    width,
    ref,
  }
}

const CurrentMap = (props: Props) => {
  const { name, artist, mapper, difficulty, pictureUrl } = props
  const { width, ref: spanRef } = useObserveElementWidth<HTMLSpanElement>()
  const spring = useSpring({
    from: { x: (spanRef.current?.clientWidth ?? 0) / 2 - 100 },
    to: { x: 100 - (spanRef.current?.clientWidth ?? 0) / 2 },
    loop: { reverse: true, delay: 1000 },
    reset: true,
    config: { duration: (spanRef.current?.clientWidth ?? 0) * 15 },
  })

  return (
    <div className="flex h-[388px] w-72 flex-col items-center gap-5 overflow-hidden rounded-md bg-black p-5 text-center shadow shadow-black">
      <h1 className="text-3xl font-semibold text-white">Now Playing</h1>
      <img className="aspect-square w-40 rounded-md" src={pictureUrl} />
      <animated.span
        className="line-clamp-1 overflow-hidden whitespace-nowrap text-2xl text-white"
        style={{ ...spring }}
        ref={spanRef}
      >
        {name} - {artist} ({mapper})
      </animated.span>
      <div className="flex rounded-md bg-purple-600 p-2 shadow shadow-gray-600">
        <span className="text-xl">{difficulty}</span>
      </div>
    </div>
  )
}

export default CurrentMap
