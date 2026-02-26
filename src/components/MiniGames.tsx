'use client';

import { useState, useEffect } from 'react';
import {
    Gamepad2,
    Dice1,
    Dice2,
    Dice3,
    Dice4,
    Dice5,
    Dice6,
    Sword,
    Shield,
    Zap,
    Heart,
    Coins,
    Gem,
    Trophy,
    Clock,
    RotateCcw
} from 'lucide-react';

interface Game {
    id: string;
    name: string;
    description: string;
    icon: any;
    minBet: number;
    maxBet: number;
    multiplier: number;
    players: number;
    color: string;
}

export default function MiniGames() {
    const [selectedGame, setSelectedGame] = useState<string | null>(null);
    const [betAmount, setBetAmount] = useState(100);
    const [rolling, setRolling] = useState(false);
    const [result, setResult] = useState<number | null>(null);
    const [playerRoll, setPlayerRoll] = useState<number | null>(null);
    const [computerRoll, setComputerRoll] = useState<number | null>(null);
    const [balance, setBalance] = useState(5000);
    const [lastWins, setLastWins] = useState<{ game: string, amount: number }[]>([]);

    const games: Game[] = [
        { id: 'dice', name: 'DICE DUEL', description: 'Role o dado e vença o computador', icon: Dice3, minBet: 50, maxBet: 1000, multiplier: 2, players: 1243, color: 'from-cyber-blue to-cyber-purple' },
        { id: 'coin', name: 'COIN FLIP', description: 'Cara ou coroa? Sorte dobra!', icon: Dice2, minBet: 20, maxBet: 500, multiplier: 1.8, players: 856, color: 'from-cyber-yellow to-cyber-orange' },
        { id: 'crash', name: 'CYBER CRASH', description: 'Saia antes de explodir!', icon: Zap, minBet: 100, maxBet: 2000, multiplier: 5, players: 2341, color: 'from-cyber-red to-cyber-pink' },
    ];

    const handleDiceRoll = () => {
        if (betAmount > balance) {
            alert('Saldo insuficiente!');
            return;
        }

        setRolling(true);
        setBalance(prev => prev - betAmount);

        // Simulação de rolagem
        let count = 0;
        const interval = setInterval(() => {
            setPlayerRoll(Math.floor(Math.random() * 6) + 1);
            setComputerRoll(Math.floor(Math.random() * 6) + 1);
            count++;
            if (count > 10) {
                clearInterval(interval);
                const finalPlayer = Math.floor(Math.random() * 6) + 1;
                const finalComputer = Math.floor(Math.random() * 6) + 1;
                setPlayerRoll(finalPlayer);
                setComputerRoll(finalComputer);

                if (finalPlayer > finalComputer) {
                    const winAmount = betAmount * 2;
                    setBalance(prev => prev + winAmount);
                    setLastWins(prev => [{ game: 'Dice Duel', amount: winAmount }, ...prev].slice(0, 5));
                }
                setRolling(false);
            }
        }, 100);
    };

    return (
        <div className="bg-cyber-dark/50 border border-cyber-purple/30 rounded-lg p-6 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Gamepad2 className="w-6 h-6 text-cyber-green" />
                    <span className="bg-gradient-to-r from-cyber-green to-cyber-blue bg-clip-text text-transparent">
                        MINI GAMES
                    </span>
                </h2>
                <div className="bg-cyber-black border border-cyber-yellow/30 rounded-lg px-4 py-2">
                    <span className="text-sm text-cyber-yellow/60">SALDO</span>
                    <p className="text-xl font-bold text-cyber-yellow flex items-center gap-1">
                        <Coins className="w-5 h-5" />
                        {balance}
                    </p>
                </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-cyber-black/50 border border-cyber-purple/30 rounded-lg p-3 text-center">
                    <p className="text-xs text-cyber-blue/60">JOGADORES</p>
                    <p className="text-lg font-bold text-cyber-green">4.4K</p>
                </div>
                <div className="bg-cyber-black/50 border border-cyber-purple/30 rounded-lg p-3 text-center">
                    <p className="text-xs text-cyber-blue/60">JOGOS HOJE</p>
                    <p className="text-lg font-bold text-cyber-yellow">12.3K</p>
                </div>
                <div className="bg-cyber-black/50 border border-cyber-purple/30 rounded-lg p-3 text-center">
                    <p className="text-xs text-cyber-blue/60">MAIOR PRÊMIO</p>
                    <p className="text-lg font-bold text-cyber-pink">10K</p>
                </div>
            </div>

            {/* Lista de Jogos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {games.map((game) => (
                    <button
                        key={game.id}
                        onClick={() => setSelectedGame(game.id)}
                        className={`relative overflow-hidden rounded-lg border transition-all duration-300 transform hover:scale-105 ${selectedGame === game.id
                            ? `border-${game.color.split('-')[2]} bg-gradient-to-r ${game.color}/20`
                            : 'border-cyber-purple/30 bg-cyber-black/50'
                            }`}
                    >
                        <div className="p-4">
                            <div className={`p-3 rounded-lg bg-gradient-to-r ${game.color} inline-block mb-3`}>
                                <game.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-lg mb-1">{game.name}</h3>
                            <p className="text-xs text-gray-400 mb-2">{game.description}</p>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-cyber-green">x{game.multiplier}</span>
                                <span className="text-cyber-blue">{game.players} jogando</span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Jogo Selecionado */}
            {selectedGame === 'dice' && (
                <div className="border border-cyber-purple/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Dice3 className="w-5 h-5 text-cyber-blue" />
                        DICE DUEL
                    </h3>

                    {/* Área do jogo */}
                    <div className="grid grid-cols-2 gap-8 mb-6">
                        <div className="text-center">
                            <p className="text-sm text-cyber-blue mb-2">SUA SORTE</p>
                            <div className={`w-24 h-24 mx-auto rounded-lg bg-gradient-to-r from-cyber-blue to-cyber-purple p-[2px] ${rolling ? 'animate-pulse' : ''}`}>
                                <div className="w-full h-full rounded-lg bg-cyber-dark flex items-center justify-center">
                                    <span className="text-4xl font-bold">
                                        {playerRoll || '?'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-cyber-pink mb-2">COMPUTADOR</p>
                            <div className={`w-24 h-24 mx-auto rounded-lg bg-gradient-to-r from-cyber-pink to-cyber-purple p-[2px] ${rolling ? 'animate-pulse' : ''}`}>
                                <div className="w-full h-full rounded-lg bg-cyber-dark flex items-center justify-center">
                                    <span className="text-4xl font-bold">
                                        {computerRoll || '?'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controles de aposta */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-cyber-blue mb-1 block">VALOR DA APOSTA</label>
                            <div className="flex gap-2">
                                <input
                                    type="range"
                                    min={50}
                                    max={1000}
                                    value={betAmount}
                                    onChange={(e) => setBetAmount(Number(e.target.value))}
                                    className="flex-1"
                                    disabled={rolling}
                                />
                                <input
                                    type="number"
                                    value={betAmount}
                                    onChange={(e) => setBetAmount(Number(e.target.value))}
                                    className="w-24 bg-cyber-black border border-cyber-purple/30 rounded-lg px-3 py-1 text-center"
                                    disabled={rolling}
                                />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setBetAmount(prev => Math.min(prev + 50, 1000))}
                                className="flex-1 px-3 py-1 bg-cyber-purple/20 border border-cyber-purple/50 rounded text-sm"
                                disabled={rolling}
                            >
                                +50
                            </button>
                            <button
                                onClick={() => setBetAmount(prev => Math.max(prev - 50, 50))}
                                className="flex-1 px-3 py-1 bg-cyber-purple/20 border border-cyber-purple/50 rounded text-sm"
                                disabled={rolling}
                            >
                                -50
                            </button>
                            <button
                                onClick={() => setBetAmount(1000)}
                                className="flex-1 px-3 py-1 bg-cyber-purple/20 border border-cyber-purple/50 rounded text-sm"
                                disabled={rolling}
                            >
                                MAX
                            </button>
                        </div>

                        <button
                            onClick={handleDiceRoll}
                            disabled={rolling || betAmount > balance}
                            className={`w-full py-3 rounded-lg font-bold transition-all ${rolling
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-gradient-to-r from-cyber-green to-cyber-blue text-black hover:opacity-80'
                                }`}
                        >
                            {rolling ? 'ROLANDO...' : 'ROLAR DADOS'}
                        </button>
                    </div>
                </div>
            )}

            {/* Últimos ganhos */}
            {lastWins.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-sm font-bold mb-2 text-cyber-green flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        ÚLTIMOS GANHOS
                    </h3>
                    <div className="space-y-2">
                        {lastWins.map((win, index) => (
                            <div key={index} className="bg-cyber-green/10 border border-cyber-green/30 rounded-lg p-2 flex items-center justify-between">
                                <span className="text-sm">{win.game}</span>
                                <span className="text-cyber-green font-bold">+{win.amount}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}