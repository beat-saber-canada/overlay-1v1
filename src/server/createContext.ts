import { kvsLocalStorage } from "@kvs/node-localstorage"
import type { KvsLocalStorageSchema } from "@kvs/node-localstorage"
import { inferAsyncReturnType } from "@trpc/server"
import { JsonObject } from "@kvs/storage"

interface TeamState extends JsonObject {
  roundsWon: number
  nameOverride?: string
}

interface State extends KvsLocalStorageSchema {
  scene: string | null
  matchId: string | null
  roundsToWin: number
  team0: TeamState | null
  team1: TeamState | null
}

const createContext = async () => ({
  state: await kvsLocalStorage<State>({
    name: "state",
    version: 1,
  }),
})

export type Context = inferAsyncReturnType<typeof createContext>
export default createContext
