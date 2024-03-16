"use client"

import DifficultyBadge from "@bocchi/bs-canada-overlay/app/overlay/_components/DifficultyBadge"
import useCurrentMatchIdQuery from "@bocchi/bs-canada-overlay/app/_hooks/useCurrentMatchIdQuery"
import { graphql, useLazyLoadQuery } from "react-relay"
import { CurrentMapQuery } from "@bocchi/bs-canada-overlay/__generated__/CurrentMapQuery.graphql"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { background } from "../../_components/MapCard"
import useColorThief from "../../_hooks/useColorThief"
import cn from "@bocchi/bs-canada-overlay/utils/cn"

const CurrentMap = () => {
  const { data: currentMatchId } = useCurrentMatchIdQuery()
  const currentMapQuery = useLazyLoadQuery<CurrentMapQuery>(
    graphql`
      query CurrentMapQuery($currentMatchId: UUID!, $skip: Boolean!) {
        matchById(id: $currentMatchId) @skip(if: $skip) {
          currentMap {
            name
            difficulty
            hash
          }
        }
      }
    `,
    { currentMatchId: currentMatchId, skip: !currentMatchId },
    {
      networkCacheConfig: { poll: 500 },
    },
  )
  const { data: mapDetails } = trpc.beatSaverMapDetails.useQuery(
    currentMapQuery.matchById?.currentMap?.hash!,
    {
      enabled: !!currentMapQuery.matchById?.currentMap?.hash,
    },
  )
  const backgroundString = useColorThief(mapDetails?.versions?.[0].coverURL)
  const difficulty = currentMapQuery.matchById?.currentMap?.difficulty

  if (!mapDetails) return null

  return (
    <div
      className={background({
        className: "h-[140px] w-auto  transition-all",
      })}
      style={{
        background: backgroundString,
      }}
    >
      <div
        className="absolute bottom-0 left-0 right-0 top-0"
        style={{ background: backgroundString }}
      />
      <div className="bg-white/10 backdrop-blur-sm backdrop-brightness-75">
        <div className="flex flex-row items-center justify-between gap-5 p-5">
          <div className="flex flex-row items-center gap-5">
            <img
              className="aspect-square h-24 rounded-md"
              src={mapDetails?.versions?.[0].coverURL}
            />
            <div className="flex min-w-[420px] max-w-[1200px] flex-col overflow-hidden">
              <span className="line-clamp-1 overflow-ellipsis text-2xl ">
                {mapDetails?.metadata.songName} -{" "}
                {mapDetails?.metadata.songAuthorName}
              </span>
              <span className="line-clamp-1 overflow-ellipsis text-sm ">
                Mapped by {mapDetails?.metadata.levelAuthorName}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {!!difficulty && <DifficultyBadge difficulty={difficulty} />}
            <span className={cn("text-md font-semibold")}>
              {mapDetails?.id}
            </span>
            <span className={cn("text-sm")}>
              {mapDetails?.metadata.bpm} BPM
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentMap
