import type { Metadata } from "next"
import "./globals.css"
import { GeistSans } from "geist/font"

export const metadata: Metadata = {
  title: "Hi Tek :)",
}

interface Props {
  children: React.ReactNode
}

const RootLayout = (props: Props) => {
  const { children } = props

  return (
    <html lang="en">
      <body className={`${GeistSans.className} max-w-screen max-h-screen`}>
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
      </body>
    </html>
  )
}

export default RootLayout
