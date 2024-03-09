"use client"

import DifficultyBadge from "@bocchi/bs-canada-overlay/app/overlay/_components/DifficultyBadge"
import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "@bocchi/bs-canada-overlay/server/routers"
import { cva } from "class-variance-authority"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"

interface Props {
  map: inferRouterOutputs<AppRouter>["currentMapPool"]["maps"][0]
}

export const background = cva(
  "transition ease-in-out delay-150 flex w-[700px] flex-row items-center justify-between rounded-md p-5 bg-black outline outline-offset-4 outline-4",
  {
    variants: {
      state: {
        default: "outline-none",
        picked: "outline-picked-green",
        banned: "outline-maple-red-dark",
        tiebreaker: "outline-tiebreaker-yellow",
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

  return (
    <div className={background({ state: mapPoolState ?? undefined })}>
      <div className="flex flex-row items-center gap-5">
        <img
          className="aspect-square h-24 rounded-md"
          src={map.mapDetails?.versions?.[0].coverURL}
        />
        <div className="flex w-[420px] flex-col overflow-hidden">
          <span className="line-clamp-1 overflow-ellipsis text-2xl text-white">
            {map.mapDetails.metadata.songName} -{" "}
            {map.mapDetails.metadata.songAuthorName}
          </span>
          <span className="line-clamp-1 overflow-ellipsis text-sm text-white">
            Mapped by {map.mapDetails.metadata.levelAuthorName}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <DifficultyBadge difficulty={map.difficulty} />
        <span className="text-md font-semibold text-white">
          {map.mapDetails.id}
        </span>
        <span className="text-sm text-white">
          {map.mapDetails.metadata.bpm} BPM
        </span>
      </div>
    </div>
  )
}

export default MapCard
