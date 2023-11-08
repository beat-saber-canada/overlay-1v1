import type { ReactNode } from "react"
import SceneStateListener from "@bocchi/bs-canada-overlay/app/overlay/_listeners/SceneStateListener"

interface Props {
  children: ReactNode
}

const RootLayout = (props: Props) => {
  const { children } = props

  return (
    <>
      <SceneStateListener />
      <div className="p-5">{children}</div>
      <div className="fixed left-0 right-0 top-0 -z-10 h-full w-full">
        <video
          src="/Background.mp4"
          autoPlay
          loop
          muted
          className="absolute z-10 min-h-full
            w-auto min-w-full max-w-none"
        />
      </div>
    </>
  )
}

export default RootLayout
