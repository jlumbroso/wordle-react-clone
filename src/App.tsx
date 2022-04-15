import { createContext, useState } from 'react';

import './App.css';

import { boardDefault } from "./helpers"
import Board from "./components/Board"
import Keyboard from "./components/Keyboard"

// @ts-ignore
export const AppContext = createContext()

function App() {
  const [board, setBoard] = useState(boardDefault)
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value={{board, setBoard}}>
        <Board />
        <Keyboard />
      </AppContext.Provider>
    </div>
  );
}

export default App;
