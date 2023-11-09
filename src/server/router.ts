import { z } from "zod"
import { procedure, router } from "@bocchi/bs-canada-overlay/server/trpc"

export const appRouter = router({
  switchScenes: procedure
    .input(z.enum(["match", "map-selection"]))
    .mutation((opts) => {
      opts.ctx.state.set("scene", opts.input)
      return opts.input
    }),
  currentScene: procedure.query((opts) => {
    return opts.ctx.state.get("scene")
  }),
  switchMatchId: procedure.input(z.string().uuid()).mutation((opts) => {
    opts.ctx.state.set("matchId", opts.input)
    return opts.input
  }),
  currentMatchId: procedure.query((opts) => {
    return opts.ctx.state.get("matchId")
  }),
})

// export type definition of API
export type AppRouter = typeof appRouter
