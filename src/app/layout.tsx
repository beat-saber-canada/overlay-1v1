import type { Metadata } from "next"
import "./globals.css"
import { GeistSans } from "geist/font"
import TRPCProvider from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import type { ReactNode } from "react"
import RelayProvider from "@bocchi/bs-canada-overlay/utils/RelayProvider"

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
        <RelayProvider>
          <TRPCProvider>{children}</TRPCProvider>
        </RelayProvider>
      </body>
    </html>
  )
}

export default RootLayout
