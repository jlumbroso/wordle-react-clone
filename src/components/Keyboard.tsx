import React, { useCallback, useContext, useEffect } from "react"

import { AppContext } from "../App"
import { LetterStatus } from "../helpers"
import Key from "./Key"

const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
const keys3 = ["Z", "X", "C", "V", "B", "N", "M"]
const keys = [...keys1, ...keys2, ...keys3]

function Keyboard() {
  const {
    onDelete,
    onEnter,
    onSelectLetter,
    board,
    boardStatus,
    letterStatus,
  } = useContext(AppContext)

  const handleKeyboard = useCallback(
    (event: KeyboardEvent) => {
      // ignore composed events involving meta or ctrl
      if (event.metaKey || event.ctrlKey) {
        return
      }

      switch (event.key) {
        case "Enter":
          return onEnter()
        case "Backspace":
          return onDelete()
        default:
          keys.forEach((key) => {
            if (key === event.key.toUpperCase()) {
              return onSelectLetter(key)
            }
          })
      }
    },
    [onDelete, onEnter, onSelectLetter]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard)

    return () => {
      document.removeEventListener("keydown", handleKeyboard)
    }
  })

  return (
    <div className="keyboard" data-testid="keyboard">
      <div className="line1">
        {keys1.map((key) => {
          return (
            <Key
              key={key}
              keyVal={key}
              status={letterStatus.get(key) || LetterStatus.Unknown}
            />
          )
        })}
      </div>
      <div className="line2">
        {keys2.map((key) => {
          return (
            <Key
              key={key}
              keyVal={key}
              status={letterStatus.get(key) || LetterStatus.Unknown}
            />
          )
        })}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey />
        {keys3.map((key) => {
          return (
            <Key
              key={key}
              keyVal={key}
              status={letterStatus.get(key) || LetterStatus.Unknown}
            />
          )
        })}
        <Key keyVal={"DELETE"} bigKey />
      </div>
    </div>
  )
}

export default Keyboard
