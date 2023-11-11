import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@bocchi/bs-canada-overlay/components/ui/card"
import SceneSelect from "@bocchi/bs-canada-overlay/app/_components/SceneOptions/SceneSelect"
import StreamSetup from "@bocchi/bs-canada-overlay/app/_components/SceneOptions/StreamSetup"

const StreamOptions = () => {
  return (
    <Card className="h-fit w-[600px]">
      <CardHeader>
        <CardTitle>Stream Options</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <SceneSelect />
        <StreamSetup />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}

export default StreamOptions
