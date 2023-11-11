"use client"

import PlayerVideo from "@bocchi/bs-canada-overlay/app/overlay/match/_components/PlayerVideo"
import { graphql, useLazyLoadQuery } from "react-relay"
import { TeamOfThreeQuery } from "@bocchi/bs-canada-overlay/__generated__/TeamOfThreeQuery.graphql"
import { useMemo } from "react"
import useCurrentMatchIdQuery from "@bocchi/bs-canada-overlay/app/overlay/_hooks/useCurrentMatchIdQuery"

interface Props {
  teamIndex: number
  streamUrl1: string
  streamUrl2: string
  streamUrl3: string
}

const TeamOfThree = (props: Props) => {
  const { teamIndex } = props
  const { data: currentMatchId } = useCurrentMatchIdQuery()
  const teamOfThreeQuery = useLazyLoadQuery<TeamOfThreeQuery>(
    graphql`
      query TeamOfThreeQuery($currentMatchId: Uuid!, $skip: Boolean!) {
        matchById(id: $currentMatchId) @skip(if: $skip) {
          teams {
            name
            guid
          }
          players {
            team {
              guid
            }
            guid
          }
        }
      }
    `,
    { currentMatchId: currentMatchId, skip: !currentMatchId },
    {
      networkCacheConfig: { poll: 500 },
    },
  )
  const team = useMemo(
    () => teamOfThreeQuery?.matchById?.teams?.[teamIndex],
    [teamOfThreeQuery, teamIndex],
  )
  const teamPlayers = useMemo(
    () =>
      teamOfThreeQuery?.matchById?.players?.filter(
        (player) => player.team?.guid === team?.guid,
      ),
    [teamOfThreeQuery, team],
  )

  return (
    <div className="flex flex-col gap-2">
      <div className="flex max-w-fit rounded-md bg-maple-red px-5 py-2 shadow shadow-black">
        <h1 className="text-4xl font-semibold uppercase">
          {team?.name || `Team ${teamIndex + 1}`}
        </h1>
      </div>
      <div className="flex flex-row items-center gap-10">
        <PlayerVideo playerGuid={teamPlayers?.[0]?.guid} />
        <PlayerVideo playerGuid={teamPlayers?.[1]?.guid} />
        <PlayerVideo playerGuid={teamPlayers?.[2]?.guid} />
      </div>
    </div>
  )
}

export default TeamOfThree
