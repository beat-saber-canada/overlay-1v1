import TeamScoreHeader from "@bocchi/bs-canada-overlay/components/TeamScoreHeader"

interface Props {
  hideScore?: boolean
}

const ScoreHeader = (props: Props) => {
  const { hideScore } = props
  return (
    <div className={`flex h-20 flex-row items-center justify-center gap-5`}>
      <TeamScoreHeader
        name="Team 1"
        score={0}
        accuracy={0}
        overallScore={3}
        totalRounds={5}
        pictureUrl="https://m.media-amazon.com/images/I/71Jo631kIDL._AC_UF1000,1000_QL80_.jpg"
        reverse
        hideScore={hideScore}
      />
      <img src="/Red_Icon.png" className="aspect-square h-12" />
      <TeamScoreHeader
        name="Team 2"
        score={10000}
        accuracy={99}
        overallScore={1}
        totalRounds={5}
        pictureUrl="https://m.media-amazon.com/images/I/71Jo631kIDL._AC_UF1000,1000_QL80_.jpg"
        hideScore={hideScore}
      />
    </div>
  )
}

export default ScoreHeader
