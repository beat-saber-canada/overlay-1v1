"use client"

import RoundsWonDisplay from "@bocchi/bs-canada-overlay/app/overlay/_components/RoundsWonDisplay"
import { useSpring, animated } from "@react-spring/web"
import {
  DependencyList,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import TeamAvatars from "@bocchi/bs-canada-overlay/data/teams"
import { graphql, useLazyLoadQuery } from "react-relay"
import {
  TeamScoreHeaderQuery,
  TeamScoreHeaderQuery$data,
} from "@bocchi/bs-canada-overlay/__generated__/TeamScoreHeaderQuery.graphql"
import useCurrentMatchIdQuery from "@bocchi/bs-canada-overlay/app/overlay/_hooks/useCurrentMatchIdQuery"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"

interface Props {
  teamIndex: number
  reverse?: boolean
  hideScore?: boolean
}

const useObserveMaxWidth = <T extends HTMLElement>(deps?: DependencyList) => {
  const [width, setWidth] = useState(0)
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    setWidth(ref.current?.scrollWidth ?? 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return {
    width,
    ref,
  }
}

const useCalculateScore = (
  teamScoreHeaderQuery: TeamScoreHeaderQuery$data,
  teamGuid?: string,
) => {
  if (!teamScoreHeaderQuery || !teamGuid) {
    return {
      score: 0,
      accuracy: 0,
    }
  }

  const playerGuidsFromTeam = teamScoreHeaderQuery?.matchById?.players
    .filter((player) => player.team?.guid === teamGuid)
    .map((player) => player.guid) as string[]
  const scores = teamScoreHeaderQuery?.matchById?.scores.filter((score) =>
    playerGuidsFromTeam.includes(score.ownerGuid),
  )
  const score =
    scores?.reduce((currentScore, score) => currentScore + score.score, 0) ?? 0
  const accuracy =
    (score / ((scores?.[0]?.maxScore ?? 1) * (scores?.length ?? 1))) * 100

  return {
    score,
    accuracy,
  }
}

const TeamScoreHeader = (props: Props) => {
  const { teamIndex, reverse, hideScore } = props
  const { data: currentMatchId } = useCurrentMatchIdQuery()
  const teamScoreHeaderQuery = useLazyLoadQuery<TeamScoreHeaderQuery>(
    graphql`
      query TeamScoreHeaderQuery($currentMatchId: Uuid!, $skip: Boolean!) {
        matchById(id: $currentMatchId) @skip(if: $skip) {
          teams {
            name
            guid
          }
          scores {
            ownerGuid
            score
            maxScore
          }
          players {
            guid
            team {
              guid
            }
          }
        }
      }
    `,
    { currentMatchId: currentMatchId, skip: !currentMatchId },
    {
      networkCacheConfig: { poll: 500 },
    },
  )
  const team = teamScoreHeaderQuery?.matchById?.teams?.[teamIndex]
  const pictureUrl = useMemo(
    () => TeamAvatars.get(team?.name ?? ""),
    [team?.name],
  )
  const { score, accuracy } = useCalculateScore(
    teamScoreHeaderQuery,
    team?.guid,
  )

  const [tweenedScore, setTweenedScore] = useState({
    score: 0,
    accuracy: 0,
  })
  useSpring({
    score,
    accuracy,

    onChange: (result) => {
      setTweenedScore({
        score: result.value.score,
        accuracy: result.value.accuracy,
      })
    },

    config: {
      duration: 500,
    },
  })

  const { width, ref: scoreRef } = useObserveMaxWidth<HTMLDivElement>([
    score,
    accuracy,
    hideScore,
  ])
  const [mounted, setMounted] = useState(false)
  const scoreSpring = useSpring({
    width: hideScore ? "0px" : `${width}px`,
    immediate: !mounted,
  })

  const { data: roundsWon } = trpc.roundsWon.useQuery(teamIndex, {
    refetchInterval: 1000,
  })
  const { data: roundsToWin } = trpc.roundsToWin.useQuery(undefined, {
    refetchInterval: 1000,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className={`flex flex-row items-center gap-5 ${
        reverse ? "flex-row-reverse" : ""
      }`}
    >
      <animated.div
        className="flex flex-col overflow-hidden"
        style={
          mounted
            ? { ...scoreSpring }
            : { width: hideScore ? "0px" : `${width}px` }
        }
        ref={scoreRef}
      >
        <span className="text-xl font-semibold">
          {tweenedScore.accuracy.toFixed(2)}%
        </span>
        <span className="text-sm">{tweenedScore.score.toFixed(0)}</span>
      </animated.div>

      <div
        className={`flex flex-row items-center gap-2 ${
          reverse && "flex-row-reverse"
        } `}
      >
        <span className="text-xl font-bold">
          {team?.name ?? `Team ${teamIndex + 1}`}
        </span>
        <img
          src={pictureUrl ?? "/oculus.png"}
          className="aspect-square h-20 rounded-md"
        />
      </div>

      <RoundsWonDisplay
        roundsWon={roundsWon ?? 0}
        roundsToWin={roundsToWin ?? 1}
        reverse={reverse}
      />
    </div>
  )
}

export default TeamScoreHeader
