import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "@bocchi/bs-canada-overlay/server/router"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@bocchi/bs-canada-overlay/components/ui/dropdown-menu"
import { X } from "lucide-react"

interface Props {
  map: inferRouterOutputs<AppRouter>["currentMapPool"]["maps"][0]
}

const MapPoolDropdown = (props: Props) => {
  const { map } = props

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-md p-2 outline outline-2 outline-black">
        {map.mapDetails.metadata.songName}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="justify-between">
          <X /> Clear
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-end">Pick</DropdownMenuItem>
        <DropdownMenuItem className="justify-end">Ban</DropdownMenuItem>
        <DropdownMenuItem className="justify-end">Tiebreaker</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MapPoolDropdown
