"use client"

import { useSpring, animated } from "@react-spring/web"
import { useEffect, useRef, useState } from "react"
import DifficultyBadge from "@bocchi/bs-canada-overlay/app/overlay/_components/DifficultyBadge"
import useCurrentMatchIdQuery from "@bocchi/bs-canada-overlay/app/overlay/_hooks/useCurrentMatchIdQuery"
import { graphql, useLazyLoadQuery } from "react-relay"
import { CurrentMapQuery } from "@bocchi/bs-canada-overlay/__generated__/CurrentMapQuery.graphql"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"

const useObserveElementWidth = <T extends HTMLElement>() => {
  const [width, setWidth] = useState(0)
  const ref = useRef<T>(null)

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width)
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      ref.current && observer.unobserve(ref.current)
    }
  }, [])

  return {
    width,
    ref,
  }
}

const useTitleAnimation = () => {
  const { width, ref: spanRef } = useObserveElementWidth<HTMLSpanElement>()
  const pauseAnimation = width < 240
  const spring = useSpring({
    from: { x: width / 2 - 100 },
    to: { x: 100 - width / 2 },
    loop: { reverse: true, delay: 1000 },
    reset: true,
    config: { duration: width * 15 },
    pause: pauseAnimation,
  })

  return {
    pauseAnimation,
    spring,
    spanRef,
  }
}

const CurrentMap = () => {
  const { data: currentMatchId } = useCurrentMatchIdQuery()
  const currentMapQuery = useLazyLoadQuery<CurrentMapQuery>(
    graphql`
      query CurrentMapQuery($currentMatchId: Uuid!, $skip: Boolean!) {
        matchById(id: $currentMatchId) @skip(if: $skip) {
          currentMap {
            name
            difficulty
            hash
          }
        }
      }
    `,
    { currentMatchId: currentMatchId, skip: !currentMatchId },
    {
      networkCacheConfig: { poll: 500 },
    },
  )
  const { data: mapDetails } = trpc.beatSaverMapDetails.useQuery(
    currentMapQuery.matchById?.currentMap?.hash!,
    {
      enabled: !!currentMapQuery.matchById?.currentMap?.hash,
    },
  )
  const difficulty = currentMapQuery.matchById?.currentMap?.difficulty
  const { pauseAnimation, spring, spanRef } = useTitleAnimation()

  return (
    <div className="flex h-[388px] w-[260px] flex-col items-center gap-5 overflow-hidden rounded-md bg-black p-5 text-center text-white shadow shadow-black">
      {true ? (
        <>
          <h1 className="text-3xl font-semibold">Now Playing</h1>
          <img
            className="aspect-square w-40 rounded-md"
            src={mapDetails?.versions?.[0].coverURL}
          />
          <animated.span
            className="line-clamp-1 overflow-hidden whitespace-nowrap text-2xl"
            style={pauseAnimation ? {} : { ...spring }}
            ref={spanRef}
          >
            {currentMapQuery.matchById?.currentMap?.name} -{" "}
            {mapDetails?.metadata.songAuthorName!} (
            {mapDetails?.metadata.levelAuthorName!})
          </animated.span>
          <div className="flex flex-row items-center gap-2">
            {!!difficulty && <DifficultyBadge difficulty={difficulty} />}
            <div className="flex flex-row gap-2 rounded-md bg-white p-2">
              <img src="/Beatsaver.svg" className="w-5" />
              <span className="text-lg text-black">{mapDetails?.id}</span>
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-3xl font-semibold">No Map Selected</h1>
      )}
    </div>
  )
}

export default CurrentMap
