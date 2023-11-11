"use client"

import { Slider } from "@bocchi/bs-canada-overlay/components/ui/slider"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { useState } from "react"

const RoundsToWinSlider = () => {
  const utils = trpc.useUtils()
  const [localValue, setLocalValue] = useState([1])
  const { data: roundsToWin, isFetched } = trpc.roundsToWin.useQuery()
  const { mutate: setRoundsToWin } = trpc.setRoundsToWin.useMutation({
    onMutate: (value) => {
      const previousValue = utils.roundsToWin.getData()
      utils.roundsToWin.setData(undefined, value)
      return { previousValue }
    },
    onError: (err, value, context) => {
      utils.roundsToWin.setData(undefined, context?.previousValue)
      setLocalValue([context?.previousValue!])
    },
    onSuccess: async (returnVal) => {
      utils.roundsToWin.setData(undefined, returnVal)
      await utils.roundsWon.invalidate()
      setLocalValue([returnVal])
    },
  })

  if (!isFetched) return null

  const onChange = (value: number[]) => {
    if (value[0] === roundsToWin) return
    setRoundsToWin(value[0])
  }

  return (
    <div className="flex w-full items-center justify-between">
      <label>Rounds to Win</label>
      <div className="flex w-1/2 flex-row gap-3">
        <Slider
          value={localValue}
          onValueChange={setLocalValue}
          min={1}
          max={5}
          step={1}
          onValueCommit={onChange}
        />
        <label className="text-gray-600">{localValue}</label>
      </div>
    </div>
  )
}

export default RoundsToWinSlider
