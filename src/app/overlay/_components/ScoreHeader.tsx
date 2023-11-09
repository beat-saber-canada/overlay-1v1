"use client"

import TeamScoreHeader from "@bocchi/bs-canada-overlay/app/overlay/_components/TeamScoreHeader"
import { graphql, useLazyLoadQuery } from "react-relay"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { ScoreHeaderQuery } from "@bocchi/bs-canada-overlay/__generated__/ScoreHeaderQuery.graphql"

interface Props {
  hideScore?: boolean
}

const ScoreHeader = (props: Props) => {
  const { hideScore } = props
  const { data: currentMatchId } = trpc.currentMatchId.useQuery()
  const scoreHeaderQuery = useLazyLoadQuery<ScoreHeaderQuery>(
    graphql`
      query ScoreHeaderQuery($currentMatchId: Uuid!, $skip: Boolean!) {
        matchById(id: $currentMatchId) @skip(if: $skip) {
          teams {
            name
          }
        }
      }
    `,
    { currentMatchId: currentMatchId, skip: !currentMatchId },
  )

  if (!scoreHeaderQuery) return null

  return (
    <div className={`flex h-20 flex-row items-center justify-center gap-5`}>
      <TeamScoreHeader
        name={scoreHeaderQuery.matchById?.teams[0].name ?? "Team 1"}
        score={0}
        accuracy={0}
        overallScore={3}
        totalRounds={5}
        reverse
        hideScore={hideScore}
      />
      <img src="/Red_Icon.png" className="aspect-square h-12" />
      <TeamScoreHeader
        name={scoreHeaderQuery.matchById?.teams[1].name ?? "Team 2"}
        score={10000}
        accuracy={99}
        overallScore={1}
        totalRounds={5}
        hideScore={hideScore}
      />
    </div>
  )
}

export default ScoreHeader
