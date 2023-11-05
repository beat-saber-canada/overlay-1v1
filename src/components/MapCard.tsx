"use server"

import { getAverageColor } from "fast-average-color-node"
import Difficulty from "@bocchi/bs-canada-overlay/data/Difficulty"
import DifficultyBadge from "@bocchi/bs-canada-overlay/components/DifficultyBadge"

interface Props {
  name: string
  artist: string
  mapper: string
  difficulty: Difficulty
  pictureUrl: string
  bsrKey: string
  bpm: number
  state: "none" | "picked" | "banned" | "tiebreaker"
}

const MapCard = async (props: Props) => {
  const { name, artist, mapper, difficulty, pictureUrl, bsrKey, bpm, state } =
    props
  const color = await getAverageColor(pictureUrl)
  const textColor = color.isDark ? "#FFFFFF" : "#000000"

  return (
    <div
      className="flex w-[650px] flex-row items-center justify-between rounded-md p-5"
      style={{
        background: color.hex,
        border:
          state === "picked"
            ? "5px solid #2ADB00"
            : state === "banned"
            ? "5px solid #FF182E"
            : state === "tiebreaker"
            ? "5px solid #FBB03B"
            : "5px solid transparent",
      }}
    >
      <div className="flex flex-row items-center gap-5">
        <img className="aspect-square h-24 rounded-md" src={pictureUrl} />
        <div className="flex max-w-[400px] flex-col overflow-hidden">
          <span
            className="line-clamp-1 overflow-ellipsis text-2xl"
            style={{ color: textColor }}
          >
            {name} - {artist}
          </span>
          <span
            className="line-clamp-1 overflow-ellipsis text-sm"
            style={{ color: textColor }}
          >
            Mapped by {mapper}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <DifficultyBadge difficulty={difficulty} />
        <span className="text-md font-semibold" style={{ color: textColor }}>
          {bsrKey}
        </span>
        <span className="text-sm" style={{ color: textColor }}>
          {bpm} BPM
        </span>
      </div>
    </div>
  )
}

export default MapCard
