import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Home, Star } from 'lucide-react';
import { Variants } from 'framer-motion';

interface WinnerModalProps {
  winner: string;
  player1Name: string;
  player2Name: string;
  scores: { player1: number; player2: number };
  onPlayAgain: () => void;
  onExit: () => void;
}

export default function WinnerModal({ 
  winner, 
  player1Name, 
  player2Name, 
  scores, 
  onPlayAgain, 
  onExit 
}: WinnerModalProps) {
  const isTie = winner === 'tie';

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 } as const
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 } as const
    }
  };

  const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      style={{
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <motion.div 
        className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-black bg-opacity-60 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/10">
          {/* Header Section */}
          <div className="px-6 sm:px-8 pt-8 pb-6 text-center border-b border-white/10">
            <motion.div 
              className="mb-4 sm:mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              {isTie ? (
                <div className="flex justify-center gap-3 sm:gap-4">
                  <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-[rgba(255,215,0,0.9)]" />
                  <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-[rgba(255,215,0,0.9)]" />
                </div>
              ) : (
                <Trophy className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-[rgba(255,215,0,0.9)]" />
              )}
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.h2 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4"
                variants={staggerItem}
              >
                {isTie ? "Damn it's a Tie!" : `🎉 ${winner} Wins! 🎉`}
              </motion.h2>
              <motion.p 
                className="text-sm sm:text-base lg:text-lg text-white/80"
                variants={staggerItem}
              >
                {isTie ? 'Both players are champions!' : 'Congratulations on your victory!'}
              </motion.p>
            </motion.div>
          </div>

          {/* Scores Section */}
          <motion.div 
            className="px-6 sm:px-8 py-6"
            variants={staggerItem}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 text-center">
              Final Scores
            </h3>
            <div className="bg-white/10 rounded-xl p-4 sm:p-6">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-white/70 mb-1 font-medium">
                    {player1Name}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-[rgba(255,215,0,0.9)]">
                    {scores.player1}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-white/70 mb-1 font-medium">
                    {player2Name}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-[rgba(255,215,0,0.9)]">
                    {scores.player2}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="px-6 sm:px-8 pb-6 sm:pb-8"
            variants={staggerItem}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.button
                onClick={onPlayAgain}
                className="flex-1 px-4 sm:px-6 py-3 rounded-xl bg-[rgba(255,215,0,0.9)] text-black font-semibold hover:bg-yellow-400 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                Play Again
              </motion.button>
              
              <motion.button
                onClick={onExit}
                className="flex-1 px-4 sm:px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                Exit
              </motion.button>
            </div>
          </motion.div>

          {/* Decorative Stars */}
          <motion.div 
            className="flex justify-center gap-1 sm:gap-2 pb-4 sm:pb-6"
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.div
                key={star}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + (star * 0.1), type: "spring", stiffness: 300 }}
              >
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-[rgba(255,215,0,0.9)] fill-current" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
