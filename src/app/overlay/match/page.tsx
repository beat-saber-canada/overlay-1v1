import TeamOfThree from "@bocchi/bs-canada-overlay/app/overlay/match/_components/TeamOfThree"
import CurrentMap from "@bocchi/bs-canada-overlay/app/overlay/match/_components/CurrentMap"
import MatchScoreAnimation from "@bocchi/bs-canada-overlay/app/overlay/match/MatchScoreAnimation"

const MatchPage = () => {
  return (
    <MatchScoreAnimation>
      <div className="col-span-4 flex w-full flex-col gap-5">
        <div className="flex h-20" />
        <TeamOfThree teamIndex={0} />
        <TeamOfThree teamIndex={1} />
      </div>
      <div className="flex items-end justify-end">
        <CurrentMap />
      </div>
    </MatchScoreAnimation>
  )
}

export default MatchPage
