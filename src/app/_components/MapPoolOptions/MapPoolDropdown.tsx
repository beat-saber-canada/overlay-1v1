import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "@bocchi/bs-canada-overlay/server/router"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@bocchi/bs-canada-overlay/components/ui/dropdown-menu"
import { X } from "lucide-react"
import { trpc } from "@bocchi/bs-canada-overlay/utils/TRPCProvider"
import { cva } from "class-variance-authority"

interface Props {
  map: inferRouterOutputs<AppRouter>["currentMapPool"]["maps"][0]
}

const trigger = cva("rounded-md p-2 outline outline-2", {
  variants: {
    state: {
      default: "outline-black",
      picked: "outline-picked-green",
      banned: "outline-maple-red-dark",
      tiebreaker: "outline-tiebreaker-yellow",
    },
  },
  defaultVariants: {
    state: "default",
  },
})

const MapPoolDropdown = (props: Props) => {
  const { map } = props
  const utils = trpc.useUtils()
  const { data: mapPoolState, isFetched } = trpc.mapPoolStateForMap.useQuery(
    map.mapDetails.id,
  )
  const { mutate: setMapPoolState } = trpc.setMapPoolStateForMap.useMutation({
    onSuccess: (returnVal) => {
      utils.mapPoolStateForMap.setData(map.mapDetails.id, returnVal.state)
    },
  })

  const onSelect = (value: "picked" | "banned" | "tiebreaker" | null) => {
    setMapPoolState({ mapKey: map.mapDetails.id, state: value })
  }

  if (!isFetched) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={trigger({ state: mapPoolState ?? undefined })}
      >
        {map.mapDetails.metadata.songName}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="justify-between"
          onSelect={() => onSelect(null)}
        >
          <X /> Clear
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={mapPoolState === "picked"}
          onCheckedChange={() => onSelect("picked")}
          className="justify-end"
        >
          Pick
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={mapPoolState === "banned"}
          onCheckedChange={() => onSelect("banned")}
          className="justify-end"
        >
          Ban
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={mapPoolState === "tiebreaker"}
          onCheckedChange={() => onSelect("tiebreaker")}
          className="justify-end"
        >
          Tiebreaker
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MapPoolDropdown
