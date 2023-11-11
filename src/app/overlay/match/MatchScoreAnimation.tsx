"use client"

import { useSpring, animated } from "@react-spring/web"
import { useEffect, useState } from "react"
import ScoreHeader from "@bocchi/bs-canada-overlay/app/overlay/_components/ScoreHeader"
import { usePathname, useRouter } from "next/navigation"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"

interface Props {
  children: React.ReactNode
}

const MatchScoreAnimation = (props: Props) => {
  const { children } = props
  const [isMatchVisible, setisMatchVisible] = useState(false)
  const [hideScore, setHideScore] = useState(true)
  const { data: currentScene } = trpc.currentScene.useQuery(undefined, {
    refetchInterval: 1000,
  })
  const pathname = usePathname()
  const router = useRouter()

  const scoreSpring = useSpring({
    scale: isMatchVisible ? "100%" : "150%",
    top: isMatchVisible ? "4%" : "50%",
    config: {
      tension: 100,
      friction: 20,
    },
  })

  const contentSpring = useSpring({
    opacity: isMatchVisible ? 1 : 0,
    config: {
      tension: 100,
      friction: 50,
    },
    onResolve: () => {
      if (isMatchVisible) return
      setHideScore(true)
      setTimeout(() => {
        router.push(`/overlay/${currentScene}`)
      }, 1000)
    },
  })

  useEffect(() => {
    setTimeout(() => {
      setisMatchVisible(true)
      setTimeout(() => {
        setHideScore(false)
      }, 1000)
    }, 1000)
  }, [])

  useEffect(() => {
    if (!!currentScene && pathname !== `/overlay/${currentScene}`)
      setisMatchVisible(false)
  }, [currentScene, pathname])

  return (
    <>
      <animated.div
        className="grid max-h-fit w-full grid-cols-5"
        style={{ ...contentSpring }}
      >
        {children}
      </animated.div>
      <animated.div
        style={{
          ...scoreSpring,
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <ScoreHeader hideScore={hideScore} />
      </animated.div>
    </>
  )
}

export default MatchScoreAnimation
