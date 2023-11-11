"use client"

import ScoreHeader from "@bocchi/bs-canada-overlay/app/overlay/_components/ScoreHeader"
import { animated, useSpring } from "@react-spring/web"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import MapPoolBanner from "@bocchi/bs-canada-overlay/app/overlay/map-selection/_components/MapPoolBanner"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"

interface Props {
  children?: React.ReactNode
}

const MapSelectionScoreAnimation = (props: Props) => {
  const { children } = props
  const [isMapsVisible, setIsMapsVisible] = useState(false)
  const { data: currentScene } = trpc.currentScene.useQuery(undefined, {
    refetchInterval: 1000,
  })
  const pathname = usePathname()
  const router = useRouter()

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
      if (!isMapsVisible) router.push(`/overlay/${currentScene}`)
    },
  })

  useEffect(() => {
    setTimeout(() => {
      setIsMapsVisible(true)
    }, 1000)
  }, [])

  useEffect(() => {
    if (!!currentScene && pathname !== `/overlay/${currentScene}`)
      setIsMapsVisible(false)
  }, [currentScene, pathname])

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
      <MapPoolBanner style={{ ...contentSpring }} />
    </>
  )
}

export default MapSelectionScoreAnimation
