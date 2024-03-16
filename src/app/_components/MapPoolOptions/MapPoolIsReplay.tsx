import { Switch } from "@bocchi/bs-canada-overlay/components/ui/switch"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"

const MapPoolIsReplay = () => {
  const [isReplay] = trpc.getIsReplay.useSuspenseQuery()
  const { mutateAsync: setIsReplay } = trpc.setIsReplay.useMutation()
  const utils = trpc.useUtils()

  const onCheckedChange = async (checked: boolean) => {
    const val = await setIsReplay(checked)
    await utils.getIsReplay.setData(undefined, val)
  }

  return (
    <div className="flex items-center justify-between">
      <label>Replay</label>
      <Switch checked={isReplay} onCheckedChange={onCheckedChange} />
    </div>
  )
}

export default MapPoolIsReplay
