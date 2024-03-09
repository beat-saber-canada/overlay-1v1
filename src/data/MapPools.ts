import Difficulty from "@bocchi/bs-canada-overlay/data/Difficulty"
import { env } from "process"
import fs from "fs"
import { parsePlaylistString } from "./parsePlaylist"

interface MapPools {
  name: string
  maps: {
    hash: string
    difficulty: Difficulty
  }[]
}

let MapPools: MapPools[] | undefined = undefined

export const getMapPoolsAsync = async () => {
  if (!MapPools) {
    const poolDirPath = env.NEXT_PUBLIC_POOL_PATH!
    const mapPoolPaths = await fs.promises.readdir(poolDirPath)
    const mapPools: MapPools[] = []
    for (const mapPool of mapPoolPaths) {
      const mapPoolString = await fs.promises.readFile(
        `${poolDirPath}/${mapPool}`,
        "utf-8",
      )
      mapPools.push({
        name: mapPool,
        maps: parsePlaylistString(mapPoolString),
      })
    }
    MapPools = mapPools
  }

  return MapPools
}
