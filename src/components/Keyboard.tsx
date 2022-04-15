import React from 'react'

import Key from './Key'

type Props = {}

function Keyboard({}: Props) {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <div className="keyboard">
      <div className="line1">{keys1.map((key) => {
        return <Key keyVal={key}/>
      })}</div>
      <div className="line1">{keys2.map((key) => {
        return <Key keyVal={key}/>
      })}</div>
      <div className="line1">
        <Key keyVal={"ENTER"} bigKey/>
        {keys3.map((key) => {
          return <Key keyVal={key}/>
        })}
        <Key keyVal={"DELETE"} bigKey/>
      </div>
    </div>
  )
}

export default Keyboard