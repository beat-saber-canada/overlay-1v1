"use server"

import MapCard from "@bocchi/bs-canada-overlay/components/MapCard"
import Difficulty from "@bocchi/bs-canada-overlay/data/Difficulty"
import MapSelectionScoreAnimation from "@bocchi/bs-canada-overlay/app/map-selection/MapSelectionScoreAnimation"

const MapSelectionPage = () => {
  return (
    <MapSelectionScoreAnimation>
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
      <MapCard
        name="Routine"
        artist="Silent Siren"
        mapper="Hexagonial & Splake"
        difficulty={Difficulty.ExpertPlus}
        pictureUrl="https://cdn.scoresaber.com/covers/AEDD974BD0B7BFAF8C9F9950BFD6368C04ADE258.png"
        bsrKey="2683"
        bpm={176}
        state="picked"
      />
      <MapCard
        name="Routine"
        artist="Silent Siren"
        mapper="Hexagonial & Splake"
        difficulty={Difficulty.ExpertPlus}
        pictureUrl="https://cdn.scoresaber.com/covers/AEDD974BD0B7BFAF8C9F9950BFD6368C04ADE258.png"
        bsrKey="2683"
        bpm={176}
        state="banned"
      />
      <MapCard
        name="Routine"
        artist="Silent Siren"
        mapper="Hexagonial & Splake"
        difficulty={Difficulty.ExpertPlus}
        pictureUrl="https://cdn.scoresaber.com/covers/AEDD974BD0B7BFAF8C9F9950BFD6368C04ADE258.png"
        bsrKey="2683"
        bpm={176}
        state="tiebreaker"
      />
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
    </MapSelectionScoreAnimation>
  )
}

export default MapSelectionPage
