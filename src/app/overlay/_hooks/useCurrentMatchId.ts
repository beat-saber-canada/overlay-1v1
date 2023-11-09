import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"

// TODO add subscription for invalidation or poll
const useCurrentMatchId = () => {
  const query = trpc.currentMatchId.useQuery()
  return query
}

export default useCurrentMatchId
