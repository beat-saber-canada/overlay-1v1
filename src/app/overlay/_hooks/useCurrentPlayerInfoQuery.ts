import { graphql, useLazyLoadQuery } from "react-relay"
import useCurrentMatchIdQuery from "./useCurrentMatchIdQuery"
import { useCurrentPlayerInfoQuery } from "@bocchi/bs-canada-overlay/__generated__/useCurrentPlayerInfoQuery.graphql"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"

const useCurrentPlayerInfoQuery = (playerIndex: number) => {
  const { data: currentMatchId } = useCurrentMatchIdQuery()
  const playerVideoQuery = useLazyLoadQuery<useCurrentPlayerInfoQuery>(
    graphql`
      query useCurrentPlayerInfoQuery($currentMatchId: Uuid!, $skip: Boolean!) {
        matchById(id: $currentMatchId) @skip(if: $skip) {
          players {
            userId
          }
        }
      }
    `,
    { currentMatchId: currentMatchId, skip: !currentMatchId },
    {
      networkCacheConfig: { poll: 500 },
    },
  )
  const { data: customPlayer } = trpc.player.getPlayer.useQuery(playerIndex, {
    enabled: !currentMatchId,
  })
  const playerId = !!currentMatchId
    ? playerVideoQuery?.matchById?.players?.[playerIndex]?.userId
    : customPlayer?.scoreSaberId
  const query = trpc.playerInfo.useQuery(playerId, {
    enabled: !!playerId,
  })
  return {
    ...query,
    playerId,
  }
}

export default useCurrentPlayerInfoQuery
