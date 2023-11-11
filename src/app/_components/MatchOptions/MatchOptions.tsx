import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@bocchi/bs-canada-overlay/components/ui/card"
import RoundsToWinSlider from "@bocchi/bs-canada-overlay/app/_components/MatchOptions/RoundsToWinSlider"
import MatchSelect from "@bocchi/bs-canada-overlay/app/_components/MatchOptions/MatchSelect"
import RoundsWonSlider from "@bocchi/bs-canada-overlay/app/_components/MatchOptions/RoundsWonSlider"

const MatchOptions = () => {
  return (
    <Card className="h-fit w-[500px]">
      <CardHeader>
        <CardTitle>Match Options</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <MatchSelect />
        <RoundsWonSlider index={0} />
        <RoundsWonSlider index={1} />
      </CardContent>
      <CardFooter>
        <RoundsToWinSlider />
      </CardFooter>
    </Card>
  )
}

export default MatchOptions
