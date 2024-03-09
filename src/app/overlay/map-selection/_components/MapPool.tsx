"use client"

import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import MapCard from "@bocchi/bs-canada-overlay/app/overlay/_components/MapCard"

const MapPool = () => {
  const { data: mapPool, isFetched } = trpc.currentMapPool.useQuery(undefined, {
    refetchInterval: 1000,
  })

  if (!isFetched) return null

  return (
    <div className="flex flex-wrap items-center gap-5">
      {!!mapPool &&
        mapPool.maps.map((map) => (
          <MapCard map={map} key={map.mapDetails.id} />
        ))}
    </div>
  )
}

export default MapPool
