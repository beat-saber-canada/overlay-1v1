"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bocchi/bs-canada-overlay/components/ui/select"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { graphql, useLazyLoadQuery } from "react-relay"
import { MatchSelectQuery } from "@bocchi/bs-canada-overlay/__generated__/MatchSelectQuery.graphql"

const MatchSelect = () => {
  const utils = trpc.useUtils()
  const { data: selectedMatchId, isFetched: isFetchedMatchId } =
    trpc.currentMatchId.useQuery()
  const { mutate: updateMatchId } = trpc.updateMatchId.useMutation({
    onSuccess: (returnVal) => {
      utils.currentMatchId.setData(undefined, returnVal)
    },
  })
  const matches = useLazyLoadQuery<MatchSelectQuery>(
    graphql`
      query MatchSelectQuery {
        state {
          matches {
            guid
            teams {
              name
            }
          }
        }
      }
    `,
    {},
  )

  const onChange = (value: string) => {
    updateMatchId(value)
  }

  if (!isFetchedMatchId || !matches) return null

  return (
    <Select value={selectedMatchId ?? undefined} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Team" />
      </SelectTrigger>
      <SelectContent>
        {matches.state.matches.map((match: any) => (
          <SelectItem key={match.guid} value={match.guid}>
            {match.teams[0].name} vs {match.teams[1].name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default MatchSelect
