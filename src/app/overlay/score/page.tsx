"use client"

import ScoreHeader from "@bocchi/bs-canada-overlay/app/overlay/_components/ScoreHeader"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

const ScorePage = () => {
  const searchParams = useSearchParams()
  const [hideScore, setHideScore] = useState(
    searchParams.get("hideScore") === "true",
  )

  return (
    <div
      style={{
        scale: "150%",
        top: "50%",
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <ScoreHeader hideScore={hideScore} />
    </div>
  )
}

export default ScorePage
