import React, { ReactPropTypes } from 'react'
import PropTypes from 'prop-types';

type Props = {
    letterPos: number,
    attemptVal: number,
}

function Letter({letterPos, attemptVal}: Props) {
  return (
    <div>Letter</div>
  )
}

export default Letter