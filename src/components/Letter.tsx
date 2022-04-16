import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types';

import { AppContext } from '../App'

type Props = {
    letterPos: number,
    attemptVal: number,
}

function Letter({letterPos, attemptVal}: Props) {
  // @ts-ignore
  const { board, currAttempt, correctWord, disabledLetters, setDisabledLetters } = useContext(AppContext)
  const letter = board[attemptVal][letterPos];

  // compute color
  let letterState = ""

  const correct = correctWord[letterPos] === letter;
  const almost = correctWord.includes(letter);

  if (currAttempt.attempt > attemptVal) {
    letterState = "error"
    if (correct) letterState = "correct"
    else if (almost) letterState = "almost"
  }

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters([...disabledLetters, letter])
    }
  })

  return (
    <div className="letter" id={letterState}>{letter}</div>
  )
}

export default Letter