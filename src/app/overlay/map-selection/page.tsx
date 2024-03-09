import MapSelectionScoreAnimation from "@bocchi/bs-canada-overlay/app/overlay/map-selection/MapSelectionScoreAnimation"
import MapPool from "@bocchi/bs-canada-overlay/app/overlay/map-selection/_components/MapPool"

const MapSelectionPage = () => {
  return (
    <MapSelectionScoreAnimation>
      <div className="p-5">
        <MapPool />
      </div>
    </MapSelectionScoreAnimation>
  )
}

export default MapSelectionPage
