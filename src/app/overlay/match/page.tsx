"use server"

import TeamOfThree from "@bocchi/bs-canada-overlay/app/overlay/match/_components/TeamOfThree"
import CurrentMap from "@bocchi/bs-canada-overlay/app/overlay/match/_components/CurrentMap"
import Difficulty from "@bocchi/bs-canada-overlay/data/Difficulty"
import MatchScoreAnimation from "@bocchi/bs-canada-overlay/app/overlay/match/MatchScoreAnimation"

const getStreamUrl = (playerName: string) => {
  return `${process.env.NEXT_PUBLIC_STREAM_BASE_URL}/bsc/${playerName}/index.m3u8`
}

const MatchPage = () => {
  return (
    <MatchScoreAnimation>
      <div className="col-span-4 flex w-full flex-col gap-5">
        <div className="flex h-20" />
        <TeamOfThree teamIndex={0} />
        <TeamOfThree teamIndex={1} />
      </div>
      <div className="flex justify-end">
        <CurrentMap />
      </div>
    </MatchScoreAnimation>
  )
}

export default MatchPage
