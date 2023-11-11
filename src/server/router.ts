import { z } from "zod"
import { procedure, router } from "@bocchi/bs-canada-overlay/server/trpc"
import BeatSaverMap from "@bocchi/bs-canada-overlay/data/BeatSaverMap"
import MapPools from "@bocchi/bs-canada-overlay/data/MapPools"

export const appRouter = router({
  switchScenes: procedure
    .input(z.enum(["match", "map-selection"]))
    .mutation(async (opts) => {
      await opts.ctx.state.set("scene", opts.input)
      return opts.input
    }),
  currentScene: procedure.query(async (opts) => {
    return (await opts.ctx.state.get("scene")) ?? "map-selection"
  }),
  setCurrentMatchId: procedure
    .input(z.string().uuid())
    .mutation(async (opts) => {
      await opts.ctx.state.set("matchId", opts.input)
      return opts.input
    }),
  currentMatchId: procedure.query((opts) => {
    return opts.ctx.state.get("matchId")
  }),
  roundsToWin: procedure.query(async (opts) => {
    return (await opts.ctx.state.get("roundsToWin")) ?? 1
  }),
  setRoundsToWin: procedure
    .input(z.number().min(1).max(5))
    .mutation(async (opts) => {
      await opts.ctx.state.set("roundsToWin", opts.input)
      // Decrease rounds won if rounds to win is less than rounds won
      const team0 = (await opts.ctx.state.get("team0")) ?? { roundsWon: 0 }
      const team1 = (await opts.ctx.state.get("team1")) ?? { roundsWon: 0 }

      if (team0.roundsWon > opts.input) {
        team0.roundsWon = opts.input
        await opts.ctx.state.set("team0", team0)
      }

      if (team1.roundsWon > opts.input) {
        team1.roundsWon = opts.input
        await opts.ctx.state.set("team1", team1)
      }

      return opts.input
    }),
  roundsWon: procedure.input(z.number().min(0).max(1)).query(async (opts) => {
    // Need to do terenary for typescript to infer the correct type
    return (
      (await opts.ctx.state.get(`team${opts.input === 0 ? 0 : 1}`))
        ?.roundsWon ?? 0
    )
  }),
  setRoundsWon: procedure
    .input(
      z.object({
        index: z.number().min(0).max(1),
        score: z.number().min(0).max(5),
      }),
    )
    .mutation(async (opts) => {
      const team = (await opts.ctx.state.get(
        `team${opts.input.index === 0 ? 0 : 1}`,
      )) ?? { roundsWon: 0 }
      team.roundsWon = opts.input.score
      await opts.ctx.state.set(`team${opts.input.index}`, team)
      return opts.input
    }),
  currentMapPool: procedure.query(async (opts) => {
    const currentMapPoolIndex =
      (await opts.ctx.state.get("currentMapPoolIndex")) ?? 0
    const mapPool = MapPools[currentMapPoolIndex]
    const mapKeys = mapPool.maps.map((map) => map.key)
    const mapDetailsResponse = await fetch(
      `https://api.beatsaver.com/maps/ids/${mapKeys.join("%2C")}`,
    )
    const mapDetails = (await mapDetailsResponse.json()) as {
      [key: string]: BeatSaverMap
    }
    const mapDetailsMerged = mapPool.maps.map((map) => ({
      difficulty: map.difficulty,
      mapDetails: mapDetails[map.key],
    }))
    return {
      ...mapPool,
      maps: mapDetailsMerged,
    }
  }),
  mapPoolNames: procedure.query(async (opts) => {
    return MapPools.map((pool) => pool.name)
  }),
  currentMapPoolIndex: procedure.query(async (opts) => {
    return (await opts.ctx.state.get("currentMapPoolIndex")) ?? 0
  }),
  setCurrentMapPoolIndex: procedure.input(z.number()).mutation(async (opts) => {
    await opts.ctx.state.set("currentMapPoolIndex", opts.input)
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
