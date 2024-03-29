import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bocchi/bs-canada-overlay/components/ui/dialog"
import { Input } from "@bocchi/bs-canada-overlay/components/ui/input"
import { Switch } from "@bocchi/bs-canada-overlay/components/ui/switch"
import sanitizeString from "@bocchi/bs-canada-overlay/utils/sanitizeString"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bocchi/bs-canada-overlay/components/ui/select"
import { Globe, Twitch, Volume2 } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@bocchi/bs-canada-overlay/components/ui/form"
import { Button } from "@bocchi/bs-canada-overlay/components/ui/button"
import streamSchema from "@bocchi/bs-canada-overlay/data/streamSchema"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { useState } from "react"
import useCurrentPlayerInfoQuery from "../../_hooks/useCurrentPlayerInfoQuery"

interface Props {
  index: number
}

const StreamDialog = (props: Props) => {
  const { index } = props
  const { data: playerInfo, playerId } = useCurrentPlayerInfoQuery(index)
  const utils = trpc.useUtils()
  const [streamSettings] =
    trpc.streamSettingsForPlayer.useSuspenseQuery(playerId)
  const { mutateAsync, isLoading } =
    trpc.setStreamSettingsForPlayer.useMutation({
      onSuccess: async () => {
        await utils.streamSettingsForPlayer.invalidate()
      },
    })
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<typeof streamSchema>({
    resolver: zodResolver(streamSchema),
  })

  const onOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setIsOpen(true)
      form.reset()
      return
    }
    setIsOpen(false)
  }

  const onSubmit = async (settings: z.infer<typeof streamSchema>) => {
    await mutateAsync({ playerId: playerId!, settings })
    setIsOpen(false)
  }

  if (!streamSettings || !playerInfo) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger className="flex aspect-video w-[160px] items-center justify-center gap-2 overflow-hidden rounded-md p-2 outline outline-2 outline-black">
        {streamSettings?.enableAudio && <Volume2 />}
        <span className="overflow-hidden text-ellipsis">
          {playerInfo?.name}
        </span>
      </DialogTrigger>
      <DialogContent className="p-10">
        <DialogHeader>
          <DialogTitle>{playerInfo.name}&apos;s Settings</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={
              // @ts-ignore
              form.handleSubmit(onSubmit)
            }
            className="space-y-8"
          >
            <div className="grid w-full items-center gap-0.5">
              <label className="text-xs text-gray-600">Stream Key</label>
              <div className="flex flex-row gap-1">
                <FormField
                  control={form.control}
                  // @ts-ignore
                  name="type"
                  defaultValue={streamSettings!.type ?? "rtmp"}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"rtmp"}>
                              <Globe />
                            </SelectItem>
                            <SelectItem value={"twitch"}>
                              <Twitch />
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  // @ts-ignore
                  name="key"
                  defaultValue={streamSettings!.key ?? ""}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder={
                            // @ts-ignore
                            form.getValues("type") === "rtmp"
                              ? sanitizeString(playerInfo.name!)
                              : "required"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              // @ts-ignore
              name="enableAudio"
              defaultValue={streamSettings!.enableAudio ?? false}
              render={({ field }) => (
                <FormItem className="flex w-full flex-row items-center justify-between">
                  <FormLabel>Enable Audio</FormLabel>
                  <FormControl>
                    <Switch
                      {...field}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              Set
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default StreamDialog
