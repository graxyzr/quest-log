'use client';

import { useState, useEffect } from 'react';
import {
    ScrollText,
    Gift,
    Crown,
    Star,
    Zap,
    Coins,
    Gem,
    Sword,
    Shield,
    Lock,
    Check,
    Trophy,
    Sparkles
} from 'lucide-react';

interface Tier {
    level: number;
    xpRequired: number;
    rewards: {
        free: { type: string; value: number; icon?: any }[];
        premium: { type: string; value: number; icon?: any }[];
    };
    claimed: {
        free: boolean;
        premium: boolean;
    };
}

export default function BattlePass() {
    const [currentXP, setCurrentXP] = useState(750);
    const [currentLevel, setCurrentLevel] = useState(5);
    const [hasPremium, setHasPremium] = useState(true);
    const [selectedTier, setSelectedTier] = useState<number | null>(null);

    const tiers: Tier[] = Array.from({ length: 20 }, (_, i) => ({
        level: i + 1,
        xpRequired: (i + 1) * 100,
        rewards: {
            free: [
                { type: 'xp', value: 100, icon: Zap },
                { type: 'gold', value: 500, icon: Coins },
            ],
            premium: [
                { type: 'gems', value: 50, icon: Gem },
                { type: 'skin', value: 1, icon: Crown },
            ],
        },
        claimed: {
            free: i < currentLevel,
            premium: i < currentLevel && hasPremium,
        },
    }));

    const totalXP = 2000;
    const progress = (currentXP / totalXP) * 100;

    const getRewardIcon = (type: string) => {
        switch (type) {
            case 'xp': return <Zap className="w-4 h-4 text-cyber-green" />;
            case 'gold': return <Coins className="w-4 h-4 text-cyber-yellow" />;
            case 'gems': return <Gem className="w-4 h-4 text-cyber-purple" />;
            case 'skin': return <Crown className="w-4 h-4 text-cyber-pink" />;
            default: return <Gift className="w-4 h-4" />;
        }
    };

    return (
        <div className="bg-cyber-dark/50 border border-cyber-purple/30 rounded-lg p-6 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <ScrollText className="w-6 h-6 text-cyber-yellow" />
                    <span className="bg-gradient-to-r from-cyber-yellow to-cyber-pink bg-clip-text text-transparent">
                        BATTLE PASS
                    </span>
                </h2>
                {!hasPremium ? (
                    <button className="px-4 py-2 bg-gradient-to-r from-cyber-yellow to-cyber-pink text-black rounded-lg font-bold flex items-center gap-2">
                        <Crown className="w-4 h-4" />
                        COMPRAR PREMIUM
                    </button>
                ) : (
                    <span className="px-4 py-2 bg-gradient-to-r from-cyber-yellow to-cyber-pink text-black rounded-lg font-bold flex items-center gap-2">
                        <Crown className="w-4 h-4" />
                        PREMIUM ATIVO
                    </span>
                )}
            </div>

            {/* Progresso geral */}
            <div className="mb-6">
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-cyber-blue">NÍVEL {currentLevel}/20</span>
                    <span className="text-cyber-green">{currentXP} / {totalXP} XP</span>
                </div>
                <div className="h-4 bg-cyber-black border border-cyber-purple/30 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-cyber-yellow to-cyber-pink rounded-full transition-all duration-500 relative"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Grid de tiers */}
            <div className="grid grid-cols-5 gap-2 max-h-[500px] overflow-y-auto p-2">
                {tiers.map((tier) => {
                    const isUnlocked = tier.level <= currentLevel;
                    const isCurrent = tier.level === currentLevel + 1;

                    return (
                        <div
                            key={tier.level}
                            onClick={() => setSelectedTier(tier.level)}
                            className={`
                relative border rounded-lg p-3 transition-all cursor-pointer
                ${isUnlocked ? 'border-cyber-yellow bg-gradient-to-b from-cyber-yellow/10 to-transparent' : 'border-cyber-purple/30 bg-cyber-black/50'}
                ${isCurrent ? 'animate-pulse scale-105' : ''}
                hover:scale-105
              `}
                        >
                            {/* Nível */}
                            <div className="text-center mb-2">
                                <span className={`text-sm font-bold ${isUnlocked ? 'text-cyber-yellow' : 'text-gray-600'}`}>
                                    NÍVEL {tier.level}
                                </span>
                            </div>

                            {/* Recompensas Free */}
                            <div className="space-y-1 mb-2">
                                {tier.rewards.free.map((reward, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-1">
                                            {getRewardIcon(reward.type)}
                                            <span className="text-gray-400">FREE</span>
                                        </div>
                                        <span className={`
                      ${reward.type === 'xp' ? 'text-cyber-green' : ''}
                      ${reward.type === 'gold' ? 'text-cyber-yellow' : ''}
                    `}>
                                            +{reward.value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Recompensas Premium */}
                            <div className="space-y-1 pt-1 border-t border-cyber-purple/30">
                                {tier.rewards.premium.map((reward, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-1">
                                            {getRewardIcon(reward.type)}
                                            <span className="text-cyber-pink">PREMIUM</span>
                                        </div>
                                        <span className="text-cyber-purple">+{reward.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Status */}
                            <div className="absolute top-1 right-1">
                                {tier.claimed.free && tier.claimed.premium ? (
                                    <Check className="w-4 h-4 text-cyber-green" />
                                ) : tier.claimed.free ? (
                                    <span className="text-xs text-cyber-blue">FREE</span>
                                ) : !isUnlocked ? (
                                    <Lock className="w-4 h-4 text-gray-600" />
                                ) : null}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tier selecionado */}
            {selectedTier && (
                <div className="mt-6 p-4 border border-cyber-purple/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg">NÍVEL {selectedTier}</h3>
                        <button onClick={() => setSelectedTier(null)} className="text-gray-500 hover:text-white">
                            ✕
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-cyber-black/50 border border-cyber-purple/30 rounded-lg p-3">
                            <h4 className="text-sm font-bold text-cyber-blue mb-2">RECOMPENSAS FREE</h4>
                            <div className="space-y-2">
                                {tiers[selectedTier - 1].rewards.free.map((reward, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {getRewardIcon(reward.type)}
                                            <span className="text-sm">{reward.type.toUpperCase()}</span>
                                        </div>
                                        <span className="text-cyber-green font-bold">+{reward.value}</span>
                                    </div>
                                ))}
                                <button
                                    disabled={selectedTier > currentLevel || tiers[selectedTier - 1].claimed.free}
                                    className={`w-full mt-2 px-3 py-1 rounded text-xs font-bold ${selectedTier <= currentLevel && !tiers[selectedTier - 1].claimed.free
                                        ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-black'
                                        : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                                        }`}
                                >
                                    {tiers[selectedTier - 1].claimed.free ? 'RECEBIDO' : 'RECEBER'}
                                </button>
                            </div>
                        </div>

                        <div className="bg-cyber-black/50 border border-cyber-purple/30 rounded-lg p-3">
                            <h4 className="text-sm font-bold text-cyber-pink mb-2">RECOMPENSAS PREMIUM</h4>
                            <div className="space-y-2">
                                {tiers[selectedTier - 1].rewards.premium.map((reward, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {getRewardIcon(reward.type)}
                                            <span className="text-sm">{reward.type.toUpperCase()}</span>
                                        </div>
                                        <span className="text-cyber-purple font-bold">+{reward.value}</span>
                                    </div>
                                ))}
                                {hasPremium ? (
                                    <button
                                        disabled={selectedTier > currentLevel || tiers[selectedTier - 1].claimed.premium}
                                        className={`w-full mt-2 px-3 py-1 rounded text-xs font-bold ${selectedTier <= currentLevel && !tiers[selectedTier - 1].claimed.premium
                                            ? 'bg-gradient-to-r from-cyber-pink to-cyber-purple text-black'
                                            : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                                            }`}
                                    >
                                        {tiers[selectedTier - 1].claimed.premium ? 'RECEBIDO' : 'RECEBER'}
                                    </button>
                                ) : (
                                    <div className="text-center text-xs text-gray-500 mt-2">
                                        Disponível apenas no Premium
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Benefícios Premium */}
            <div className="mt-6 p-4 bg-gradient-to-r from-cyber-pink/10 to-transparent border border-cyber-pink/30 rounded-lg">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyber-pink" />
                    BENEFÍCIOS PREMIUM
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-cyber-yellow" />
                        <span>Recompensas exclusivas</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-cyber-green" />
                        <span>+20% XP em todas quests</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Gem className="w-4 h-4 text-cyber-purple" />
                        <span>50 GEMS por nível</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-cyber-blue" />
                        <span>Título exclusivo</span>
                    </div>
                </div>
            </div>
        </div>
    );
}