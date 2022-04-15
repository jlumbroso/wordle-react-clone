import React, { useContext } from 'react'
import { AppContext } from '../App'

type Props = {
    keyVal: string,
    bigKey?: boolean,
}

function Key({keyVal, bigKey}: Props) {

  // @ts-ignore
  const { onDelete, onEnter, onSelectLetter } = useContext(AppContext)

  const selectLetter = () => {
    if (keyVal === "DELETE") {
      onDelete();
    } else if (keyVal === "ENTER") {
      onEnter();
    } else {
      onSelectLetter(keyVal);
    }
  }
  return (
    <div className="key" id={bigKey ? "big" : ""} onClick={selectLetter}>
      {keyVal}
    </div>
  )
}

export default Key