"use client"

import DifficultyBadge from "@bocchi/bs-canada-overlay/app/overlay/_components/DifficultyBadge"
import useCurrentMatchIdQuery from "@bocchi/bs-canada-overlay/app/overlay/_hooks/useCurrentMatchIdQuery"
import { graphql, useLazyLoadQuery } from "react-relay"
import { CurrentMapQuery } from "@bocchi/bs-canada-overlay/__generated__/CurrentMapQuery.graphql"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"

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

  return (
    <div className="flex w-[700px] flex-row items-center justify-between rounded-md bg-black p-5">
      <div className="flex flex-row items-center gap-5">
        <img
          className="aspect-square h-2 rounded-md"
          src={mapDetails?.versions?.[0].coverURL}
        />
        <div className="flex w-[420px] overflow-hidden">
          <span className="line-clamp-1 overflow-ellipsis text-2xl text-white">
            {mapDetails?.metadata.songName} -{" "}
            {mapDetails?.metadata.songAuthorName}
          </span>
          <span className="line-clamp-1 overflow-ellipsis text-sm text-white">
            Mapped by {mapDetails?.metadata.levelAuthorName}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CurrentMap
