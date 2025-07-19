import React, { useState, useEffect, useCallback } from 'react';
import { GameSettings } from '../App';
import Board from './Board';
import Dashboard from './Dashboard';
import WinnerModal from './WinnerModal';
import { RotateCcw, Home, Zap } from 'lucide-react';

interface GameBoardProps {
  gameSettings: GameSettings;
  onResetGame: () => void;
}


export type Player = 'X' | 'O' | null;

export default function GameBoard({ gameSettings, onResetGame }: GameBoardProps) {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [currentRound, setCurrentRound] = useState(1);
  const [winner, setWinner] = useState<string | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [roundWinner, setRoundWinner] = useState<string | null>(null);

  const avatars = [
  'https://i.imgflip.com/4/4t0m5.jpg', // Distracted Boyfriend
  'https://i.imgflip.com/1ur9b0.jpg', // Drake Hotline Bling
  'https://i.imgflip.com/26am.jpg',   // Grumpy Cat
  'https://i.imgflip.com/3si4.jpg',   // Hide the Pain Harold
  'https://i.imgflip.com/30b1gx.jpg', // Is This a Pigeon?
  'https://i.imgflip.com/1otk96.jpg', // Expanding Brain
  'https://i.imgflip.com/39t1o.jpg',  // Confused Nick Young
  'https://i.imgflip.com/3txjhl.jpg', // Buff Doge vs Cheems
  'https://i.imgflip.com/2hgfw.jpg'   // Success Kid
];


  const checkWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleSquareClick = (index: number) => {
    if (board[index] || roundWinner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      const winnerName = winner === 'X' ? gameSettings.player1Name : gameSettings.player2Name;
      setRoundWinner(winnerName);
      setScores(prev => ({
        ...prev,
        [winner === 'X' ? 'player1' : 'player2']: prev[winner === 'X' ? 'player1' : 'player2'] + 1
      }));
    } else if (newBoard.every(square => square !== null)) {
      // Tie
      setRoundWinner('tie');
      setScores(prev => ({
        player1: prev.player1 + 1,
        player2: prev.player2 + 1
      }));
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const nextRound = useCallback(() => {
  if (currentRound >= gameSettings.totalRounds) {
    let finalWinner = '';
    if (scores.player1 > scores.player2) {
      finalWinner = gameSettings.player1Name;
    } else if (scores.player2 > scores.player1) {
      finalWinner = gameSettings.player2Name;
    } else {
      finalWinner = 'tie';
    }
    setWinner(finalWinner);
    setGameComplete(true);
  } else {
    setCurrentRound(prev => prev + 1);
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setRoundWinner(null);
  }
}, [currentRound, gameSettings, scores]);

useEffect(() => {
  if (roundWinner) {
    const timer = setTimeout(() => {
      nextRound();
    }, 2000);
    return () => clearTimeout(timer);
  }
}, [roundWinner, nextRound]);
  return (
    <div className="min-h-screen p-2 sm:p-4 lg:p-8">
      {/* Compact Header */}
      <div className="max-w-7xl mx-auto mb-4 sm:mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
          <div className="text-center sm:text-left">
            <h1 className="font-madimi text-2xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-[#00BFFF] via-[#FFD700] to-[#FF4500] bg-clip-text text-transparent leading-tight">
              TIC TAC TOE
            </h1>
            <p className="font-poppins text-sm sm:text-base lg:text-lg text-gray-300 mt-1">
              Round {currentRound} of {gameSettings.totalRounds}
            </p>
          </div>
          
          {/* Compact Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setBoard(Array(9).fill(null));
                setCurrentPlayer('X');
                setRoundWinner(null);
              }}
              className="font-poppins px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-xs sm:text-sm rounded-lg glassmorphism hover:bg-white/20 transition-all duration-200 flex items-center gap-1 sm:gap-2"
            >
              <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              onClick={onResetGame}
              className="font-poppins px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-xs sm:text-sm rounded-lg glassmorphism hover:bg-white/20 transition-all duration-200 flex items-center gap-1 sm:gap-2"
            >
              <Home className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Game Container */}
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout: Vertical Stack */}
        <div className="block lg:hidden space-y-4">
          {/* Mobile Player Dashboards - Horizontal */}
          <div className="flex justify-between items-center gap-2 px-2">
            <div className="flex-1 max-w-[140px]">
              <Dashboard
                playerName={gameSettings.player1Name}
                score={scores.player1}
                avatar={avatars[0]}
                isActive={currentPlayer === 'X' && !roundWinner}
                symbol="X"
                color="#00BFFF"
              />
            </div>
            
            {/* Mobile VS Section */}
            <div className="flex items-center justify-center px-2">
      
              <span className="font-bungee text-lg font-bold mx-2 text-[#FFD700]">VS</span>
      
            </div>

            <div className="flex-1 max-w-[140px]">
              <Dashboard
                playerName={gameSettings.player2Name}
                score={scores.player2}
                avatar={avatars[1]}
                isActive={currentPlayer === 'O' && !roundWinner}
                symbol="O"
                color="#FF4500"
              />
            </div>
          </div>

          {/* Mobile Current Turn Indicator */}
          {!roundWinner && (
            <div className="text-center px-4">
              <div className="glassmorphism rounded-lg p-2 inline-block">
                <div className="flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4 text-[#FFD700] animate-pulse" />
                  <p className="font-poppins text-sm text-gray-300">
                    <span className={`font-semibold ${currentPlayer === 'X' ? 'text-[#00BFFF]' : 'text-[#FF4500]'}`}>
                      {currentPlayer === 'X' ? gameSettings.player1Name : gameSettings.player2Name}
                    </span>
                    <span className="text-[#FFD700] ml-1">({currentPlayer})</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Round Winner */}
          {roundWinner && (
            <div className="text-center px-4">
              <div className="glassmorphism rounded-xl p-3 inline-block animate-in zoom-in-95 duration-300">
                <p className="font-outfit text-lg font-bold text-[#FFD700]">
                  {roundWinner === 'tie' ? "It's a Tie!" : `${roundWinner} Wins!`}
                </p>
                <p className="font-poppins text-xs text-gray-300 mt-1">
                  Next round starting...
                </p>
              </div>
            </div>
          )}

          {/* Mobile Game Board */}
          <div className="flex justify-center px-2">
            <Board board={board} onSquareClick={handleSquareClick} />
          </div>
        </div>

        {/* Desktop Layout: Grid */}
        <div className="hidden lg:block">
          {/* Desktop Player Dashboards */}
          <div className="grid grid-cols-3 gap-8 mb-8 items-center">
            <Dashboard
              playerName={gameSettings.player1Name}
              score={scores.player1}
              avatar={avatars[0]}
              isActive={currentPlayer === 'X' && !roundWinner}
              symbol="X"
              color="#00BFFF"
            />
            
            {/* Desktop VS Section */}
            <div className="flex items-center justify-center">
              
              <span className="font-bungee text-4xl font-bold mx-6 text-[#FFD700]">VS</span>
  
            </div>

            <Dashboard
              playerName={gameSettings.player2Name}
              score={scores.player2}
              avatar={avatars[1]}
              isActive={currentPlayer === 'O' && !roundWinner}
              symbol="O"
              color="#FF4500"
            />
          </div>

          {/* Desktop Current Turn Indicator */}
          {!roundWinner && (
            <div className="text-center mb-6">
              <div className="glassmorphism rounded-xl p-4 inline-block">
                <div className="flex items-center justify-center gap-3">
                  <Zap className="w-5 h-5 text-[#FFD700] animate-pulse" />
                  <p className="font-poppins text-xl text-gray-300">
                    Current Turn: 
                    <span className={`ml-2 font-semibold ${currentPlayer === 'X' ? 'text-[#00BFFF]' : 'text-[#FF4500]'}`}>
                      {currentPlayer === 'X' ? gameSettings.player1Name : gameSettings.player2Name}
                    </span>
                    <span className="text-[#FFD700] ml-2">({currentPlayer})</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Round Winner */}
          {roundWinner && (
            <div className="text-center mb-6">
              <div className="glassmorphism rounded-xl p-6 inline-block animate-in zoom-in-95 duration-500">
                <p className="font-uphoria text-3xl font-bold text-[#FFD700] mb-2">
                  {roundWinner === 'tie' ? "It's a Tie!" : `${roundWinner} Wins This Round!`}
                </p>
                <p className="font-poppins text-sm text-gray-300">
                  Next round starting...
                </p>
              </div>
            </div>
          )}

          {/* Desktop Game Board */}
          <div className="flex justify-center">
            <Board board={board} onSquareClick={handleSquareClick} />
          </div>
        </div>
      </div>

      {/* Winner Modal */}
      {gameComplete && (
        <WinnerModal
          winner={winner || ""}
          player1Name={gameSettings.player1Name}
          player2Name={gameSettings.player2Name}
          scores={scores}
          onPlayAgain={onResetGame}
          onExit={onResetGame}
        />
      )}
    </div>
  );
}