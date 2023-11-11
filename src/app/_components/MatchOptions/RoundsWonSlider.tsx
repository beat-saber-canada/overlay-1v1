"use client"

import { Slider } from "@bocchi/bs-canada-overlay/components/ui/slider"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { useEffect, useState } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import { RoundsWonSliderQuery } from "@bocchi/bs-canada-overlay/__generated__/RoundsWonSliderQuery.graphql"

interface Props {
  index: number
}

const RoundsWon = (props: Props) => {
  const { index } = props
  const utils = trpc.useUtils()
  const [localValue, setLocalValue] = useState([1])
  const { data: roundsToWin, isFetched: isFetchedRoundsToWin } =
    trpc.roundsToWin.useQuery()
  const { data: roundsWon, isFetched: isFetchedRoundsWon } =
    trpc.roundsWon.useQuery(index)
  const { mutate: setRoundsWon } = trpc.setRoundsWon.useMutation({
    onMutate: (value) => {
      const previousValue = utils.roundsWon.getData(index)
      utils.roundsWon.setData(index, value.score)
      return { previousValue }
    },
    onError: (err, value, context) => {
      utils.roundsWon.setData(index, context?.previousValue!)
    },
    onSuccess: (returnVal) => {
      utils.roundsWon.setData(index, returnVal.score)
    },
  })

  const { data: currentMatchId, isFetched: isFetchedCurrentMatchId } =
    trpc.currentMatchId.useQuery()
  const roundsWonSliderQuery = useLazyLoadQuery<RoundsWonSliderQuery>(
    graphql`
      query RoundsWonSliderQuery($currentMatchId: Uuid!, $skip: Boolean!) {
        matchById(id: $currentMatchId) @skip(if: $skip) {
          teams {
            name
          }
        }
      }
    `,
    { currentMatchId, skip: !currentMatchId },
  )

  useEffect(() => {
    if (roundsWon === undefined) return
    setLocalValue([roundsWon])
  }, [roundsWon])

  if (
    !isFetchedRoundsToWin ||
    !isFetchedRoundsWon ||
    !isFetchedCurrentMatchId ||
    !roundsWonSliderQuery
  )
    return null

  const onChange = (value: number[]) => {
    if (value[0] === roundsWon) return
    setRoundsWon({ index, score: value[0] })
  }

  return (
    <div className="flex w-full items-center justify-between">
      <label>
        {roundsWonSliderQuery?.matchById?.teams?.[index]?.name ??
          `Team ${index + 1}`}
        &apos;s Score
      </label>
      <div className="flex w-1/2 flex-row gap-3">
        <Slider
          value={localValue}
          onValueChange={setLocalValue}
          min={0}
          max={roundsToWin}
          step={1}
          onValueCommit={onChange}
        />
        <label className="text-gray-600">{localValue}</label>
      </div>
    </div>
  )
}

export default RoundsWon
