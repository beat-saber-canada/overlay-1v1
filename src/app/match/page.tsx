"use server"

import TeamOfThree from "@bocchi/bs-canada-overlay/components/TeamOfThree"
import CurrentMap from "@bocchi/bs-canada-overlay/components/CurrentMap"
import Difficulty from "@bocchi/bs-canada-overlay/data/Difficulty"
import MatchScoreAnimation from "@bocchi/bs-canada-overlay/app/match/MatchScoreAnimation"

const MatchPage = () => {
  return (
    <MatchScoreAnimation>
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
    </MatchScoreAnimation>
  )
}

export default MatchPage
