import React from 'react'

type Props = {
    keyVal: string,
    bigKey?: boolean,
}

function Key({keyVal, bigKey}: Props) {
  return (
    <div className="key" id={bigKey ? "big" : ""}>{keyVal}</div>
  )
}

export default Key