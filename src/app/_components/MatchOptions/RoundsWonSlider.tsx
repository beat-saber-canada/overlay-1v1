"use client"

import { Slider } from "@bocchi/bs-canada-overlay/components/ui/slider"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { useEffect, useState } from "react"
import useCurrentPlayerInfoQuery from "../../_hooks/useCurrentPlayerInfoQuery"

interface Props {
  playerIndex: number
}

const RoundsWon = (props: Props) => {
  const { playerIndex: index } = props
  const utils = trpc.useUtils()
  const [localValue, setLocalValue] = useState([1])
  const [roundsToWin] = trpc.roundsToWin.useSuspenseQuery()
  const [player] = trpc.player.getPlayer.useSuspenseQuery(index)
  const { data: playerInfo, playerId: scoreSaberId } =
    useCurrentPlayerInfoQuery(index)
  const { roundsWon } = player
  const { mutateAsync: setPlayerAsync } = trpc.player.setPlayer.useMutation()

  useEffect(() => {
    if (roundsWon === undefined) return
    setLocalValue([roundsWon])
  }, [roundsWon])

  const onSliderChange = async (value: number[]) => {
    if (value[0] === roundsWon) return
    const player = await setPlayerAsync({
      index,
      scoreSaberId: scoreSaberId ?? "",
      roundsWon: value[0],
    })
    utils.player.getPlayer.setData(index, player)
  }

  return (
    <div className="flex w-full items-center justify-between">
      <label>{playerInfo?.name ?? `Player ${index}`}&apos;s Rounds Won</label>
      <div className="flex w-1/2 flex-row gap-3">
        <Slider
          value={localValue}
          onValueChange={setLocalValue}
          min={0}
          max={roundsToWin}
          step={1}
          onValueCommit={onSliderChange}
        />
        <label className="text-gray-600">{localValue}</label>
      </div>
    </div>
  )
}

export default RoundsWon
