/*
 * Return a random integer with max and min.  Used to select a question array index.
 */
export const getRandomIndex = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
