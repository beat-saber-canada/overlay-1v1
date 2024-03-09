import type { ReactNode } from "react"
import BackgroundVideo from "./_components/BackgroundVideo"

interface Props {
  children: ReactNode
}

const RootLayout = (props: Props) => {
  const { children } = props

  return (
    <div className="text-white">
      {children}
      <div className="fixed left-0 right-0 top-0 -z-10 h-full w-full">
        <BackgroundVideo />
      </div>
    </div>
  )
}

export default RootLayout
