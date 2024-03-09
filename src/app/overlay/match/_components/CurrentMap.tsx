"use client"

import DifficultyBadge from "@bocchi/bs-canada-overlay/app/overlay/_components/DifficultyBadge"
import useCurrentMatchIdQuery from "@bocchi/bs-canada-overlay/app/_hooks/useCurrentMatchIdQuery"
import { graphql, useLazyLoadQuery } from "react-relay"
import { CurrentMapQuery } from "@bocchi/bs-canada-overlay/__generated__/CurrentMapQuery.graphql"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { background } from "../../_components/MapCard"
import { useMemo } from "react"
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
  const { isFirstDark, isSecondDark, backgroundString } = useColorThief(
    mapDetails?.versions?.[0].coverURL,
  )
  const difficulty = currentMapQuery.matchById?.currentMap?.difficulty

  if (!mapDetails) return null

  return (
    <div
      className={background({
        className: "h-[140px] w-auto gap-5 transition-all",
        isDark: isFirstDark,
      })}
      style={{
        background: backgroundString,
      }}
    >
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
        <span
          className={cn(
            "text-md font-semibold",
            isSecondDark ? "text-white" : "text-black",
          )}
        >
          {mapDetails?.id}
        </span>
        <span
          className={cn("text-sm", isSecondDark ? "text-white" : "text-black")}
        >
          {mapDetails?.metadata.bpm} BPM
        </span>
      </div>
    </div>
  )
}

export default CurrentMap
