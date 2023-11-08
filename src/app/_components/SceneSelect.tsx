"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bocchi/bs-canada-overlay/components/ui/select"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"

const SceneSelect = () => {
  const utils = trpc.useUtils()
  const { data: selectedScene, isFetched } = trpc.currentScene.useQuery()
  const { mutate: updateScene } = trpc.switchScenes.useMutation({
    onSuccess: (returnVal) => {
      utils.currentScene.setData(undefined, returnVal)
    },
  })

  const onChange = (value: "match" | "map-selection") => {
    updateScene(value)
  }

  if (!isFetched) return null

  return (
    <Select value={selectedScene} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="match">Match</SelectItem>
        <SelectItem value="map-selection">Map Selection</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SceneSelect
