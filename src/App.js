import "./App.css";
import Chessboard from "chessboardjsx";

import { Chess } from "chess.js";

import React, { useState, useRef, useEffect } from "react";

const container = {
  marginTop: "6rem",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};

function App() {
  const [fen, setFen] = useState("start");

  let game = useRef(null);

  useEffect(() => {
    game.current = new Chess();
  }, []);
  console.log(game);

  const onDrop = ({ sourceSquare, targetSquare }) => {
    let move = game.current.move({
      from: sourceSquare,
      to: targetSquare,
    });

    // to check for illegal move
    if (move === null) return;

    setFen(game.current.fen());
  };
  return (
    <div className="App" style={container}>
      {game.current && game.current.game_over ? (
        <div>
          <h1>Game Over</h1>
          <span></span>
        </div>
      ) : null}

      <Chessboard position={fen} onDrop={onDrop} />
    </div>
  );
}

export default App;
