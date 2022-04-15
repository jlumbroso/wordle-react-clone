import React, { useContext } from 'react'
import PropTypes from 'prop-types';

import { AppContext } from '../App'

type Props = {
    letterPos: number,
    attemptVal: number,
}

function Letter({letterPos, attemptVal}: Props) {
  // @ts-ignore
  const { board } = useContext(AppContext)
  const letter = board[attemptVal][letterPos];
  return (
    <div className="letter">{letter}</div>
  )
}

export default Letter