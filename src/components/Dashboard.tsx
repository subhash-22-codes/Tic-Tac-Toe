import React from 'react';
import { Crown, Zap } from 'lucide-react';

interface DashboardProps {
  playerName: string;
  score: number;
  avatar: string;
  isActive: boolean;
  symbol: string;
  color: string;
}

export default function Dashboard({ playerName, score, avatar, isActive, symbol, color }: DashboardProps) {
  return (
    <div className={`
      glassmorphism rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 
      transition-all duration-500 ease-out transform
      ${isActive ? 'ring-2 ring-white/60 scale-[1.02] sm:scale-105 shadow-2xl' : 'hover:scale-[1.01] hover:shadow-lg'}
      w-full max-w-xs mx-auto
    `}>
      <div className="text-center space-y-2 sm:space-y-3">
        {/* Avatar Section */}
        <div className="relative inline-block">
          <div className={`
            relative transition-all duration-300 ease-out
            ${isActive ? 'animate-pulse' : ''}
          `}>
            <img
              src={avatar}
              alt={playerName}
              className={`
                w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 
                rounded-full object-cover border-3 sm:border-4 
                transition-all duration-300 ease-out
                ${isActive ? 'shadow-lg' : ''}
              `}
              style={{ borderColor: color }}
            />
            
            {/* Symbol Badge */}
            <div 
              className={`
                absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 
                w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 
                rounded-full flex items-center justify-center 
                text-white font-bold text-xs sm:text-sm md:text-lg 
                border-2 border-black shadow-lg
                transition-all duration-300 ease-out transform
                ${isActive ? 'scale-110' : ''}
              `}
              style={{ backgroundColor: color }}
            >
              <span className="font-modern-outdoor">{symbol}</span>
            </div>
            
            {/* Active Crown */}
            {isActive && (
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2">
                <Crown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#FFD700] animate-bounce" />
              </div>
            )}
          </div>
        </div>

        {/* Player Name */}
        <div className="px-1">
          <h3 
            className={`
              font-poppins text-sm sm:text-lg md:text-xl font-semibold 
              transition-all duration-300 ease-out truncate
              ${isActive ? 'transform scale-105' : ''}
            `} 
            style={{ color }}
            title={playerName}
          >
            {playerName}
          </h3>
        </div>

        {/* Score Section */}
        <div className={`
          glassmorphism-dark rounded-lg p-2 sm:p-3 
          transition-all duration-300 ease-out
          ${isActive ? 'bg-white/5' : ''}
        `}>
          <p className="font-poppins text-xs sm:text-sm text-gray-300 mb-1">
            Score
          </p>
          <p className={`
            font-modern-outdoor text-xl sm:text-2xl md:text-3xl font-bold text-[#FFD700]
            transition-all duration-300 ease-out
            ${isActive ? 'transform scale-110' : ''}
          `}>
            {score}
          </p>
        </div>

        {/* Active Turn Indicator */}
        {isActive && (
          <div className="mt-2 sm:mt-3 animate-in slide-in-from-bottom-2 duration-300">
            <div className="glassmorphism-dark rounded-full px-2 py-1 sm:px-3 sm:py-1 inline-flex items-center gap-1">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFD700] animate-pulse" />
              <span className="font-poppins text-xs sm:text-sm text-[#FFD700] font-medium">
                Your Turn
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}