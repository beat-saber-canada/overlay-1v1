import type { Metadata } from "next"
import "./globals.css"
import { GeistSans } from "geist/font"
import TRPCProvider from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Hi Tek :)",
}

interface Props {
  children: ReactNode
}

const RootLayout = (props: Props) => {
  const { children } = props

  return (
    <html lang="en">
      <body className={`${GeistSans.className} max-w-screen max-h-screen`}>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  )
}

export default RootLayout
