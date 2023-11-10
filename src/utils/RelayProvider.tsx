"use client"

import { RelayEnvironmentProvider, Variables } from "react-relay"
import { Environment, Network, RecordSource, Store } from "relay-runtime"
import {
  batchMiddleware,
  RelayNetworkLayer,
  urlMiddleware,
} from "react-relay-network-modern"

const network = new RelayNetworkLayer([
  urlMiddleware({
    url: process.env.NEXT_PUBLIC_GRAPHQL_URL!,
  }),
  batchMiddleware({
    batchUrl: process.env.NEXT_PUBLIC_GRAPHQL_URL!,
    batchTimeout: 10,
    maxBatchSize: 10,
  }),
])

const environment = new Environment({
  network,
  store: new Store(new RecordSource()),
})

interface Props {
  children: React.ReactNode
}

const RelayProvider = (props: Props) => {
  const { children } = props
  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  )
}

export default RelayProvider
