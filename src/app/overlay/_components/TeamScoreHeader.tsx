"use client"

import OverallScore from "@bocchi/bs-canada-overlay/app/overlay/_components/OverallScore"
import { useSpring, animated } from "@react-spring/web"
import {
  DependencyList,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

interface Props {
  name: string
  score: number
  accuracy: number
  pictureUrl: string
  reverse?: boolean
  overallScore: number
  totalRounds: number
  hideScore?: boolean
}

const useObserveMaxWidth = <T extends HTMLElement>(deps?: DependencyList) => {
  const [width, setWidth] = useState(0)
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    setWidth(ref.current?.scrollWidth ?? 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return {
    width,
    ref,
  }
}

const TeamScoreHeader = (props: Props) => {
  const {
    name,
    score,
    accuracy,
    pictureUrl,
    reverse,
    overallScore,
    hideScore,
    totalRounds,
  } = props
  const { width, ref: scoreRef } = useObserveMaxWidth<HTMLDivElement>([
    score,
    accuracy,
    hideScore,
  ])
  const [mounted, setMounted] = useState(false)
  const scoreSpring = useSpring({
    width: hideScore ? "0px" : `${width}px`,
    immediate: !mounted,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className={`flex flex-row items-center gap-5 ${
        reverse ? "flex-row-reverse" : ""
      }`}
    >
      <animated.div
        className="flex flex-col overflow-hidden"
        style={
          mounted
            ? { ...scoreSpring }
            : { width: hideScore ? "0px" : `${width}px` }
        }
        ref={scoreRef}
      >
        <span className="text-xl font-semibold">{accuracy.toFixed(2)}%</span>
        <span className="text-sm">{score}</span>
      </animated.div>

      <div
        className={`flex flex-row items-center gap-2 ${
          reverse && "flex-row-reverse"
        } `}
      >
        <span className="text-xl font-bold">{name}</span>
        <img src={pictureUrl} className="aspect-square h-20 rounded-md" />
      </div>

      <OverallScore
        score={overallScore}
        totalRounds={totalRounds}
        reverse={reverse}
      />
    </div>
  )
}

export default TeamScoreHeader
