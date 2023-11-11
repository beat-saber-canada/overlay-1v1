const sanitizeString = (inputString: string) => {
  // Convert the string to lowercase
  const lowercaseString = inputString.toLowerCase()

  // Replace non-alphanumeric characters with hyphen
  const processedString = lowercaseString.replace(/[^a-z0-9]/g, "-")

  return processedString
}

export default sanitizeString
