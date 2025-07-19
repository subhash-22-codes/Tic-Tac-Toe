import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import GameBoard from './components/GameBoard';

export interface GameSettings {
  player1Name: string;
  player2Name: string;
  totalRounds: number;
}

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    player1Name: '',
    player2Name: '',
    totalRounds: 1
  });

  const startGame = (settings: GameSettings) => {
    setGameSettings(settings);
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameSettings({
      player1Name: '',
      player2Name: '',
      totalRounds: 1
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {!gameStarted ? (
        <LandingPage onStartGame={startGame} />
      ) : (
        <GameBoard 
          gameSettings={gameSettings} 
          onResetGame={resetGame}
        />
      )}
    </div>
  );
}

export default App;