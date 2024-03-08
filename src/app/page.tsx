"use client"

import MatchOptions from "@bocchi/bs-canada-overlay/app/_components/MatchOptions/MatchOptions"
import MapPoolOptions from "@bocchi/bs-canada-overlay/app/_components/MapPoolOptions/MapPoolOptions"
import StreamOptions from "@bocchi/bs-canada-overlay/app/_components/SceneOptions/StreamOptions"
import { Suspense, useEffect, useState } from "react"

const DashboardPage = () => {
  // No time to fix sorry
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <Suspense>
      <div className="flex h-full w-full flex-col items-center gap-10 p-5 pt-10">
        <h1 className="text-center text-6xl font-semibold">Stream Dashboard</h1>
        <div className="flex flex-wrap gap-8">
          <StreamOptions />
          <MatchOptions />
          <MapPoolOptions />
        </div>
      </div>
    </Suspense>
  )
}

export default DashboardPage
