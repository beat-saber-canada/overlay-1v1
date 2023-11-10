interface BeatSaverMap {
  id: string
  name: string
  description: string
  uploader: {
    id: number
    name: string
    hash: string
    avatar: string
    type: string
    admin: boolean
    curator: boolean
    playlistUrl: string
  }
  metadata: {
    bpm: number
    duration: number
    songName: string
    songSubName: string
    songAuthorName: string
    levelAuthorName: string
  }
  stats: {
    plays: number
    downloads: number
    upvotes: number
    downvotes: number
    score: number
    reviews: number
  }
  uploaded: string
  automapper: boolean
  ranked: boolean
  qualified: boolean
  versions: {
    hash: string
    key: string
    state: string
    createdAt: string
    sageScore: number
    diffs: {
      njs: number
      offset: number
      notes: number
      bombs: number
      obstacles: number
      nps: number
      length: number
      characteristic: string
      difficulty: string
      events: number
      chroma: boolean
      me: boolean
      ne: boolean
      cinema: boolean
      seconds: number
      paritySummary: {
        errors: number
        warns: number
        resets: number
      }
      stars: number
      maxScore: number
    }[]
    downloadURL: string
    coverURL: string
    previewURL: string
  }[]
  createdAt: string
  updatedAt: string
  lastPublishedAt: string
  tags: string[]
}

export default BeatSaverMap
