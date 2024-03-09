import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { useMemo } from "react"

const isDarkColor = (red: number, green: number, blue: number) =>
  red * 0.299 + green * 0.587 + blue * 0.114 < 186

const rgbString = (rgb?: number[]) =>
  `rgb(${rgb?.[0]}, ${rgb?.[1]}, ${rgb?.[2]})`

const useColorThief = (src?: string) => {
  const { data: colorThief } = trpc.colorThief.useQuery(src, {
    enabled: !!src,
  })
  const isFirstDark = useMemo(() => {
    if (!colorThief) return true
    const firstColor = colorThief[0]
    return isDarkColor(firstColor[0], firstColor[1], firstColor[2])
  }, [colorThief])
  const isSecondDark = useMemo(() => {
    if (!colorThief) return true
    const secondColor = colorThief[1]
    return isDarkColor(secondColor[0], secondColor[1], secondColor[2])
  }, [colorThief])
  const backgroundString = useMemo(() => {
    if (!colorThief) return "rgb(0, 0, 0)"
    return `linear-gradient(to right, ${rgbString(
      colorThief?.[0],
    )}, ${rgbString(colorThief?.[1])})`
  }, [colorThief])

  return {
    backgroundString,
    isFirstDark,
    isSecondDark,
  }
}

export default useColorThief
