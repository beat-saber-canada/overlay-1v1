"use client"

import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

const SceneStateListener = () => {
  const { data: currentScene, isFetched } = trpc.currentScene.useQuery()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (isFetched && pathname !== `/overlay/${currentScene}`)
      router.replace(`/overlay/${currentScene}`)
  }, [currentScene, isFetched, pathname, router])

  return null
}

export default SceneStateListener
