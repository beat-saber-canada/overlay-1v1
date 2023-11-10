import { kvsLocalStorage } from "@kvs/node-localstorage"
import type { KvsLocalStorageSchema } from "@kvs/node-localstorage"
import { inferAsyncReturnType } from "@trpc/server"

interface State extends KvsLocalStorageSchema {
  scene: string | null
  matchId: string | null
  scoreRequiredToWin: number | null
  team0: {
    overallScore: number
    nameOverride?: string
  } | null
  team1: {
    overallScore: number
    nameOverride?: string
  } | null
}

const createContext = async () => ({
  state: await kvsLocalStorage<State>({
    name: "state",
    version: 1,
  }),
})

export type Context = inferAsyncReturnType<typeof createContext>
export default createContext
