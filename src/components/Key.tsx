import React, { useContext } from "react"
import { AppContext } from "../App"
import { LetterStatus } from "../helpers"

type Props = {
  keyVal: string
  bigKey?: boolean
  status?: LetterStatus
}

function Key({ keyVal, bigKey, status }: Props) {
  const { onDelete, onEnter, onSelectLetter } = useContext(AppContext)

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
