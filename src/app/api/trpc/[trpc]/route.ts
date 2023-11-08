import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { appRouter } from "@bocchi/bs-canada-overlay/server/router"
import createContext from "@bocchi/bs-canada-overlay/server/createContext"

const handler = (req: Request) =>
  fetchRequestHandler({
    router: appRouter,
    req,
    endpoint: "/api/trpc",
    createContext,
  })

export { handler as GET, handler as POST }
