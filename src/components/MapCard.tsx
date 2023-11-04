interface Props {
  name: string
  artist: string
  mapper: string
  difficulty: string
  pictureUrl: string
}

const MapCard = (props: Props) => {
  const { name, artist, mapper, difficulty, pictureUrl } = props

  return (
    <div className="flex flex-row items-center gap-5">
      <img className="aspect-square h-12 rounded-md" src={pictureUrl} />
      <span className="text-2xl">
        {name} - {artist} ({mapper}) {difficulty}
      </span>
    </div>
  )
}

export default MapCard
