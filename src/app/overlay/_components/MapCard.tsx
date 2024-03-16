"use client"

import DifficultyBadge from "@bocchi/bs-canada-overlay/app/overlay/_components/DifficultyBadge"
import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "@bocchi/bs-canada-overlay/server/routers"
import { cva } from "class-variance-authority"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import cn from "@bocchi/bs-canada-overlay/utils/cn"
import useColorThief from "../_hooks/useColorThief"

interface Props {
  map: inferRouterOutputs<AppRouter>["currentMapPool"]["maps"][0]
}

export const background = cva(
  "transition relative overflow-hidden ease-in-out delay-150 w-[700px] rounded-md outline outline-offset-4 outline-4",
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

const rgbString = (rgb?: number[]) =>
  `rgb(${rgb?.[0]}, ${rgb?.[1]}, ${rgb?.[2]})`

const MapCard = (props: Props) => {
  const { map } = props
  const { data: mapPoolState } = trpc.mapPoolStateForMap.useQuery(
    map.mapDetails.id,
    {
      refetchInterval: 1000,
    },
  )
  const backgroundString = useColorThief(map.mapDetails?.versions?.[0].coverURL)

  return (
    <div
      className={background({
        state: mapPoolState ?? undefined,
      })}
    >
      <div
        className="absolute bottom-0 left-0 right-0 top-0"
        style={{ background: backgroundString }}
      />
      <div className="bg-white/10 backdrop-blur-sm backdrop-brightness-75">
        <div className="flex flex-row items-center justify-between p-5">
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
            <span className={cn("text-md font-semibold")}>
              {map.mapDetails.id}
            </span>
            <span className={cn("text-sm")}>
              {map.mapDetails.metadata.bpm} BPM
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapCard
