const isDarkColor = (red: number, green: number, blue: number) => {
  return red * 0.299 + green * 0.587 + blue * 0.114 < 186
}

export default isDarkColor
