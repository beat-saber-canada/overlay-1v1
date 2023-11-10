import { z } from "zod"
import { procedure, router } from "@bocchi/bs-canada-overlay/server/trpc"
import BeatSaverMap from "@bocchi/bs-canada-overlay/data/BeatSaverMap"

export const appRouter = router({
  switchScenes: procedure
    .input(z.enum(["match", "map-selection"]))
    .mutation((opts) => {
      opts.ctx.state.set("scene", opts.input)
      return opts.input
    }),
  currentScene: procedure.query(async (opts) => {
    return (await opts.ctx.state.get("scene")) ?? "map-selection"
  }),
  updateMatchId: procedure.input(z.string().uuid()).mutation((opts) => {
    opts.ctx.state.set("matchId", opts.input)
    return opts.input
  }),
  currentMatchId: procedure.query((opts) => {
    return opts.ctx.state.get("matchId")
  }),
  scoreRequiredToWin: procedure.query(async (opts) => {
    return (await opts.ctx.state.get("scoreRequiredToWin")) ?? 1
  }),
  setScoreRequiredToWin: procedure
    .input(z.number().min(1).max(5))
    .mutation((opts) => {
      opts.ctx.state.set("scoreRequiredToWin", opts.input)
      return opts.input
    }),
  overallScore: procedure
    .input(z.number().min(0).max(1))
    .query(async (opts) => {
      // Need to do terenary for typescript to infer the correct type
      return (
        (await opts.ctx.state.get(`team${opts.input === 0 ? 0 : 1}`))
          ?.overallScore ?? 0
      )
    }),
  updateOverallScore: procedure
    .input(
      z.object({
        index: z.number().min(0).max(1),
        score: z.number().min(0).max(5),
      }),
    )
    .mutation(async (opts) => {
      const team = (await opts.ctx.state.get(
        `team${opts.input.index === 0 ? 0 : 1}`,
      )) ?? { overallScore: 0 }
      team.overallScore = opts.input.score
      opts.ctx.state.set(`team${opts.input.index}`, team)
      return opts.input
    }),
  scoreSaberProfilePicture: procedure.input(z.string()).query(async (opts) => {
    const res = await fetch(
      `https://scoresaber.com/api/player/${opts.input}/basic`,
    )
    const data = (await res.json()) as { profilePicture?: string }
    return data.profilePicture ?? null
  }),
  beatSaverMapDetails: procedure.input(z.string()).query(async (opts) => {
    const res = await fetch(`https://api.beatsaver.com/maps/hash/${opts.input}`)
    const data = (await res.json()) as BeatSaverMap
    return data
  }),
})

// export type definition of API
export type AppRouter = typeof appRouter
