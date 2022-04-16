import { createContext, useEffect, useState } from 'react';

import './App.css';

import { boardDefault, generateWordSet } from "./helpers"
import Board from "./components/Board"
import Keyboard from "./components/Keyboard"

// @ts-ignore
export const AppContext = createContext()

function App() {
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState({
    attempt: 0, letterPos: 0,
  })
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([])

  const correctWord = "RIGHT"

  // generate set once (by empty deps)
  useEffect(() => {
    generateWordSet().then((words) => {
      // @ts-ignore
      setWordSet(words.wordSet)
    })
  }, [])

  const onSelectLetter = (key: string) => {
    if(currAttempt.letterPos >= 5) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = key
    setBoard(newBoard)
    // @ts-ignore
    setCurrAttempt({...currAttempt,
      letterPos: currAttempt.letterPos + 1
    })
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = ""
    setBoard(newBoard)
    setCurrAttempt({...currAttempt,
      letterPos: currAttempt.letterPos - 1,
    })
  }

  const onEnter = () => {
    console.log(currAttempt)
    if (currAttempt.letterPos !== 5) return;

    let currWord = board[currAttempt.attempt].join("").toUpperCase();
    if (!wordSet.has(currWord)) return alert("Word not found")

    setCurrAttempt({
      attempt: currAttempt.attempt + 1,
      letterPos: 0,
    })
  }

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value={{
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
      }}>
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
