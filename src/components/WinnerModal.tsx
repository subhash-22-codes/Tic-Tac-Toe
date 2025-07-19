import React from 'react';
import { Trophy, RotateCcw, Home, Star } from 'lucide-react';

interface WinnerModalProps {
  winner: string;
  player1Name: string;
  player2Name: string;
  scores: { player1: number; player2: number };
  onPlayAgain: () => void;
  onExit: () => void;
}

export default function WinnerModal({ winner, player1Name, player2Name, scores, onPlayAgain, onExit }: WinnerModalProps) {
  const isTie = winner === 'tie';
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glassmorphism rounded-3xl p-8 max-w-lg w-full text-center animate-in zoom-in-95 duration-300">
        {/* Trophy Icon */}
        <div className="mb-6">
          {isTie ? (
            <div className="flex justify-center gap-4">
              <Trophy className="w-16 h-16 text-[#FFD700] animate-pulse" />
              <Trophy className="w-16 h-16 text-[#FFD700] animate-pulse" />
            </div>
          ) : (
            <Trophy className="w-20 h-20 mx-auto text-[#FFD700] animate-bounce" />
          )}
        </div>

        {/* Winner Announcement */}
        <div className="mb-8">
          <h2 className="font-uphoria text-4xl font-bold mb-4">
            {isTie ? (
              <span className="bg-gradient-to-r from-[#00BFFF] to-[#FF4500] bg-clip-text text-transparent">
                Perfect Tie!
              </span>
            ) : (
              <span className="bg-gradient-to-r from-[#FFD700] via-[#FF4500] to-[#00BFFF] bg-clip-text text-transparent">
                🎉 {winner} Wins! 🎉
              </span>
            )}
          </h2>
          <p className="font-galey text-xl text-gray-300">
            {isTie ? 'Both players are champions!' : 'Congratulations on your victory!'}
          </p>
        </div>

        {/* Final Scores */}
        <div className="glassmorphism-dark rounded-2xl p-6 mb-8">
          <h3 className="font-poppins text-lg font-semibold mb-4 text-[#FFD700]">Final Scores</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="font-poppins text-sm text-gray-300 mb-1">{player1Name}</p>
              <p className="font-modern-outdoor text-3xl font-bold text-[#00BFFF]">{scores.player1}</p>
            </div>
            <div className="text-center">
              <p className="font-poppins text-sm text-gray-300 mb-1">{player2Name}</p>
              <p className="font-modern-outdoor text-3xl font-bold text-[#FF4500]">{scores.player2}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onPlayAgain}
            className="font-poppins flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00BFFF] to-[#FF4500] text-white font-semibold hover:from-[#0099CC] hover:to-[#CC3300] transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
          
          <button
            onClick={onExit}
            className="font-poppins flex-1 px-6 py-3 rounded-xl glassmorphism hover:bg-white/20 transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105"
          >
            <Home className="w-5 h-5" />
            Exit
          </button>
        </div>

        {/* Decorative Stars */}
        <div className="flex justify-center gap-2 mt-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-4 h-4 text-[#FFD700] fill-current animate-pulse" style={{ animationDelay: `${star * 0.2}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}