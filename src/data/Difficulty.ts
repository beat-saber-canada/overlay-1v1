enum Difficulty {
  Easy = 0,
  Normal = 1,
  Hard = 2,
  Expert = 3,
  ExpertPlus = 4,
}

export const parseDifficultyString = (difficultyString: string): Difficulty => {
  const normalizedDifficultyString = difficultyString.toLowerCase()
  switch (normalizedDifficultyString) {
    case "easy":
      return Difficulty.Easy
    case "normal":
      return Difficulty.Normal
    case "hard":
      return Difficulty.Hard
    case "expert":
      return Difficulty.Expert
    default:
      return Difficulty.ExpertPlus
  }
}

export default Difficulty
