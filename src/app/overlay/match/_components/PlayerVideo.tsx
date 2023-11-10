"use client"

import ReactPlayer from "react-player"
import { useEffect, useState } from "react"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { graphql, useLazyLoadQuery } from "react-relay"
import useCurrentMatchIdQuery from "@bocchi/bs-canada-overlay/app/overlay/_hooks/useCurrentMatchIdQuery"
import { PlayerVideoQuery } from "@bocchi/bs-canada-overlay/__generated__/PlayerVideoQuery.graphql"

interface Props {
  playerGuid: string | null
  streamUrl: string
  muted?: boolean
}

const PlayerVideo = (props: Props) => {
  const { streamUrl, muted } = props
  const [isClient, setIsClient] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const { data: currentMatchId } = useCurrentMatchIdQuery()
  const playerVideoQuery = useLazyLoadQuery<PlayerVideoQuery>(
    graphql`
      query PlayerVideoQuery($currentMatchId: Uuid!, $skip: Boolean!) {
        matchById(id: $currentMatchId) @skip(if: $skip) {
          players {
            guid
            userId
            name
          }
          scores {
            ownerGuid
            combo
            score
            maxScore
          }
        }
      }
    `,
    { currentMatchId: currentMatchId, skip: !currentMatchId },
  )
  const currentPlayer = playerVideoQuery?.matchById?.players?.find(
    (player) => player.guid === props.playerGuid,
  )
  const { data: playerPictureUrl } = trpc.scoreSaberProfilePicture.useQuery(
    currentPlayer?.userId!,
    {
      enabled: !!currentPlayer?.userId,
    },
  )
  const score = playerVideoQuery?.matchById?.scores?.find(
    (score) => score.ownerGuid === props.playerGuid,
  )
  const accuracy = Math.round(
    ((score?.score ?? 0) / (score?.maxScore ?? 1)) * 100,
  )

  useEffect(() => {
    setIsClient(true)
    setTimeout(() => {
      setIsPlaying(true)
    }, 5000)
  }, [])

  if (!isClient) return null

  return (
    <div className="flex flex-col rounded-md bg-black">
      <div className="flex flex-row items-center gap-5 px-2 py-2 text-white">
        <img src={playerPictureUrl ?? undefined} className="h-16 w-16" />
        <span className="text-2xl font-semibold">{currentPlayer?.name}</span>
      </div>
      <div className="aspect-video h-[250px]">
        <ReactPlayer
          url={streamUrl}
          muted={muted}
          playing={isPlaying}
          width="100%"
          height="100%"
        />
      </div>
      {score && (
        <div className="flex flex-row items-center justify-between px-5 py-2 text-white">
          <span className="text-xl">{score?.combo}x</span>
          <span className="text-xl">{accuracy}%</span>
        </div>
      )}
    </div>
  )
}

export default PlayerVideo
