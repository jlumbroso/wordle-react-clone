import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"

import "./App.css"

import { boardDefault, generateWordSet, getRandomItemFromSet } from "./helpers"
import Board from "./components/Board"
import Keyboard from "./components/Keyboard"
import GameOver from "./components/GameOver"

export interface IWordleGameContext {
  board: string[][]
  setBoard: Dispatch<SetStateAction<string[][]>>
  currAttempt: { attempt: number; letterPos: number }
  setCurrAttempt: Dispatch<
    SetStateAction<{ attempt: number; letterPos: number }>
  >
  onDelete: () => void
  onEnter: () => void
  onSelectLetter: (key: string) => void
  correctWord: string
  disabledLetters: string[]
  setDisabledLetters: Dispatch<SetStateAction<string[]>>
  gameOver: { gameOver: boolean; guessedWord: boolean }
  setGameOver: Dispatch<
    SetStateAction<{ gameOver: boolean; guessedWord: boolean }>
  >
}

export const AppContext = createContext<IWordleGameContext>(
  {} as IWordleGameContext
)

function App() {
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState({
    attempt: 0,
    letterPos: 0,
  })
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState<string[]>([])
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  })

  //const correctWord = "RIGHT";
  const [correctWord, setCorrectWord] = useState("RIGHT")

  // generate set once (by empty deps)
  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet)
      setCorrectWord(getRandomItemFromSet(words.wordSet))
    })
  }, [])

  const onSelectLetter = (key: string) => {
    if (currAttempt.letterPos >= 5) return
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = key
    setBoard(newBoard)
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 })
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = ""
    setBoard(newBoard)
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 })
  }

  const onEnter = () => {
    console.log(currAttempt)
    if (currAttempt.letterPos !== 5) return

    let currWord = board[currAttempt.attempt].join("").toUpperCase()
    if (!wordSet.has(currWord)) return alert("Word not found")

    // defining here because it won't be refreshed after the setCurrAttempt
    const nextAttemptCount = currAttempt.attempt + 1

    setCurrAttempt({
      attempt: nextAttemptCount,
      letterPos: 0,
    })

    if (currWord === correctWord) {
      setGameOver({
        gameOver: true,
        guessedWord: true,
      })
    } else if (nextAttemptCount === 6) {
      setGameOver({
        gameOver: true,
        guessedWord: false,
      })
    }
  }

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onDelete,
          onEnter,
          onSelectLetter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  )
}

export default App
