import TeamOfThree from "@bocchi/bs-canada-overlay/components/TeamOfThree"
import ScoreHeader from "@bocchi/bs-canada-overlay/components/ScoreHeader"
import CurrentMap from "@bocchi/bs-canada-overlay/components/CurrentMap"

const Home = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <ScoreHeader />
      <div className="grid max-h-fit w-full grid-cols-5">
        <div className="col-span-4 flex w-full flex-col gap-5">
          <TeamOfThree teamName="Team 1" />
          <TeamOfThree teamName="Team 2" />
        </div>
        <div className="flex items-end justify-end pl-5">
          <CurrentMap
            name="Routine"
            artist="Silent Siren"
            mapper="Hexagonial & Splake"
            difficulty="Expert+"
            pictureUrl="https://cdn.scoresaber.com/covers/AEDD974BD0B7BFAF8C9F9950BFD6368C04ADE258.png"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
