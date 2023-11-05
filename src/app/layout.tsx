import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

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
      <body className={`${inter.className} max-w-screen max-h-screen`}>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
