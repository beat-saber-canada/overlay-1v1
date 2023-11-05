import MapCard from "@bocchi/bs-canada-overlay/components/MapCard"

const MapSelectionPage = () => {
  return (
    <div>
      <MapCard
        name="Routine"
        artist="Silent Siren"
        mapper="Hexagonial & Splake"
        difficulty="Expert+"
        pictureUrl="/doushite.png"
        bsrKey="2683"
        bpm={176}
        state="none"
      />
    </div>
  )
}

export default MapSelectionPage
