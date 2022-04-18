import wordBank from "./wordle-bank.txt"

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
]

export async function generateWordSet(): Promise<{ wordSet: Set<string> }> {
  let wordSet: Set<string> = new Set()
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.toUpperCase().split("\n")
      wordSet = new Set(wordArr)
    })
  return { wordSet }
}

export function getRandomItemFromSet<X>(set: Set<X>) {
  const arr = Array.from(set.keys())
  const randomIndex = Math.floor(Math.random() * arr.length)
  const item = arr[randomIndex]
  return item
}
