"use client"

import ReactPlayer from "react-player"
import { useEffect, useState } from "react"

interface Props {
  playerName: string
  playerPictureUrl: string
  accuracy: number
  combo: number
  streamUrl: string
  muted?: boolean
}

const PlayerVideo = (props: Props) => {
  const { playerName, playerPictureUrl, accuracy, combo, streamUrl, muted } =
    props
  const [isClient, setIsClient] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

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
        <img src={playerPictureUrl} className="h-16 w-16" />
        <span className="text-2xl font-semibold">{playerName}</span>
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
      <div className="flex flex-row items-center justify-between px-5 py-2 text-white">
        <span className="text-xl">{combo}x</span>
        <span className="text-xl">{accuracy}%</span>
      </div>
    </div>
  )
}

export default PlayerVideo
