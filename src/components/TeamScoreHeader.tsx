interface Props {
  name: string
  score: number
  accuracy: number
  pictureUrl: string
  reverse?: boolean
}

const TeamScoreHeader = (props: Props) => {
  const { name, score, accuracy, pictureUrl, reverse } = props

  return (
    <div
      className={`flex flex-row ${
        reverse && "flex-row-reverse"
      } items-center gap-5`}
    >
      <div className="flex flex-col">
        <span className="text-xl font-semibold">{accuracy}%</span>
        <span className="text-sm">{score}</span>
      </div>

      <div
        className={`flex flex-row items-end gap-2 ${
          reverse && "flex-row-reverse"
        } `}
      >
        <span className="text-lg font-bold">{name}</span>
        <img src={pictureUrl} className="aspect-square h-12 rounded-md" />
      </div>
    </div>
  )
}

export default TeamScoreHeader
