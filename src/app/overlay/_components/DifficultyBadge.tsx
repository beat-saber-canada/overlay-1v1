import Difficulty from "@bocchi/bs-canada-overlay/data/Difficulty"
import { useMemo } from "react"

interface Props {
  difficulty: Difficulty
}

const getDifficultyColor = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.Easy:
      return "bg-picked-green"
    case Difficulty.Normal:
      return "bg-tiebraker-yellow"
    case Difficulty.Hard:
      return "bg-hard-blue"
    case Difficulty.Expert:
      return "bg-maple-red-dark"
    case Difficulty.ExpertPlus:
      return "bg-expertplus-purple"
  }
}

const getDifficultyText = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.Easy:
      return "Easy"
    case Difficulty.Normal:
      return "Normal"
    case Difficulty.Hard:
      return "Hard"
    case Difficulty.Expert:
      return "Expert"
    case Difficulty.ExpertPlus:
      return "Expert+"
  }
}

const DifficultyBadge = (props: Props) => {
  const { difficulty } = props
  const difficultyColor = useMemo(
    () => getDifficultyColor(difficulty),
    [difficulty],
  )
  const difficultyText = useMemo(
    () => getDifficultyText(difficulty),
    [difficulty],
  )

  return (
    <div className={`flex rounded-md p-2 ${difficultyColor}`}>
      <span className="text-xl font-medium uppercase text-white">
        {difficultyText}
      </span>
    </div>
  )
}

export default DifficultyBadge
