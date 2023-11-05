"use client"

import { useSpring, animated } from "@react-spring/web"
import { useEffect, useRef, useState } from "react"
import DifficultyBadge from "@bocchi/bs-canada-overlay/components/DifficultyBadge"
import Difficulty from "@bocchi/bs-canada-overlay/data/Difficulty"

interface Props {
  name: string
  artist: string
  mapper: string
  difficulty: Difficulty
  pictureUrl: string
  bsrKey: string
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
  const { name, artist, mapper, difficulty, pictureUrl, bsrKey } = props
  const { width, ref: spanRef } = useObserveElementWidth<HTMLSpanElement>()
  const pauseAnimation = width < 240
  const spring = useSpring({
    from: { x: width / 2 - 100 },
    to: { x: 100 - width / 2 },
    loop: { reverse: true, delay: 1000 },
    reset: true,
    config: { duration: width * 15 },
    pause: pauseAnimation,
  })

  return (
    <div className="flex h-[388px] w-[260px] flex-col items-center gap-5 overflow-hidden rounded-md bg-black p-5 text-center text-white shadow shadow-black">
      <h1 className="text-3xl font-semibold">Now Playing</h1>
      <img className="aspect-square w-40 rounded-md" src={pictureUrl} />
      <animated.span
        className="line-clamp-1 overflow-hidden whitespace-nowrap text-2xl"
        style={pauseAnimation ? {} : { ...spring }}
        ref={spanRef}
      >
        {name} - {artist} ({mapper})
      </animated.span>
      <div className="flex flex-row items-center gap-2">
        <DifficultyBadge difficulty={difficulty} />
        <div className="flex flex-row gap-2 rounded-md bg-white p-2">
          <img src="/Beatsaver.svg" className="w-5" />
          <span className="text-lg text-black">{bsrKey}</span>
        </div>
      </div>
    </div>
  )
}

export default CurrentMap
