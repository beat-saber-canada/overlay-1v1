"use client"

import PlayerVideo from "@bocchi/bs-canada-overlay/app/overlay/match/_components/PlayerVideo"
import { graphql, useLazyLoadQuery } from "react-relay"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { TeamOfThreeQuery } from "@bocchi/bs-canada-overlay/__generated__/TeamOfThreeQuery.graphql"

interface Props {
  teamIndex: number
  streamUrl1: string
  streamUrl2: string
  streamUrl3: string
}

const TeamOfThree = (props: Props) => {
  const { teamIndex } = props
  const { data: currentMatchId } = trpc.currentMatchId.useQuery(undefined, {
    refetchInterval: 1000,
  })
  const teamOfThreeQuery = useLazyLoadQuery<TeamOfThreeQuery>(
    graphql`
      query TeamOfThreeQuery($currentMatchId: Uuid!, $skip: Boolean!) {
        matchById(id: $currentMatchId) @skip(if: $skip) {
          teams {
            name
          }
        }
      }
    `,
    { currentMatchId: currentMatchId, skip: !currentMatchId },
  )
  return (
    <div className="flex flex-col gap-2">
      <div className="flex max-w-fit rounded-md bg-maple-red px-5 py-2 shadow shadow-black">
        <h1 className="text-4xl font-semibold uppercase">
          {teamOfThreeQuery?.matchById?.teams?.[teamIndex]?.name}
        </h1>
      </div>
      <div className="flex flex-row items-center gap-10">
        <PlayerVideo
          playerName="Player1"
          playerPictureUrl="https://m.media-amazon.com/images/I/71Jo631kIDL._AC_UF1000,1000_QL80_.jpg"
          accuracy={100}
          combo={1000}
          streamUrl={props.streamUrl1}
          muted
        />
        <PlayerVideo
          playerName="Player2"
          playerPictureUrl="https://m.media-amazon.com/images/I/71Jo631kIDL._AC_UF1000,1000_QL80_.jpg"
          accuracy={100}
          combo={1000}
          streamUrl={props.streamUrl2}
          muted
        />
        <PlayerVideo
          playerName="Player3"
          playerPictureUrl="https://m.media-amazon.com/images/I/71Jo631kIDL._AC_UF1000,1000_QL80_.jpg"
          accuracy={100}
          combo={1000}
          streamUrl={props.streamUrl3}
          muted
        />
      </div>
    </div>
  )
}

export default TeamOfThree
