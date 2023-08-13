export const commaSeparatedStringToArray = (inputString: string) => {
  if (!inputString) {
    return []; // Return an empty array for empty input.
  }

  const stringArray = inputString.split(",").map((item) => item.trim());
  return stringArray;
};
