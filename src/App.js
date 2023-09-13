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
  const [isGameOver, setIsGameOver] = useState(false);

  let game = useRef(null);

  useEffect(() => {
    game.current = new Chess();
    console.log("Game", game.current);
  }, []);

  const onDrop = ({ sourceSquare, targetSquare }) => {
    try {
      let move = game.current.move({
        from: sourceSquare,
        to: targetSquare,
      });

      // Check for illegal move
      if (move === null) {
        return;
      }

      setFen(game.current.fen());

      // Check for checkmate
      if (game.current.isGameOver()) {
        setIsGameOver(true);
      }
    } catch (e) {
      console.log("Invalid move");
    }
  };

  return (
    <div className="App" style={container}>
      {isGameOver && (
        <div>
          <h1>Game Over</h1>
          <span>Checkmate!</span>
        </div>
      )}

      <Chessboard position={fen} onDrop={onDrop} />
    </div>
  );
}

export default App;
