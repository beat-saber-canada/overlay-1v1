"use client"

import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bocchi/bs-canada-overlay/components/ui/select"

const MapPoolBannerSelect = () => {
  const utils = trpc.useUtils()
  const { data: currentMapPoolBanner, isFetched } =
    trpc.currentMapPoolBanner.useQuery()
  const { mutate: setCurrentMapPoolBanner } =
    trpc.setCurrentMapPoolBanner.useMutation({
      onSuccess: async (returnVal) => {
        utils.currentMapPoolBanner.setData(undefined, returnVal)
      },
    })

  const onChange = (value: string) => {
    setCurrentMapPoolBanner(value)
  }

  if (!isFetched) return null

  return (
    <div className="flex items-center justify-between">
      <label>Current Banner Image</label>
      <Select value={`${currentMapPoolBanner ?? 0}`} onValueChange={onChange}>
        <SelectTrigger className="w-1/2">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Winners_Round1">Winners_Round1</SelectItem>
          <SelectItem value="Winners_Round2">Winners_Round2</SelectItem>
          <SelectItem value="Winners_Round3">Winners_Round3</SelectItem>
          <SelectItem value="Winners_SemiFinals">Winners_SemiFinals</SelectItem>
          <SelectItem value="Winners_BracketRESET">
            Winners_BracketRESET
          </SelectItem>
          <SelectItem value="Losers_Round1">Losers_Round1</SelectItem>
          <SelectItem value="Losers_Round2">Losers_Round2</SelectItem>
          <SelectItem value="Losers_Round3">Losers_Round3</SelectItem>
          <SelectItem value="Losers_Round4">Losers_Round4</SelectItem>
          <SelectItem value="Losers_SemiFinals">Losers_SemiFinals</SelectItem>
          <SelectItem value="Losers_FINALS">Losers_FINALS</SelectItem>
          <SelectItem value="Grand_Finals">Grand_Finals</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default MapPoolBannerSelect
