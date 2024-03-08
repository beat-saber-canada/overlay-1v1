"use client"

import StreamDialog from "@bocchi/bs-canada-overlay/app/_components/SceneOptions/StreamDialog"

const StreamSetup = () => {
  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-xs font-light text-gray-600">Stream Setup</label>
      <div className="flex flex-row justify-between">
        <StreamDialog index={0} />
        <StreamDialog index={1} />
      </div>
    </div>
  )
}

export default StreamSetup
