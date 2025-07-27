import React from 'react';
import { Player } from './GameBoard';

interface SquareProps {
  value: Player;
  onClick: () => void;
}

export default function Square({ value, onClick }: SquareProps) {
  // Function to get color based on symbol (X always blue, O always red)
  const getSymbolColor = (symbol: 'X' | 'O'): string => {
    return symbol === 'X' ? '#00BFFF' : '#FF4500';
  };

  // Function to get background color based on symbol (X always blue, O always red)
  const getSymbolBgColor = (symbol: 'X' | 'O'): string => {
    return symbol === 'X' ? 'bg-[#00BFFF]/10' : 'bg-[#FF4500]/10';
  };

  return (
    <button
      onClick={onClick}
      className={`
        w-full h-full rounded-xl border-2 border-white/20 
        hover:border-white/40 transition-all duration-200 
        font-bold text-4xl flex items-center justify-center
        hover:scale-105 active:scale-95
        ${value ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-white/10'}
        ${value === 'X' ? `text-[${getSymbolColor('X')}] ${getSymbolBgColor('X')}` : ''}
        ${value === 'O' ? `text-[${getSymbolColor('O')}] ${getSymbolBgColor('O')}` : ''}
        ${!value ? 'glassmorphism-dark' : ''}
      `}
      disabled={!!value}
    >
      {value && (
        <span 
          className="font-modern-outdoor text-5xl font-bold animate-in fade-in-0 zoom-in-75 duration-300"
          style={{ color: getSymbolColor(value) }}
        >
          {value}
        </span>
      )}
    </button>
  );
}