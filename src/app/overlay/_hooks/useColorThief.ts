import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { useMemo } from "react"

const isDarkColor = (red: number, green: number, blue: number) =>
  red * 0.299 + green * 0.587 + blue * 0.114 < 186

const rgbString = (rgb?: number[]) =>
  `rgb(${rgb?.[0]}, ${rgb?.[1]}, ${rgb?.[2]})`

const useColorThief = (src?: string) => {
  const { data: colorThief } = trpc.colorThief.useQuery(src!, {
    enabled: !!src,
  })

  const backgroundString = useMemo(() => {
    if (!colorThief) return "rgb(0, 0, 0)"
    return `linear-gradient(to right, ${rgbString(
      colorThief?.[0],
    )}, ${rgbString(colorThief?.[1])})`
  }, [colorThief])

  return backgroundString
}

export default useColorThief
