"use client"

import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import MapPoolDropdown from "@bocchi/bs-canada-overlay/app/_components/MapPoolOptions/MapPoolDropdown"

const MapPoolDropdowns = () => {
  const { data: currentMapPool, isFetched } = trpc.currentMapPool.useQuery()

  if (!isFetched) return null

  return (
    <div className="flex flex-wrap gap-5">
      {currentMapPool?.maps.map((map) => (
        <MapPoolDropdown key={map.mapDetails.id} map={map} />
      ))}
    </div>
  )
}

export default MapPoolDropdowns
