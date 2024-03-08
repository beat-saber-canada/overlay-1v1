"use client"

import ReactPlayer from "react-player"
import { useEffect, useMemo, useState } from "react"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { graphql, useLazyLoadQuery } from "react-relay"
import useCurrentMatchIdQuery from "@bocchi/bs-canada-overlay/app/overlay/_hooks/useCurrentMatchIdQuery"
import { PlayerVideoQuery } from "@bocchi/bs-canada-overlay/__generated__/PlayerVideoQuery.graphql"
import sanitizeString from "@bocchi/bs-canada-overlay/utils/sanitizeString"
import { useSpring } from "@react-spring/web"

interface Props {
  playerGuid: string | null
}

const PlayerVideo = (props: Props) => {
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
    {
      networkCacheConfig: { poll: 500 },
    },
  )
  const currentPlayer = playerVideoQuery?.matchById?.players?.find(
    (player) => player.guid === props.playerGuid,
  )
  const { data: playerPictureUrl } = trpc.playerInfo.useQuery(
    currentPlayer?.userId!,
    {
      enabled: !!currentPlayer?.userId,
    },
  )
  const { data: streamSettings } = trpc.streamSettingsForPlayer.useQuery(
    currentPlayer?.userId!,
    {
      enabled: !!currentPlayer?.userId,
      refetchInterval: 1000,
    },
  )
  const streamUrl = useMemo(() => {
    if (!streamSettings?.key)
      return `${process.env.NEXT_PUBLIC_STREAM_BASE_URL}/bsc/${sanitizeString(
        currentPlayer?.name ?? "",
      )}/index.m3u8`
    if (streamSettings?.type === "rtmp")
      return `${process.env.NEXT_PUBLIC_STREAM_BASE_URL}/bsc/${streamSettings.key}/index.m3u8`
    return streamSettings?.key
  }, [currentPlayer?.name, streamSettings?.key, streamSettings?.type])
  const score = playerVideoQuery?.matchById?.scores?.find(
    (score) => score.ownerGuid === props.playerGuid,
  )
  const accuracy = ((score?.score ?? 0) / (score?.maxScore ?? 1)) * 100
  const [tweenedScore, setTweenedScore] = useState({
    combo: 0,
    accuracy: 0,
  })
  useSpring({
    combo: score?.combo ?? 0,
    accuracy,

    onChange: (result) => {
      setTweenedScore({
        combo: result.value.combo,
        accuracy: result.value.accuracy,
      })
    },

    config: {
      duration: 500,
    },
  })

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
        <img
          src={playerPictureUrl ?? "/oculus.png"}
          className="h-16 w-16 rounded-sm"
        />
        <span className="text-2xl font-semibold">{currentPlayer?.name}</span>
      </div>
      <div className="aspect-video h-[250px]">
        <ReactPlayer
          url={streamUrl}
          muted={!(streamSettings?.enableAudio ?? false)}
          volume={streamSettings?.enableAudio ?? false ? 1 : 0}
          playing={isPlaying}
          width="100%"
          height="100%"
        />
      </div>
      <div className="flex flex-row items-center justify-between px-5 py-2 text-white">
        <span className="text-xl">{tweenedScore.combo.toFixed(0)}x</span>
        <span className="text-xl">{tweenedScore.accuracy.toFixed(2)}%</span>
      </div>
    </div>
  )
}

export default PlayerVideo
