import MatchOptions from "@bocchi/bs-canada-overlay/app/_components/MatchOptions/MatchOptions"
import MapPoolOptions from "@bocchi/bs-canada-overlay/app/_components/MapPoolOptions/MapPoolOptions"
import StreamOptions from "@bocchi/bs-canada-overlay/app/_components/SceneOptions/StreamOptions"

const DashboardPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-10 p-5 pt-10">
      <h1 className="text-center text-6xl font-semibold">Stream Dashboard</h1>
      <div className="flex flex-wrap gap-8">
        <StreamOptions />
        <MatchOptions />
        <MapPoolOptions />
      </div>
    </div>
  )
}

export default DashboardPage
