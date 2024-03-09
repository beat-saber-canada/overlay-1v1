"use client"

import { atom, useAtomValue } from "jotai"
import { memo, useEffect, useRef, useState } from "react"

export const isBackgroundPlayingAtom = atom(true)

const BackgroundVideo = () => {
  const isBackgroundPlaying = useAtomValue(isBackgroundPlayingAtom)
  const [isClient, setIsClient] = useState(false)
  const videoPlayerRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    if (isBackgroundPlaying) {
      videoPlayerRef.current?.play()
    } else {
      videoPlayerRef.current?.pause()
    }
  }, [isBackgroundPlaying, isClient])

  if (!isClient) return null

  return (
    <video
      src="/Background.mov"
      ref={videoPlayerRef}
      autoPlay
      loop
      muted
      width="100%"
      height="100%"
      className="absolute z-10 min-h-full
            w-auto min-w-full max-w-none"
    />
  )
}

export default memo(BackgroundVideo)
