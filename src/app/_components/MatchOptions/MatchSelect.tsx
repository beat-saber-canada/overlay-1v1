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
  const [currentMatchId] = trpc.currentMatchId.useSuspenseQuery()
  const { mutate: setCurrentMatchId } = trpc.setCurrentMatchId.useMutation({
    onSuccess: (returnVal) => {
      utils.currentMatchId.setData(undefined, returnVal)
    },
  })
  const matchSelectQuery = useLazyLoadQuery<MatchSelectQuery>(
    graphql`
      query MatchSelectQuery {
        state {
          matches {
            guid
            players {
              name
            }
          }
        }
      }
    `,
    {},
  )

  const onChange = (value: string) => {
    if (value === "none") setCurrentMatchId(null)
    setCurrentMatchId(value)
  }

  return (
    <div className="flex items-center justify-between">
      <label>Current Match</label>
      <Select value={currentMatchId ?? "none"} onValueChange={onChange}>
        <SelectTrigger className="w-1/2">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          {matchSelectQuery?.state.matches.map((match) => (
            <SelectItem key={match.guid} value={match.guid}>
              {match.players[0]?.name} vs {match.players[1]?.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default MatchSelect
