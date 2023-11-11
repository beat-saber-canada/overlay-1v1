"use client"

import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { Toggle } from "@bocchi/bs-canada-overlay/components/ui/toggle"

const SceneSelect = () => {
  const utils = trpc.useUtils()
  const { data: selectedScene, isFetched } = trpc.currentScene.useQuery()
  const { mutate: updateScene } = trpc.switchScenes.useMutation({
    onSuccess: (returnVal) => {
      utils.currentScene.setData(undefined, returnVal)
    },
  })

  const onChange = (value: "match" | "map-selection") => {
    if (value === selectedScene) return
    updateScene(value)
  }

  if (!isFetched) return null

  return (
    <div className="flex items-center justify-between">
      <label>Current Scene</label>
      <div className="flex gap-5">
        <Toggle
          variant="option"
          pressed={selectedScene === "map-selection"}
          onPressedChange={() => onChange("map-selection")}
        >
          Map Selection
        </Toggle>
        <Toggle
          variant="option"
          pressed={selectedScene === "match"}
          onPressedChange={() => onChange("match")}
        >
          Match
        </Toggle>
      </div>
    </div>
  )
}

export default SceneSelect
