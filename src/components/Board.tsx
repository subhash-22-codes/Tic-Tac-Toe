import React from 'react';
import Square from './Square';
import { Player } from './GameBoard';

interface BoardProps {
  board: Player[];
  onSquareClick: (index: number) => void;
}

export default function Board({ board, onSquareClick }: BoardProps) {
  return (
    <div className="glassmorphism rounded-2xl p-6">
      <div className="grid grid-cols-3 gap-3 w-80 h-80">
        {board.map((square, index) => (
          <Square
            key={index}
            value={square}
            onClick={() => onSquareClick(index)}
          />
        ))}
      </div>
    </div>
  );
}