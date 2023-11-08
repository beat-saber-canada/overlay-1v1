import PlayerVideo from "@bocchi/bs-canada-overlay/app/overlay/match/_components/PlayerVideo"

interface Props {
  teamName: string
  streamUrl1: string
  streamUrl2: string
  streamUrl3: string
}

const TeamOfThree = (props: Props) => {
  const { teamName } = props
  return (
    <div className="flex flex-col gap-2">
      <div className="flex max-w-fit rounded-md bg-maple-red px-5 py-2 shadow shadow-black">
        <h1 className="text-4xl font-semibold uppercase">{teamName}</h1>
      </div>
      <div className="flex flex-row items-center gap-10">
        <PlayerVideo
          playerName="Player1"
          playerPictureUrl="https://m.media-amazon.com/images/I/71Jo631kIDL._AC_UF1000,1000_QL80_.jpg"
          accuracy={100}
          combo={1000}
          streamUrl={props.streamUrl1}
          muted
        />
        <PlayerVideo
          playerName="Player2"
          playerPictureUrl="https://m.media-amazon.com/images/I/71Jo631kIDL._AC_UF1000,1000_QL80_.jpg"
          accuracy={100}
          combo={1000}
          streamUrl={props.streamUrl2}
          muted
        />
        <PlayerVideo
          playerName="Player3"
          playerPictureUrl="https://m.media-amazon.com/images/I/71Jo631kIDL._AC_UF1000,1000_QL80_.jpg"
          accuracy={100}
          combo={1000}
          streamUrl={props.streamUrl3}
          muted
        />
      </div>
    </div>
  )
}

export default TeamOfThree
