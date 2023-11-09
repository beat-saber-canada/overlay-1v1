"use client"

import { RelayEnvironmentProvider, Variables } from "react-relay"
import { Environment, Network, RecordSource, Store } from "relay-runtime"
import { RequestParameters } from "relay-runtime/lib/util/RelayConcreteNode"

const fetchGraphQL = async (
  requestParameters: RequestParameters,
  variables: Variables,
) => {
  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: requestParameters.text,
      variables,
    }),
  })

  // Get the response as JSON
  return await response.json()
}

const environment = new Environment({
  network: Network.create(fetchGraphQL),
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
