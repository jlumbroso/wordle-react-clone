import React from "react"
import { AppContext } from "../App"

function GameOver() {
  const { gameOver, currAttempt, correctWord } = React.useContext(AppContext)
  return (
    <div className="gameOver">
      <h3>{gameOver.guessedWord ? "You correctly guessed" : "You failed"}</h3>
      <h1>Correct: {correctWord}</h1>
      {gameOver.guessedWord ? (
        <h3>You guessed in {currAttempt.attempt} attempts</h3>
      ) : (
        ""
      )}
    </div>
  )
}

export default GameOver
