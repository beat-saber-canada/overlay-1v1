import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"

const MapPoolBanner = () => {
  const { data } = trpc.currentMapPoolBanner.useQuery(undefined, {
    refetchInterval: 1000,
  })
  return (
    <img
      src={`/Round%20Cards/${data}.png`}
      className="absolute bottom-5 right-5 aspect-auto w-[700px] rounded-md"
    />
  )
}

export default MapPoolBanner
