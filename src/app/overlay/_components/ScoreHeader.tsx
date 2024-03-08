"use client"

import { Suspense } from "react"
import PlayerScoreHeader from "./PlayerScoreHeader"

interface Props {
  hideScore?: boolean
}

const ScoreHeader = (props: Props) => {
  const { hideScore } = props

  return (
    <div className={`flex h-20 flex-row items-center justify-center gap-5`}>
      <Suspense fallback={null}>
        <PlayerScoreHeader playerIndex={0} reverse hideScore={hideScore} />
      </Suspense>
      <img src="/Red_Icon.png" className="aspect-square h-12" />
      <Suspense fallback={null}>
        <PlayerScoreHeader playerIndex={1} hideScore={hideScore} />
      </Suspense>
    </div>
  )
}

export default ScoreHeader
