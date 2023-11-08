"use client"

import { createTRPCReact, httpBatchLink } from "@trpc/react-query"
import { AppRouter } from "@bocchi/bs-canada-overlay/server/router"
import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const trpc = createTRPCReact<AppRouter>({})

interface Props {
  children: React.ReactNode
}

const TRPCProvider = (props: Props) => {
  const { children } = props
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/trpc`,
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
