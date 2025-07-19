import React, { useState } from 'react';
import { GameSettings } from '../App';
import { Play, Users, Trophy } from 'lucide-react';

interface LandingPageProps {
  onStartGame: (settings: GameSettings) => void;
}

export default function LandingPage({ onStartGame }: LandingPageProps) {
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  const [totalRounds, setTotalRounds] = useState(1);

  const handleStartGame = () => {
    if (player1Name.trim() && player2Name.trim()) {
      onStartGame({
        player1Name: player1Name.trim(),
        player2Name: player2Name.trim(),
        totalRounds
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-maddac text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-[#00BFFF] via-[#FFD700] to-[#FF4500] bg-clip-text text-transparent">
            TIC TAC TOE
          </h1>
          <p className="font-galey text-xl md:text-2xl text-gray-300 mb-8">
            Welcome to the ultimate battle of X's and O's!
          </p>
        </div>

        {/* Game Setup Card */}
        <div className="glassmorphism rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            <Users className="w-8 h-8 text-[#00BFFF] mr-3" />
            <h2 className="font-poppins text-2xl font-semibold">Game Setup</h2>
          </div>

          <div className="space-y-6">
            {/* Player Names */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="font-poppins block text-sm font-medium mb-2 text-[#00BFFF]">
                  Player 1 (X)
                </label>
                <input
                  type="text"
                  value={player1Name}
                  onChange={(e) => setPlayer1Name(e.target.value)}
                  className="font-poppins w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BFFF] focus:border-transparent transition-all"
                  placeholder="Enter player 1 name"
                />
              </div>
              <div>
                <label className="font-poppins block text-sm font-medium mb-2 text-[#FF4500]">
                  Player 2 (O)
                </label>
                <input
                  type="text"
                  value={player2Name}
                  onChange={(e) => setPlayer2Name(e.target.value)}
                  className="font-poppins w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF4500] focus:border-transparent transition-all"
                  placeholder="Enter player 2 name"
                />
              </div>
            </div>

            {/* Rounds Selection */}
            <div>
              <label className="font-poppins block text-sm font-medium mb-2 text-[#FFD700]">
                Number of Rounds (Max 10)
              </label>
              <select
                value={totalRounds}
                onChange={(e) => setTotalRounds(parseInt(e.target.value))}
                className="font-poppins w-full px-4 py-3 rounded-lg bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num} className="bg-black">
                    {num} Round{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="glassmorphism rounded-2xl p-6 mb-8">
          <h3 className="font-galey text-xl font-semibold mb-3 text-[#FFD700]">About Tic Tac Toe</h3>
          <p className="font-galey text-gray-300 leading-relaxed">
            Challenge your opponent in this classic strategy game. Take turns placing your marks on the 3x3 grid. 
            First to get three in a row wins the round! Play multiple rounds and crown the ultimate champion.
          </p>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={handleStartGame}
            disabled={!player1Name.trim() || !player2Name.trim()}
            className="font-poppins inline-flex items-center px-8 py-4 text-xl font-semibold rounded-xl bg-gradient-to-r from-[#00BFFF] to-[#FF4500] text-white hover:from-[#0099CC] hover:to-[#CC3300] disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-2xl"
          >
            <Play className="w-6 h-6 mr-3" />
            Start Game
          </button>
        </div>

        {/* Trophy Icon */}
        <div className="text-center mt-8">
          <Trophy className="w-12 h-12 mx-auto text-[#FFD700] animate-pulse" />
        </div>
      </div>
    </div>
  );
}