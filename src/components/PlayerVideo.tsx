interface Props {
  playerName: string
  playerPictureUrl: string
  accuracy: number
  combo: number
}

const PlayerVideo = (props: Props) => {
  const { playerName, playerPictureUrl, accuracy, combo } = props

  return (
    <div className="flex flex-col rounded-md bg-black">
      <div className="flex flex-row items-center gap-5 px-2 py-2 text-white">
        <img src={playerPictureUrl} className="h-16 w-16" />
        <span className="text-2xl font-semibold">{playerName}</span>
      </div>
      <img
        src="https://cdn.cloudflare.steamstatic.com/steam/apps/1099585/ss_2b106ccca2fa22508951e83ed93c5ca27557c132.jpg"
        className="aspect-video w-[470px]"
      />
      <div className="flex flex-row items-center justify-between px-5 py-2 text-white">
        <span className="text-xl">{combo}x</span>
        <span className="text-xl">{accuracy}%</span>
      </div>
    </div>
  )
}

export default PlayerVideo
