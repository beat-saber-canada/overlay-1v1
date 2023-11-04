import TeamOfThree from "@bocchi/bs-canada-overlay/components/TeamOfThree"
import ScoreHeader from "@bocchi/bs-canada-overlay/components/ScoreHeader"
import MapCard from "@bocchi/bs-canada-overlay/components/MapCard"

const Home = () => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-10">
      <ScoreHeader />
      <TeamOfThree teamName="Team 1" />
      <TeamOfThree teamName="Team 2" />
      <div className="flex justify-between">
        <MapCard
          name="Routine"
          artist="Silent Siren"
          mapper="Hexagonial & Splake"
          difficulty="Expert+"
          pictureUrl="https://cdn.scoresaber.com/covers/AEDD974BD0B7BFAF8C9F9950BFD6368C04ADE258.png"
        />
      </div>
    </div>
  )
}

export default Home
