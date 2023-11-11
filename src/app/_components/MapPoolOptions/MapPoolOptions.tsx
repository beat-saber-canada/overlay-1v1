import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@bocchi/bs-canada-overlay/components/ui/card"
import MapPoolSelect from "@bocchi/bs-canada-overlay/app/_components/MapPoolOptions/MapPoolSelect"
import MapPoolDropdowns from "@bocchi/bs-canada-overlay/app/_components/MapPoolOptions/MapPoolDropdowns"
import MapPoolBannerSelect from "@bocchi/bs-canada-overlay/app/_components/MapPoolOptions/MapPoolBannerSelect"

const MapPoolOptions = () => {
  return (
    <Card className="h-fit w-[500px]">
      <CardHeader>
        <CardTitle>Map Pool Options</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <MapPoolSelect />
        <MapPoolBannerSelect />
        <MapPoolDropdowns />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}

export default MapPoolOptions
