import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@bocchi/bs-canada-overlay/components/ui/card"
import RoundsToWinSlider from "@bocchi/bs-canada-overlay/app/_components/MatchOptions/RoundsToWinSlider"
import RoundsWonSlider from "@bocchi/bs-canada-overlay/app/_components/MatchOptions/RoundsWonSlider"
import MatchSelect from "./MatchSelect"
import PlayerId from "./PlayerId"

const MatchOptions = () => {
  return (
    <Card className="h-fit w-[500px]">
      <CardHeader>
        <CardTitle>Match Options</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <MatchSelect />
        <PlayerId playerIndex={0} />
        <PlayerId playerIndex={1} />
        <RoundsWonSlider playerIndex={0} />
        <RoundsWonSlider playerIndex={1} />
      </CardContent>
      <CardFooter>
        <RoundsToWinSlider />
      </CardFooter>
    </Card>
  )
}

export default MatchOptions
