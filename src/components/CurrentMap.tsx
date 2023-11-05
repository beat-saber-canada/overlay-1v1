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
    <div className="flex flex-row items-center gap-5 rounded-md bg-black px-5 py-3 shadow shadow-black">
      <img className="aspect-square h-16 rounded-md" src={pictureUrl} />
      <span className="text-2xl text-white">
        {name} - {artist} ({mapper})
      </span>
      <div className="flex rounded-md bg-purple-600 p-2 shadow shadow-gray-600">
        <span className="text-xl">{difficulty}</span>
      </div>
    </div>
  )
}

export default CurrentMap
