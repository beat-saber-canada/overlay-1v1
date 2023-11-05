import TeamOfThree from "@bocchi/bs-canada-overlay/components/TeamOfThree"
import ScoreHeader from "@bocchi/bs-canada-overlay/components/ScoreHeader"
import MapCard from "@bocchi/bs-canada-overlay/components/MapCard"

const Home = () => {
  return (
    <div className="m-5 flex flex-col items-center gap-5">
      <ScoreHeader />
      <TeamOfThree teamName="Team 1" />
      <TeamOfThree teamName="Team 2" />
      <div className="flex w-full justify-start">
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
