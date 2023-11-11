import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { animated, SpringValues } from "@react-spring/web"

interface Props {
  style?: SpringValues<{}>
}

const MapPoolBanner = (props: Props) => {
  const { data } = trpc.currentMapPoolBanner.useQuery(undefined, {
    refetchInterval: 1000,
  })
  return (
    <animated.img
      src={`/Round%20Cards/${data}.png`}
      className="absolute bottom-5 right-5 aspect-auto w-[700px] rounded-md"
      style={props.style}
    />
  )
}

export default MapPoolBanner
