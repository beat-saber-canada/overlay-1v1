import { kvsLocalStorage } from "@kvs/node-localstorage"
import type { KvsLocalStorageSchema } from "@kvs/node-localstorage"
import { inferAsyncReturnType } from "@trpc/server"
import { JsonObject } from "@kvs/storage"

interface TeamState extends JsonObject {
  roundsWon: number
  nameOverride?: string
}

interface PlayerState extends JsonObject {
  roundsWon: number
  scoreSaberId: string
}

interface CurrentMapPoolState extends JsonObject {
  [key: string]: "picked" | "banned" | "tiebreaker"
}

interface OverriddenStreamUrls extends JsonObject {
  [key: string]: { type: "twitch" | "rtmp"; key: string }
}

interface State extends KvsLocalStorageSchema {
  scene: string | null
  matchId: string | null
  roundsToWin: number | null
  currentMapPoolIndex: number | null
  currentMapPoolBanner: string | null
  player0: PlayerState | null
  player1: PlayerState | null
  currentMapPoolState: CurrentMapPoolState | null
  overriddenStreamUrls: OverriddenStreamUrls | null
  unmutedPlayerId: string | null
  isReplay: boolean
}

const createContext = async () => ({
  state: await kvsLocalStorage<State>({
    name: "state",
    version: 1,
  }),
})

export type Context = inferAsyncReturnType<typeof createContext>
export default createContext
