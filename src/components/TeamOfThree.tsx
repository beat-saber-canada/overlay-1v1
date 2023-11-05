import PlayerVideo from "@bocchi/bs-canada-overlay/components/PlayerVideo"

interface Props {
  teamName: string
}

const TeamOfThree = (props: Props) => {
  const { teamName } = props
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-maple-red flex max-w-fit rounded-md px-5 py-2 shadow shadow-black">
        <h1 className="text-4xl font-semibold uppercase">{teamName}</h1>
      </div>
      <div className="flex flex-row items-center gap-10">
        <PlayerVideo
          playerName="Player1"
          playerPictureUrl="https://m.media-amazon.com/images/I/71Jo631kIDL._AC_UF1000,1000_QL80_.jpg"
          accuracy={100}
          combo={1000}
        />
        <PlayerVideo
          playerName="Player2"
          playerPictureUrl="https://m.media-amazon.com/images/I/71Jo631kIDL._AC_UF1000,1000_QL80_.jpg"
          accuracy={100}
          combo={1000}
        />
        <PlayerVideo
          playerName="Player3"
          playerPictureUrl="https://m.media-amazon.com/images/I/71Jo631kIDL._AC_UF1000,1000_QL80_.jpg"
          accuracy={100}
          combo={1000}
        />
      </div>
    </div>
  )
}

export default TeamOfThree
