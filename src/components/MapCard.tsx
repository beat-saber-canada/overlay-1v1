"use client"

import { FastAverageColor } from "fast-average-color"
import { useEffect, useRef, useState } from "react"

interface Props {
  name: string
  artist: string
  mapper: string
  difficulty: string
  pictureUrl: string
  bsrKey: string
  bpm: number
  state: "none" | "picked" | "banned" | "tiebreaker"
}

const MapCard = (props: Props) => {
  const { name, artist, mapper, difficulty, pictureUrl, bsrKey, bpm, state } =
    props
  const [bgColor, setBgColor] = useState("#000000")
  const [textColor, setTextColor] = useState("#FFFFFF")
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imageRef.current) {
      const fac = new FastAverageColor()
      fac.getColorAsync(imageRef.current).then((color) => {
        setBgColor(color.hex)
        setTextColor(color.isDark ? "#FFFFFF" : "#000000")
      })
    }
  }, [imageRef, pictureUrl])

  return (
    <div
      className={`flex flex-row items-center justify-between rounded-md p-5`}
      style={{
        background: bgColor,
        border:
          state === "picked"
            ? "5px solid #2ADB00"
            : state === "banned"
            ? "5px solid #FF182E"
            : state === "tiebreaker"
            ? "5px solid #FBB03B"
            : "none",
      }}
    >
      <div className="flex flex-row items-center space-x-5">
        <img
          className="aspect-square h-20 rounded-md"
          src={pictureUrl}
          ref={imageRef}
        />
        <div className="flex flex-col">
          <span className="text-2xl" style={{ color: textColor }}>
            {name} - {artist}
          </span>
          <span className="text-sm" style={{ color: textColor }}>
            Mapped by {mapper}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-1">
        <div className="flex rounded-md bg-purple-600 p-2 shadow shadow-gray-600">
          <span className="text-xl">{difficulty}</span>
        </div>
        <span className="text-md font-semibold" style={{ color: textColor }}>
          {bsrKey}
        </span>
        <span className="text-sm" style={{ color: textColor }}>
          {bpm} BPM
        </span>
      </div>
    </div>
  )
}

export default MapCard
