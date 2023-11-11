"use client"

import ScoreHeader from "@bocchi/bs-canada-overlay/app/overlay/_components/ScoreHeader"
import { animated, useSpring } from "@react-spring/web"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Props {
  children?: React.ReactNode
}

const MapSelectionScoreAnimation = (props: Props) => {
  const { children } = props
  const [isMapsVisible, setIsMapsVisible] = useState(false)
  const scoreSpring = useSpring({
    scale: isMapsVisible ? "100%" : "150%",
    top: isMapsVisible ? "4%" : "50%",
    config: {
      tension: 100,
      friction: 20,
    },
  })
  const contentSpring = useSpring({
    opacity: isMapsVisible ? 1 : 0,
    config: {
      tension: 100,
      friction: 50,
    },
    onResolve: () => {
      if (isMapsVisible) return
      //router.push("/match")
    },
  })
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      setIsMapsVisible(true)
    }, 1000)
  }, [])

  useEffect(() => {
    // Just doing this for local testing
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "m") {
        setIsMapsVisible(false)
      }
    }

    window.addEventListener("keydown", handleKeyPress)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  return (
    <>
      <animated.div
        className="flex flex-col items-center gap-10"
        style={{ ...contentSpring }}
      >
        <div className="flex h-20" />
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
        <ScoreHeader hideScore />
      </animated.div>
    </>
  )
}

export default MapSelectionScoreAnimation
