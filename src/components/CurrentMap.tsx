interface Props {
  name: string
  artist: string
  mapper: string
  difficulty: string
  pictureUrl: string
}

const CurrentMap = (props: Props) => {
  const { name, artist, mapper, difficulty, pictureUrl } = props

  return (
    <div className="flex h-[388px] w-72 flex-col items-center gap-5 overflow-hidden rounded-md bg-black p-5 text-center shadow shadow-black">
      <h1 className="text-3xl font-semibold text-white">Now Playing</h1>
      <img className="aspect-square w-40 rounded-md" src={pictureUrl} />
      <span className="scrolling-text line-clamp-1 text-2xl text-white">
        {name} - {artist} ({mapper})
      </span>
      <div className="flex rounded-md bg-purple-600 p-2 shadow shadow-gray-600">
        <span className="text-xl">{difficulty}</span>
      </div>
    </div>
  )
}

export default CurrentMap
