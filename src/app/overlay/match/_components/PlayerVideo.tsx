/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"

import ReactPlayer from "react-player"
import { useEffect, useMemo, useState } from "react"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import sanitizeString from "@bocchi/bs-canada-overlay/utils/sanitizeString"
import useCurrentPlayerInfoQuery from "../../../_hooks/useCurrentPlayerInfoQuery"

interface Props {
  playerIndex: number
}

const PlayerVideo = (props: Props) => {
  const { playerIndex } = props
  const [isClient, setIsClient] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const { data: currentPlayerInfo, playerId } =
    useCurrentPlayerInfoQuery(playerIndex)
  const { data: streamSettings } = trpc.streamSettingsForPlayer.useQuery(
    playerId,
    {
      enabled: !!playerId,
      refetchInterval: 1000,
    },
  )
  const streamUrl = useMemo(() => {
    if (!streamSettings?.key)
      return `${process.env.NEXT_PUBLIC_STREAM_BASE_URL}/bsc/${sanitizeString(
        currentPlayerInfo?.name ?? "",
      )}/index.m3u8`
    if (streamSettings?.type === "rtmp")
      return `${process.env.NEXT_PUBLIC_STREAM_BASE_URL}/bsc/${streamSettings.key}/index.m3u8`
    return streamSettings?.key
  }, [currentPlayerInfo?.name, streamSettings?.key, streamSettings?.type])

  useEffect(() => {
    setIsClient(true)
    setTimeout(() => {
      setIsPlaying(true)
    }, 5000)
  }, [])

  if (!isClient) return null

  return (
    <div className="w-1/2 overflow-hidden">
      <div className="aspect-video h-[800px] -translate-x-[200px]">
        <ReactPlayer
          url={streamUrl}
          muted={!(streamSettings?.enableAudio ?? false)}
          volume={streamSettings?.enableAudio ?? false ? 1 : 0}
          playing={isPlaying}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  )
}

export default PlayerVideo
