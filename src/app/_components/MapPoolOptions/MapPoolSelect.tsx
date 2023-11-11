"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bocchi/bs-canada-overlay/components/ui/select"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"

const MapPoolSelect = () => {
  const utils = trpc.useUtils()
  const { data: currentMapPoolIndex, isFetched: isFetchedMapPoolIndex } =
    trpc.currentMapPoolIndex.useQuery()
  const { data: mapPoolNames, isFetched: isFetchedMapPoolNames } =
    trpc.mapPoolNames.useQuery()
  const { mutate: setCurrentMapPoolIndex } =
    trpc.setCurrentMapPoolIndex.useMutation({
      onSuccess: async (returnVal) => {
        utils.currentMapPoolIndex.setData(undefined, returnVal)
        await utils.currentMapPool.invalidate()
      },
    })

  const onChange = (value: string) => {
    setCurrentMapPoolIndex(parseInt(value))
  }

  if (!isFetchedMapPoolIndex || !isFetchedMapPoolNames) return null

  return (
    <div className="flex items-center justify-between">
      <label>Current Map Pool</label>
      <Select value={`${currentMapPoolIndex ?? 0}`} onValueChange={onChange}>
        <SelectTrigger className="w-1/2">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {mapPoolNames?.map((poolName, index) => (
            <SelectItem key={index} value={`${index}`}>
              {poolName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default MapPoolSelect
