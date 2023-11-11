"use client"

import TeamScoreHeader from "@bocchi/bs-canada-overlay/app/overlay/_components/TeamScoreHeader"

interface Props {
  hideScore?: boolean
}

const ScoreHeader = (props: Props) => {
  const { hideScore } = props

  return (
    <div className={`flex h-20 flex-row items-center justify-center gap-5`}>
      <TeamScoreHeader teamIndex={0} reverse hideScore={hideScore} />
      <img src="/Red_Icon.png" className="aspect-square h-12" />
      <TeamScoreHeader teamIndex={1} hideScore={hideScore} />
    </div>
  )
}

export default ScoreHeader
