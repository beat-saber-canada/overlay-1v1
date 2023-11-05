import TeamScoreHeader from "@bocchi/bs-canada-overlay/components/TeamScoreHeader"

const ScoreHeader = () => {
  return (
    <div className="flex flex-row items-center gap-5">
      <TeamScoreHeader
        name="Team 1"
        score={10000}
        accuracy={99}
        pictureUrl="https://m.media-amazon.com/images/I/71Jo631kIDL._AC_UF1000,1000_QL80_.jpg"
        reverse
      />
      <img src="/Red_Icon.png" className="aspect-square h-12" />
      <TeamScoreHeader
        name="Team 2"
        score={10000}
        accuracy={99}
        pictureUrl="https://m.media-amazon.com/images/I/71Jo631kIDL._AC_UF1000,1000_QL80_.jpg"
      />
    </div>
  )
}

export default ScoreHeader
