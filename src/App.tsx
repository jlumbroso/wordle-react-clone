import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"

import "./App.css"

import {
  boardDefault,
  boardStatusDefault,
  computeStatus,
  generateWordSet,
  getRandomItemFromSet,
  LetterStatus,
} from "./helpers"
import Board from "./components/Board"
import Keyboard from "./components/Keyboard"
import GameOver from "./components/GameOver"

export interface IWordleGameContext {
  board: string[][]
  setBoard: Dispatch<SetStateAction<string[][]>>
  boardStatus: LetterStatus[][]
  setBoardStatus: Dispatch<SetStateAction<LetterStatus[][]>>
  currAttempt: { attempt: number; letterPos: number }
  setCurrAttempt: Dispatch<
    SetStateAction<{ attempt: number; letterPos: number }>
  >
  onDelete: () => void
  onEnter: () => void
  onSelectLetter: (key: string) => void
  correctWord: string
  letterStatus: Map<string, LetterStatus>
  setLetterStatus: Dispatch<SetStateAction<Map<string, LetterStatus>>>
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
  const [boardStatus, setBoardStatus] = useState(boardStatusDefault)
  const [currAttempt, setCurrAttempt] = useState({
    attempt: 0,
    letterPos: 0,
  })
  const [wordSet, setWordSet] = useState(new Set())
  const [letterStatus, setLetterStatus] = useState(new Map())
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

    // compute the status of the letters
    const newBoardStatus = [...boardStatus]
    newBoardStatus[currAttempt.attempt] = computeStatus(currWord, correctWord)
    setBoardStatus(newBoardStatus)

    // update their status globally
    // let newLetterStatus = new Map<string, LetterStatus>(letterStatus)
    // for (let attempt = 0; attempt < currAttempt.attempt; attempt++) {
    //   for (let letterPos = 0; letterPos < 5; letterPos++) {
    //     const letter = board[attempt][letterPos]
    //     const oldStatus = newLetterStatus.get(letter) || LetterStatus.Unknown
    //     const newStatus = boardStatus[attempt][letterPos]
    //     if (oldStatus < newStatus) newLetterStatus.set(letter, newStatus)
    //   }
    // }
    // console.log(newLetterStatus)
    // setLetterStatus(newLetterStatus)

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
          boardStatus,
          setBoardStatus,
          currAttempt,
          setCurrAttempt,
          onDelete,
          onEnter,
          onSelectLetter,
          correctWord,
          letterStatus,
          setLetterStatus,
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
