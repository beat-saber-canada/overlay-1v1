import { z } from "zod"
import { procedure, router } from "../trpc"

export const playerRouter = router({
  setPlayer: procedure
    .input(
      z.object({
        index: z.number().min(0).max(1),
        scoreSaberId: z.string(),
        roundsWon: z.number().min(0).max(5),
      }),
    )
    .mutation(async (opts) => {
      await opts.ctx.state.set(`player${opts.input.index}`, {
        scoreSaberId: opts.input.scoreSaberId,
        roundsWon: opts.input.roundsWon,
      })
      return {
        scoreSaberId: opts.input.scoreSaberId,
        roundsWon: opts.input.roundsWon,
      }
    }),
  getPlayer: procedure.input(z.number().min(0).max(1)).query(async (opts) => {
    const player = await opts.ctx.state.get(`player${opts.input === 0 ? 0 : 1}`)
    return {
      scoreSaberId: player?.scoreSaberId,
      roundsWon: player?.roundsWon,
    }
  }),
})
