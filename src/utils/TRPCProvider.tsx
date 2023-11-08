"use client"

import { createTRPCReact, httpBatchLink } from "@trpc/react-query"
import { AppRouter } from "@bocchi/bs-canada-overlay/server/router"
import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"

export const trpc = createTRPCReact<AppRouter>({})

interface Props {
  children: ReactNode
}

const TRPCProvider = (props: Props) => {
  const { children } = props
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/trpc`,
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}

export default TRPCProvider
