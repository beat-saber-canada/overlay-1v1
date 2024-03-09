import MatchScoreAnimation from "@bocchi/bs-canada-overlay/app/overlay/match/MatchScoreAnimation"
import PlayerVideo from "./_components/PlayerVideo"
import CurrentMap from "./_components/CurrentMap"

const MatchPage = () => {
  return (
    <MatchScoreAnimation>
      <div className="flex w-full flex-col gap-5">
        <div className="flex h-28" />
        <div className="flex">
          <PlayerVideo playerIndex={0} />
          <PlayerVideo playerIndex={1} />
        </div>
        <div className="flex w-full items-center justify-center pb-5">
          <CurrentMap />
        </div>
      </div>
    </MatchScoreAnimation>
  )
}

export default MatchPage
