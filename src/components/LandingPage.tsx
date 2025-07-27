import React, { useState } from 'react';
import { GameSettings } from '../App';
import { Play, Users, Trophy, Gamepad2, Target, Award } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in-0 duration-700">
      <div className="max-w-4xl w-full">
        {/* Professional Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-in slide-in-from-top-4 duration-500">
          <div className="relative inline-block">
            <h1 className="font-madimi text-4xl sm:text-6xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 tracking-wider transition-all duration-300 hover:tracking-widest">
              TIC TAC TOE
            </h1>
            <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-0.5 sm:h-1 bg-[#FFD700] rounded-full animate-in slide-in-from-left-full duration-700 delay-300"></div>
          </div>
          <p className="font-outfit text-base sm:text-lg lg:text-2xl text-gray-300 mt-6 sm:mt-8 max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-bottom-4 duration-500 delay-200">
            Strategic gameplay meets timeless competition. Master the grid, dominate your opponent.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-12">
          {/* Game Setup Card */}
          <div className="lg:col-span-2 animate-in slide-in-from-left-6 duration-600 delay-300">
            <div className="glassmorphism rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-3xl hover:border-white/20">
              <div className="flex items-center mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#00BFFF]/10 flex items-center justify-center mr-3 sm:mr-4 transition-all duration-200 hover:bg-[#00BFFF]/20">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#00BFFF]" />
                </div>
                <h2 className="font-poppins text-lg sm:text-2xl font-semibold text-white">Game Configuration</h2>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {/* Player Names */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2 sm:space-y-3 animate-in slide-in-from-left-4 duration-400 delay-500">
                    <label className="font-poppins block text-xs sm:text-sm font-medium text-[#00BFFF] uppercase tracking-wide">
                      Player 1
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        value={player1Name}
                        onChange={(e) => setPlayer1Name(e.target.value)}
                        className="font-poppins w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00BFFF]/50 focus:border-[#00BFFF]/50 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                        placeholder="Enter first player name"
                      />
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-[#00BFFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3 animate-in slide-in-from-right-4 duration-400 delay-500">
                    <label className="font-poppins block text-xs sm:text-sm font-medium text-[#FF4500] uppercase tracking-wide">
                      Player 2
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        value={player2Name}
                        onChange={(e) => setPlayer2Name(e.target.value)}
                        className="font-poppins w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF4500]/50 focus:border-[#FF4500]/50 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                        placeholder="Enter second player name"
                      />
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-[#FF4500]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* Rounds Selection */}
                <div className="space-y-2 sm:space-y-3 animate-in slide-in-from-bottom-4 duration-400 delay-600">
                  <label className="font-poppins block text-xs sm:text-sm font-medium text-[#FFD700] uppercase tracking-wide">
                    Match Configuration
                  </label>
                  <div className="relative group">
                    <select
                      value={totalRounds}
                      onChange={(e) => setTotalRounds(parseInt(e.target.value))}
                      className="font-poppins w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-black/30 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700]/50 transition-all duration-300 backdrop-blur-sm appearance-none cursor-pointer text-sm sm:text-base"
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num} className="bg-black text-white">
                          {num} {num === 1 ? 'Round' : 'Rounds'} • Best of {num}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-3 sm:right-4 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Start Button */}
                <div className="pt-2 sm:pt-4 animate-in slide-in-from-bottom-6 duration-500 delay-700">
                  <button
                    onClick={handleStartGame}
                    disabled={!player1Name.trim() || !player2Name.trim()}
                    className="font-madimi w-full inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg sm:rounded-xl bg-white text-black hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl disabled:hover:scale-100"
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                    Initialize Game
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Game Features Sidebar */}
          <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-right-6 duration-600 delay-400">
            {/* Game Stats */}
            <div className="glassmorphism rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-xl">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#FFD700]/10 flex items-center justify-center mr-2 sm:mr-3 transition-all duration-200 hover:bg-[#FFD700]/20">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700]" />
                </div>
                <h3 className="font-madimi text-base sm:text-lg font-semibold text-white">Game Features</h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center text-xs sm:text-sm text-gray-300 animate-in slide-in-from-left-2 duration-300 delay-800">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00BFFF] mr-2 sm:mr-3"></div>
                  <span className="font-poppins">Real-time turn tracking</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-300 animate-in slide-in-from-left-2 duration-300 delay-900">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF4500] mr-2 sm:mr-3"></div>
                  <span className="font-poppins">Multi-round tournaments</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-300 animate-in slide-in-from-left-2 duration-300 delay-1000">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FFD700] mr-2 sm:mr-3"></div>
                  <span className="font-poppins">Advanced scoring system</span>
                </div>
              </div>
            </div>

            {/* Game Rules */}
            <div className="glassmorphism rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-xl">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#00BFFF]/10 flex items-center justify-center mr-2 sm:mr-3 transition-all duration-200 hover:bg-[#00BFFF]/20">
                  <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#00BFFF]" />
                </div>
                <h3 className="font-madimi text-base sm:text-lg font-semibold text-white">How to Play</h3>
              </div>
              <p className="font-outfit text-xs sm:text-sm text-gray-300 leading-relaxed animate-in slide-in-from-bottom-2 duration-400 delay-1100">
                Players alternate placing X's and O's on a 3×3 grid. First to achieve three marks in a row, column, or diagonal wins the round.
              </p>
              <p className="font-outfit text-xs sm:text-xs text-[#FFD700] leading-relaxed animate-in slide-in-from-bottom-2 duration-400 delay-1200 mt-2">
                <strong>Fair Play:</strong> Even total rounds = always alternate. Odd total rounds = alternate + random final round! <strong>X always goes first.</strong>
              </p>
            </div>

            {/* Achievement */}
            <div className="glassmorphism rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/10 text-center transition-all duration-300 hover:border-white/20 hover:shadow-xl">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#FFD700]/10 flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-all duration-200 hover:bg-[#FFD700]/20 animate-in zoom-in-50 duration-500 delay-1200">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-[#FFD700]" />
              </div>
              <h3 className="font-bungee text-base sm:text-lg font-semibold text-[#FFD700] mb-1 sm:mb-2 animate-in slide-in-from-bottom-2 duration-400 delay-1300">Championship Mode</h3>
              <p className="font-outfit text-xs text-gray-400 animate-in slide-in-from-bottom-2 duration-400 delay-1400">
                Compete across multiple rounds to determine the ultimate champion
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="text-center animate-in slide-in-from-bottom-4 duration-500 delay-1500">
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <div className="w-6 sm:w-8 h-px bg-gray-600 transition-all duration-300 hover:bg-[#FFD700]"></div>
            <Trophy className="w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 hover:text-[#FFD700]" />
            <div className="w-6 sm:w-8 h-px bg-gray-600 transition-all duration-300 hover:bg-[#FFD700]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}