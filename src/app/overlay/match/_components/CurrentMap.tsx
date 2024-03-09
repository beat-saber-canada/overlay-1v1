"use client"

import DifficultyBadge from "@bocchi/bs-canada-overlay/app/overlay/_components/DifficultyBadge"
import useCurrentMatchIdQuery from "@bocchi/bs-canada-overlay/app/overlay/_hooks/useCurrentMatchIdQuery"
import { graphql, useLazyLoadQuery } from "react-relay"
import { CurrentMapQuery } from "@bocchi/bs-canada-overlay/__generated__/CurrentMapQuery.graphql"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { background } from "../../_components/MapCard"

const CurrentMap = () => {
  const { data: currentMatchId } = useCurrentMatchIdQuery()
  const currentMapQuery = useLazyLoadQuery<CurrentMapQuery>(
    graphql`
      query CurrentMapQuery($currentMatchId: Uuid!, $skip: Boolean!) {
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
  const difficulty = currentMapQuery.matchById?.currentMap?.difficulty

  if (!mapDetails) return null

  return (
    <div
      className={background({
        className: "h-[140px] w-auto gap-5 transition-all",
      })}
    >
      <div className="flex flex-row items-center gap-5">
        <img
          className="aspect-square h-24 rounded-md"
          src={mapDetails?.versions?.[0].coverURL}
        />
        <div className="flex flex-col overflow-hidden">
          <span className="line-clamp-1 overflow-ellipsis text-2xl text-white">
            {mapDetails?.metadata.songName} -{" "}
            {mapDetails?.metadata.songAuthorName}
          </span>
          <span className="line-clamp-1 overflow-ellipsis text-sm text-white">
            Mapped by {mapDetails?.metadata.levelAuthorName}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        {!!difficulty && <DifficultyBadge difficulty={difficulty} />}
        <span className="text-md font-semibold text-white">
          {mapDetails?.id}
        </span>
        <span className="text-sm text-white">
          {mapDetails?.metadata.bpm} BPM
        </span>
      </div>
    </div>
  )
}

export default CurrentMap
