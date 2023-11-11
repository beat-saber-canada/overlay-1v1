"use client"

import DifficultyBadge from "@bocchi/bs-canada-overlay/app/overlay/_components/DifficultyBadge"
import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "@bocchi/bs-canada-overlay/server/router"

interface Props {
  map: inferRouterOutputs<AppRouter>["currentMapPool"]["maps"][0]
  state: "none" | "picked" | "banned" | "tiebreaker"
}

const MapCard = (props: Props) => {
  const { map, state } = props
  const pictureUrl = map.mapDetails?.versions?.[0].coverURL!
  const color = "#000000" //await getAverageColor(pictureUrl)
  const textColor = "#FFFFFF" //color.isDark ? "#FFFFFF" : "#000000"

  return (
    <div
      className="flex w-[650px] flex-row items-center justify-between rounded-md p-5"
      style={{
        background: color,
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
            {map.mapDetails.metadata.songName} -{" "}
            {map.mapDetails.metadata.songAuthorName}
          </span>
          <span
            className="line-clamp-1 overflow-ellipsis text-sm"
            style={{ color: textColor }}
          >
            Mapped by {map.mapDetails.metadata.levelAuthorName}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <DifficultyBadge difficulty={map.difficulty} />
        <span className="text-md font-semibold" style={{ color: textColor }}>
          {map.mapDetails.id}
        </span>
        <span className="text-sm" style={{ color: textColor }}>
          {map.mapDetails.metadata.bpm} BPM
        </span>
      </div>
    </div>
  )
}

export default MapCard
