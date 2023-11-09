"use client"

import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

const SceneStateListener = () => {
  const { data: currentScene } = trpc.currentScene.useQuery(undefined, {
    refetchInterval: 1000,
  })
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!!currentScene && pathname !== `/overlay/${currentScene}`)
      router.replace(`/overlay/${currentScene}`)
  }, [currentScene, pathname, router])

  return null
}

export default SceneStateListener
