"use client"

import TeamOfThree from "@bocchi/bs-canada-overlay/components/TeamOfThree"
import ScoreHeader from "@bocchi/bs-canada-overlay/components/ScoreHeader"
import CurrentMap from "@bocchi/bs-canada-overlay/components/CurrentMap"
import Difficulty from "@bocchi/bs-canada-overlay/data/Difficulty"
import { useSpring, animated } from "@react-spring/web"
import { useEffect, useState } from "react"

const Home = () => {
  const [isMatchVisible, setisMatchVisible] = useState(false)
  const [hideScore, setHideScore] = useState(true)
  const scoreSpring = useSpring({
    scale: isMatchVisible ? "100%" : "150%",
    top: isMatchVisible ? "4%" : "50%",
    delay: 1000,
    config: {
      tension: 100,
      friction: 20,
    },
  })

  const contentSpring = useSpring({
    opacity: isMatchVisible ? 1 : 0,
    delay: 1000,
    config: {
      tension: 100,
      friction: 50,
    },
  })

  useEffect(() => {
    setisMatchVisible(true)
    setTimeout(() => {
      setHideScore(false)
    }, 1000)
  }, [])

  return (
    <>
      <animated.div
        className="grid max-h-fit w-full grid-cols-5"
        style={{ ...contentSpring }}
      >
        <div className="col-span-4 flex w-full flex-col gap-5">
          <div className="flex h-20" />
          <TeamOfThree teamName="Team 1" />
          <TeamOfThree teamName="Team 2" />
        </div>
        <div className="flex justify-end">
          <CurrentMap
            name="Routine"
            artist="Silent Siren"
            mapper="Hexagonial & Splake"
            difficulty={Difficulty.ExpertPlus}
            pictureUrl="https://cdn.scoresaber.com/covers/AEDD974BD0B7BFAF8C9F9950BFD6368C04ADE258.png"
            bsrKey="2683"
          />
        </div>
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

export default Home
