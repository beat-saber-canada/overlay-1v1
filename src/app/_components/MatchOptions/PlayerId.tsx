"use client"

import { Input } from "@bocchi/bs-canada-overlay/components/ui/input"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"

interface Props {
  playerIndex: number
}

const PlayerId = (props: Props) => {
  const { playerIndex } = props
  const [player] = trpc.player.getPlayer.useSuspenseQuery(playerIndex)
  const { mutateAsync: setPlayerAsync } = trpc.player.setPlayer.useMutation()
  const utils = trpc.useUtils()
  const [currentMatchId] = trpc.currentMatchId.useSuspenseQuery()

  const onScoreSaberIdChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.value === player.scoreSaberId) return
    const updatedPlayer = await setPlayerAsync({
      index: playerIndex,
      scoreSaberId: e.target.value,
      roundsWon: player.roundsWon ?? 0,
    })
    utils.player.getPlayer.setData(playerIndex, updatedPlayer)
  }

  if (!!currentMatchId) return null

  return (
    <div className="flex w-full items-center justify-between">
      <label>Player {playerIndex + 1} ID</label>
      <Input
        className="w-1/2"
        value={player.scoreSaberId}
        onChange={onScoreSaberIdChange}
      />
    </div>
  )
}

export default PlayerId
