import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"

const useCurrentMatchIdQuery = () => {
  return trpc.currentMatchId.useQuery(undefined, {
    refetchInterval: 1000,
  })
}

export default useCurrentMatchIdQuery
