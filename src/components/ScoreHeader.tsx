import TeamScoreHeader from "@bocchi/bs-canada-overlay/components/TeamScoreHeader"

const ScoreHeader = () => {
  return (
    <div className="flex flex-row items-center gap-5">
      <TeamScoreHeader
        name="Team 1"
        score={10000}
        accuracy={99}
        pictureUrl="https://cdn.cloudflare.steamstatic.com/steam/apps/1099585/ss_2b106ccca2fa22508951e83ed93c5ca27557c132.jpg"
        reverse
      />
      <img src="/Red_Icon.png" className="aspect-square h-5" />
      <TeamScoreHeader
        name="Team 2"
        score={10000}
        accuracy={99}
        pictureUrl="https://cdn.cloudflare.steamstatic.com/steam/apps/1099585/ss_2b106ccca2fa22508951e83ed93c5ca27557c132.jpg"
      />
    </div>
  )
}

export default ScoreHeader
