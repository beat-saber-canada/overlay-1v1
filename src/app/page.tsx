import SceneSelect from "@bocchi/bs-canada-overlay/app/_components/SceneSelect"

const DashboardPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-5 p-5">
      <h1 className="text-center text-5xl font-semibold">Stream Dashboard</h1>
      <div className="flex flex-wrap">
        <SceneSelect />
      </div>
    </div>
  )
}

export default DashboardPage
