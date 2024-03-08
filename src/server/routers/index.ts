import { z } from "zod"
import { procedure, router } from "@bocchi/bs-canada-overlay/server/trpc"
import BeatSaverMap from "@bocchi/bs-canada-overlay/data/BeatSaverMap"
import MapPools from "@bocchi/bs-canada-overlay/data/MapPools"
import streamSchema from "@bocchi/bs-canada-overlay/data/streamSchema"
import { playerRouter } from "./player"

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
    .input(z.string().uuid().nullable())
    .mutation(async (opts) => {
      await opts.ctx.state.set("matchId", opts.input)
      return opts.input
    }),
  currentMatchId: procedure.query(async (opts) => {
    return (await opts.ctx.state.get("matchId")) ?? null
  }),
  roundsToWin: procedure.query(async (opts) => {
    return (await opts.ctx.state.get("roundsToWin")) ?? 1
  }),
  setRoundsToWin: procedure
    .input(z.number().min(1).max(5))
    .mutation(async (opts) => {
      await opts.ctx.state.set("roundsToWin", opts.input)
      // Decrease rounds won if rounds to win is less than rounds won
      const player0 = (await opts.ctx.state.get("player0")) ?? {
        roundsWon: 0,
        scoreSaberId: "",
      }
      const player1 = (await opts.ctx.state.get("player1")) ?? {
        roundsWon: 0,
        scoreSaberId: "",
      }

      if (player0.roundsWon > opts.input) {
        player0.roundsWon = opts.input
        await opts.ctx.state.set("player0", player0)
      }

      if (player1.roundsWon > opts.input) {
        player1.roundsWon = opts.input
        await opts.ctx.state.set("player1", player1)
      }

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
    await opts.ctx.state.set("currentMapPoolState", null)
    return opts.input
  }),
  mapPoolStateForMap: procedure.input(z.string()).query(async (opts) => {
    return (
      (await opts.ctx.state.get("currentMapPoolState"))?.[opts.input] ?? null
    )
  }),
  setMapPoolStateForMap: procedure
    .input(
      z.object({
        mapKey: z.string(),
        state: z.enum(["picked", "banned", "tiebreaker"]).nullable(),
      }),
    )
    .mutation(async (opts) => {
      const currentMapPoolState =
        (await opts.ctx.state.get("currentMapPoolState")) ?? {}

      if (opts.input.state === null)
        delete currentMapPoolState[opts.input.mapKey]
      else currentMapPoolState[opts.input.mapKey] = opts.input.state

      await opts.ctx.state.set("currentMapPoolState", currentMapPoolState)
      return opts.input
    }),
  streamSettingsForPlayer: procedure.input(z.ostring()).query(async (opts) => {
    if (!opts.input) return null

    const overriddenStreamUrl = (
      await opts.ctx.state.get("overriddenStreamUrls")
    )?.[opts.input]
    const enableAudio =
      (await opts.ctx.state.get("unmutedPlayerId")) === opts.input
    return {
      ...overriddenStreamUrl,
      enableAudio,
    }
  }),
  setStreamSettingsForPlayer: procedure
    .input(
      z.object({
        playerId: z.string(),
        settings: streamSchema,
      }),
    )
    .mutation(async (opts) => {
      const overriddenStreamUrls =
        (await opts.ctx.state.get("overriddenStreamUrls")) ?? {}
      if (!opts.input.settings.key)
        delete overriddenStreamUrls[opts.input.playerId]
      else
        overriddenStreamUrls[opts.input.playerId] = {
          type: opts.input.settings.type,
          key: opts.input.settings.key,
        }

      await opts.ctx.state.set("overriddenStreamUrls", overriddenStreamUrls)

      if (opts.input.settings.enableAudio)
        await opts.ctx.state.set("unmutedPlayerId", opts.input.playerId)
      else if (
        (await opts.ctx.state.get("unmutedPlayerId")) === opts.input.playerId
      )
        await opts.ctx.state.set("unmutedPlayerId", null)
    }),
  currentMapPoolBanner: procedure.query(async (opts) => {
    return (
      (await opts.ctx.state.get("currentMapPoolBanner")) ?? "Winners_Round1"
    )
  }),
  setCurrentMapPoolBanner: procedure
    .input(z.string())
    .mutation(async (opts) => {
      await opts.ctx.state.set("currentMapPoolBanner", opts.input)
      return opts.input
    }),
  playerInfo: procedure.input(z.ostring().nullable()).query(async (opts) => {
    if (!opts.input) return null

    const res = await fetch(
      `https://scoresaber.com/api/player/${opts.input}/basic`,
    )
    if (!res.ok) return null

    const data = (await res.json()) as {
      profilePicture?: string
      name?: string
    }
    return {
      name: data.name,
      profilePicture: data.profilePicture,
    }
  }),
  beatSaverMapDetails: procedure.input(z.string()).query(async (opts) => {
    const res = await fetch(`https://api.beatsaver.com/maps/hash/${opts.input}`)
    const data = (await res.json()) as BeatSaverMap
    return data
  }),
  player: playerRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
