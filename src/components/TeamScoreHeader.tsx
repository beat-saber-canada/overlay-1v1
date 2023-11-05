import OverallScore from "@bocchi/bs-canada-overlay/components/OverallScore"

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
        className={`flex flex-row items-center gap-2 ${
          reverse && "flex-row-reverse"
        } `}
      >
        <span className="text-xl font-bold">{name}</span>
        <img src={pictureUrl} className="aspect-square h-20 rounded-md" />
      </div>

      <OverallScore score={3} totalRounds={5} reverse={reverse} />
    </div>
  )
}

export default TeamScoreHeader
