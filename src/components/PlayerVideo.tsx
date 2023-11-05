interface Props {
  playerName: string
  playerPictureUrl: string
  accuracy: number
  combo: number
}

const PlayerVideo = (props: Props) => {
  const { playerName, playerPictureUrl, accuracy, combo } = props

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <img src={playerPictureUrl} className="h-16 w-16 rounded-full" />
        <span className="text-xl font-semibold text-black">{playerName}</span>
      </div>
      <img
        src="https://cdn.cloudflare.steamstatic.com/steam/apps/1099585/ss_2b106ccca2fa22508951e83ed93c5ca27557c132.jpg"
        className="aspect-video w-[450px] rounded-md"
      />
      <div className="flex flex-row items-center justify-between">
        <span className="text-xl text-black">{combo}x</span>
        <span className="text-xl text-black">{accuracy}%</span>
      </div>
    </div>
  )
}

export default PlayerVideo
