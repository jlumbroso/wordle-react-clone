import React, { useContext } from "react"
import { AppContext } from "../App"
import { LetterStatus } from "../helpers"

type Props = {
  keyVal: string
  bigKey?: boolean
  disabled?: boolean
}

function Key({ keyVal, bigKey, disabled }: Props) {
  const { onDelete, onEnter, onSelectLetter, letterStatus } =
    useContext(AppContext)

  const selectLetter = () => {
    if (keyVal === "DELETE") {
      onDelete()
    } else if (keyVal === "ENTER") {
      onEnter()
    } else {
      onSelectLetter(keyVal)
    }
  }

  let letterState = ""
  let status = letterStatus.get(keyVal) || LetterStatus.Unknown
  switch (status) {
    case LetterStatus.Letter:
      letterState = "almost"
      break
    case LetterStatus.LetterAndPosition:
      letterState = "correct"
      break
    case LetterStatus.Disabled:
      letterState = "error"
      break
    default:
      break
  }

  return (
    <div
      className="key"
      id={bigKey ? "big" : letterState}
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  )
}

export default Key
