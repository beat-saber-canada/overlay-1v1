"use client"

import RoundsWonDisplay from "@bocchi/bs-canada-overlay/app/overlay/_components/RoundsWonDisplay"
import { useSpring, animated } from "@react-spring/web"
import {
  DependencyList,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import useCurrentMatchIdQuery from "@bocchi/bs-canada-overlay/app/overlay/_hooks/useCurrentMatchIdQuery"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import {
  PlayerScoreHeaderQuery,
  PlayerScoreHeaderQuery$data,
} from "@bocchi/bs-canada-overlay/__generated__/PlayerScoreHeaderQuery.graphql"

interface Props {
  playerIndex: number
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
  playerScoreHeaderQuery: PlayerScoreHeaderQuery$data,
  playerGuid?: string,
) => {
  if (!playerScoreHeaderQuery || !playerGuid) {
    return {
      combo: 0,
      accuracy: 0,
    }
  }

  const score = playerScoreHeaderQuery?.matchById?.scores.filter(
    (score) => score.ownerGuid === playerGuid,
  )?.[0]
  const combo = score?.combo ?? 0
  const accuracy = (score?.score ?? 0) / (score?.maxScore ?? 1)

  return {
    combo,
    accuracy,
  }
}

const PlayerScoreHeader = (props: Props) => {
  const { playerIndex, reverse, hideScore } = props
  const [player] = trpc.player.getPlayer.useSuspenseQuery(playerIndex)
  const [playerInfo] = trpc.playerInfo.useSuspenseQuery(player.scoreSaberId!)
  const [roundsToWin] = trpc.roundsToWin.useSuspenseQuery(undefined, {
    refetchInterval: 1000,
  })
  const { data: currentMatchId } = useCurrentMatchIdQuery()
  const playerScoreHeaderQuery = useLazyLoadQuery<PlayerScoreHeaderQuery>(
    graphql`
      query PlayerScoreHeaderQuery($currentMatchId: Uuid!, $skip: Boolean!) {
        matchById(id: $currentMatchId) @skip(if: $skip) {
          scores {
            ownerGuid
            score
            maxScore
            combo
          }
          players {
            guid
          }
        }
      }
    `,
    { currentMatchId: currentMatchId, skip: !currentMatchId },
    {
      networkCacheConfig: { poll: 500 },
    },
  )
  const playerGuid =
    playerScoreHeaderQuery?.matchById?.players?.[playerIndex].guid
  const { combo, accuracy } = useCalculateScore(
    playerScoreHeaderQuery,
    playerGuid,
  )

  const [tweenedScore, setTweenedScore] = useState({
    combo: 0,
    accuracy: 0,
  })
  useSpring({
    combo,
    accuracy,

    onChange: (result) => {
      setTweenedScore({
        combo: result.value.combo,
        accuracy: result.value.accuracy,
      })
    },

    config: {
      duration: 500,
    },
  })

  const { width, ref: scoreRef } = useObserveMaxWidth<HTMLDivElement>([
    combo,
    accuracy,
    hideScore,
  ])
  const [mounted, setMounted] = useState(false)
  const scoreSpring = useSpring({
    width: hideScore ? "0px" : `${width}px`,
    immediate: !mounted,
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
        <span className="text-sm">{tweenedScore.combo.toFixed(0)}x</span>
      </animated.div>

      <div
        className={`flex flex-row items-center gap-2 ${
          reverse && "flex-row-reverse"
        } `}
      >
        <span className="text-xl font-bold">
          {playerInfo?.name ?? `Player ${playerIndex + 1}`}
        </span>
        <img
          src={playerInfo?.profilePicture ?? "/oculus.png"}
          className="aspect-square h-20 rounded-md"
        />
      </div>

      <RoundsWonDisplay
        roundsWon={player.roundsWon ?? 0}
        roundsToWin={roundsToWin ?? 1}
        reverse={reverse}
      />
    </div>
  )
}

export default PlayerScoreHeader
