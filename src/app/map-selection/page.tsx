import MapCard from "@bocchi/bs-canada-overlay/components/MapCard"
import Difficulty from "@bocchi/bs-canada-overlay/data/Difficulty"

const MapSelectionPage = () => {
  return (
    <div>
      <MapCard
        name="Routine"
        artist="Silent Siren"
        mapper="Hexagonial & Splake"
        difficulty={Difficulty.ExpertPlus}
        pictureUrl="https://cdn.scoresaber.com/covers/AEDD974BD0B7BFAF8C9F9950BFD6368C04ADE258.png"
        bsrKey="2683"
        bpm={176}
        state="none"
      />
    </div>
  )
}

export default MapSelectionPage
