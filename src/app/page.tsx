import SceneSelect from "@bocchi/bs-canada-overlay/app/_components/SceneSelect"
import MatchOptions from "@bocchi/bs-canada-overlay/app/_components/MatchOptions/MatchOptions"
import MapPoolOptions from "@bocchi/bs-canada-overlay/app/_components/MapPoolOptions/MapPoolOptions"

const DashboardPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-10 p-5">
      <h1 className="text-center text-6xl font-semibold">Stream Dashboard</h1>
      <div className="flex flex-wrap gap-5">
        <SceneSelect />
        <MatchOptions />
        <MapPoolOptions />
      </div>
    </div>
  )
}

export default DashboardPage
