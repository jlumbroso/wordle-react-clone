import React, { useContext } from 'react'
import PropTypes from 'prop-types';

import { AppContext } from '../App'

type Props = {
    letterPos: number,
    attemptVal: number,
}

function Letter({letterPos, attemptVal}: Props) {
  // @ts-ignore
  const { board, currAttempt, correctWord } = useContext(AppContext)
  const letter = board[attemptVal][letterPos];

  // compute color
  let letterState = ""

  if (currAttempt.attempt > attemptVal) {
    letterState = "error"
    const correct = correctWord[letterPos] === letter;
    const almost = correctWord.includes(letter);
    if (correct) letterState = "correct"
    else if (almost) letterState = "almost"
  }

  return (
    <div className="letter" id={letterState}>{letter}</div>
  )
}

export default Letter