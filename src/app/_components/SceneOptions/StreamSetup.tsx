"use client"

import StreamDialog from "@bocchi/bs-canada-overlay/app/_components/SceneOptions/StreamDialog"
import { graphql, useLazyLoadQuery } from "react-relay"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { StreamSetupQuery } from "@bocchi/bs-canada-overlay/__generated__/StreamSetupQuery.graphql"
import { useMemo } from "react"

const StreamSetup = () => {
  const { data: currentMatchId } = trpc.currentMatchId.useQuery()
  const streamSetupQuery = useLazyLoadQuery<StreamSetupQuery>(
    graphql`
      query StreamSetupQuery($currentMatchId: Uuid!, $skip: Boolean!) {
        matchById(id: $currentMatchId) @skip(if: $skip) {
          players {
            userId
            name
            team {
              guid
            }
          }
          teams {
            guid
          }
        }
      }
    `,
    { currentMatchId: currentMatchId, skip: !currentMatchId },
  )
  const playersByTeams = useMemo(
    () =>
      streamSetupQuery?.matchById?.players?.reduce(
        (acc, player) => {
          const teamGuid = player.team?.guid
          if (!teamGuid) return acc
          if (!acc[teamGuid]) acc[teamGuid] = []
          acc[teamGuid].push(player)
          return acc
        },
        {} as Record<string, (typeof streamSetupQuery.matchById.players)[0][]>,
      ),
    [streamSetupQuery],
  )

  if (!playersByTeams) return null

  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-xs font-light text-gray-600">Stream Setup</label>
      <div className="flex flex-col gap-10 rounded-md p-5 outline outline-1 outline-slate-300">
        <div className="flex flex-row justify-between">
          {playersByTeams[streamSetupQuery.matchById?.teams[0].guid]?.map(
            (player) => (
              <StreamDialog
                key={player.userId}
                userId={player.userId}
                name={player.name}
              />
            ),
          )}
        </div>
        <div className="flex flex-row justify-between">
          {playersByTeams[streamSetupQuery.matchById?.teams[1].guid]?.map(
            (player) => (
              <StreamDialog
                key={player.userId}
                userId={player.userId}
                name={player.name}
              />
            ),
          )}
        </div>
      </div>
    </div>
  )
}

export default StreamSetup
