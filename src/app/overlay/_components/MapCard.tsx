"use client"

import DifficultyBadge from "@bocchi/bs-canada-overlay/app/overlay/_components/DifficultyBadge"
import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "@bocchi/bs-canada-overlay/server/routers"
import { cva } from "class-variance-authority"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { useMemo } from "react"
import isDarkColor from "@bocchi/bs-canada-overlay/utils/isDarkColor"

interface Props {
  map: inferRouterOutputs<AppRouter>["currentMapPool"]["maps"][0]
}

export const background = cva(
  "transition ease-in-out delay-150 flex w-[700px] flex-row items-center justify-between rounded-md p-5 outline outline-offset-4 outline-4",
  {
    variants: {
      state: {
        default: "outline-none",
        picked: "outline-picked-green",
        banned: "outline-maple-red-dark",
        tiebreaker: "outline-tiebreaker-yellow",
      },
      isDark: {
        true: "text-white",
        false: "text-black",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
)

const MapCard = (props: Props) => {
  const { map } = props
  const { data: mapPoolState } = trpc.mapPoolStateForMap.useQuery(
    map.mapDetails.id,
    {
      refetchInterval: 1000,
    },
  )
  const { data: colorThief } = trpc.colorThief.useQuery(
    map.mapDetails?.versions?.[0].coverURL,
    {
      enabled: !!map.mapDetails?.versions?.[0].coverURL,
    },
  )
  const isDark = useMemo(() => {
    if (!colorThief) return true
    return isDarkColor(colorThief[0], colorThief[1], colorThief[2])
  }, [colorThief])

  return (
    <div
      className={background({ state: mapPoolState ?? undefined, isDark })}
      style={{
        background: `rgb(${colorThief?.[0]}, ${colorThief?.[1]}, ${colorThief?.[2]})`,
      }}
    >
      <div className="flex flex-row items-center gap-5">
        <img
          className="aspect-square h-24 rounded-md"
          src={map.mapDetails?.versions?.[0].coverURL}
        />
        <div className="flex w-[420px] flex-col overflow-hidden">
          <span className="line-clamp-1 overflow-ellipsis text-2xl">
            {map.mapDetails.metadata.songName} -{" "}
            {map.mapDetails.metadata.songAuthorName}
          </span>
          <span className="line-clamp-1 overflow-ellipsis text-sm ">
            Mapped by {map.mapDetails.metadata.levelAuthorName}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <DifficultyBadge difficulty={map.difficulty} />
        <span className="text-md font-semibold ">{map.mapDetails.id}</span>
        <span className="text-sm">{map.mapDetails.metadata.bpm} BPM</span>
      </div>
    </div>
  )
}

export default MapCard
