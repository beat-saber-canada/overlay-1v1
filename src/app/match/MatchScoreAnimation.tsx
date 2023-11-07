"use client"

import { useSpring, animated } from "@react-spring/web"
import { useEffect, useState } from "react"
import ScoreHeader from "@bocchi/bs-canada-overlay/components/ScoreHeader"
import { useRouter } from "next/navigation"

interface Props {
  children: React.ReactNode
}

const MatchScoreAnimation = (props: Props) => {
  const { children } = props
  const router = useRouter()
  const [isMatchVisible, setisMatchVisible] = useState(false)
  const [hideScore, setHideScore] = useState(true)
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
        router.push("/map-selection")
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
    // Just doing this for local testing
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "m") {
        setisMatchVisible(false)
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
