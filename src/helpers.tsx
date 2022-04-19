import wordMainBank from "./wordle-nytimes-main-bank.txt"
import wordAcceptableBank from "./wordle-nytimes-acceptable-bank.txt"

export enum LetterStatus {
  Unknown = 0,
  Letter = 2,
  LetterAndPosition = 4,
  Disabled = 1,
}

export function computeGuessStatus(
  guess: string,
  correctWord: string
): Array<LetterStatus> {
  // normalize inputs
  guess = guess.toLocaleUpperCase()
  correctWord = correctWord.toLocaleUpperCase()

  let remainder = correctWord
  let status = new Array(5).fill(LetterStatus.Unknown)

  // NOTE: to ensure proper coloring of the letters, it is impossible
  // to first identify correctly located letters, otherwise an incorrectly
  // located letter could be orange, and the subsequent correctly located
  // letter could be grey.

  // FIRST PASS: find all letters properly located
  for (let i = 0; i < guess.length; i++) {
    const c = guess.charAt(i)

    if (c === correctWord.charAt(i)) {
      // remove the first occurrence (important to color repetitions accurately)
      remainder = remainder.replace(c, "")

      // record that this matches both letter and position
      status[i] = LetterStatus.LetterAndPosition
    }
  }

  // SECOND PASS: find letters incorrectly located
  for (let i = 0; i < guess.length; i++) {
    const c = guess.charAt(i)

    // skip properly positioned letters
    if (c === correctWord.charAt(i)) continue

    // EITHER: the letter is in the word
    if (remainder.includes(c)) {
      remainder = remainder.replace(c, "")

      // since we have located correctly positioned letters, we know this is incorrectly positioned
      status[i] = LetterStatus.Letter
    }
    // OR: there are no more occurrences of the letter to be found
    else {
      status[i] = LetterStatus.Disabled
    }
  }

  return status
}

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
]

export const boardStatusDefault = [
  [
    LetterStatus.Unknown,
    LetterStatus.Unknown,
    LetterStatus.Unknown,
    LetterStatus.Unknown,
    LetterStatus.Unknown,
  ],
  [
    LetterStatus.Unknown,
    LetterStatus.Unknown,
    LetterStatus.Unknown,
    LetterStatus.Unknown,
    LetterStatus.Unknown,
  ],
  [
    LetterStatus.Unknown,
    LetterStatus.Unknown,
    LetterStatus.Unknown,
    LetterStatus.Unknown,
    LetterStatus.Unknown,
  ],
  [
    LetterStatus.Unknown,
    LetterStatus.Unknown,
    LetterStatus.Unknown,
    LetterStatus.Unknown,
    LetterStatus.Unknown,
  ],
  [
    LetterStatus.Unknown,
    LetterStatus.Unknown,
    LetterStatus.Unknown,
    LetterStatus.Unknown,
    LetterStatus.Unknown,
  ],
  [
    LetterStatus.Unknown,
    LetterStatus.Unknown,
    LetterStatus.Unknown,
    LetterStatus.Unknown,
    LetterStatus.Unknown,
  ],
]

async function generateWordSetFromWordBank(
  wordBank: string
): Promise<{ wordSet: Set<string> }> {
  let wordSet: Set<string> = new Set()
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.toUpperCase().split("\n")
      wordSet = new Set(wordArr)
    })
  return { wordSet }
}

export async function generateAcceptableWordSet(): Promise<{
  wordSet: Set<string>
}> {
  let wordSet: Set<string> = new Set()
  let response = await generateWordSetFromWordBank(wordAcceptableBank)
  wordSet = response.wordSet
  return { wordSet }
}

export async function generateMainWordSet(): Promise<{ wordSet: Set<string> }> {
  let wordSet: Set<string> = new Set()
  let response = await generateWordSetFromWordBank(wordMainBank)
  wordSet = response.wordSet
  return { wordSet }
}

export function getRandomItemFromSet<X>(set: Set<X>) {
  const arr = Array.from(set.keys())
  const randomIndex = Math.floor(Math.random() * arr.length)
  const item = arr[randomIndex]
  return item
}
