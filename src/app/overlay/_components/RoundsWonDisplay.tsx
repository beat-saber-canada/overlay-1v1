interface Props {
  roundsWon: number
  roundsToWin: number
  reverse?: boolean
}

const RoundsWonDisplay = (props: Props) => {
  const { roundsWon, roundsToWin, reverse } = props

  return (
    <div className={`flex flex-row gap-2 ${reverse && "flex-row-reverse"}`}>
      {Array.from(Array(roundsToWin).keys()).map((_, index) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={30}
          viewBox="-1860 -2000 3720 4030"
          key={index}
        >
          <path
            fill={index < roundsWon ? "white" : "none"}
            stroke="white"
            strokeWidth={128}
            d="m-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z"
          />
        </svg>
      ))}
    </div>
  )
}

export default RoundsWonDisplay
