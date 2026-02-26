'use client';

import { useState, useEffect } from 'react';
import {
    Trophy,
    Star,
    Award,
    Medal,
    Crown,
    Target,
    Flame,
    Zap,
    Sword,
    Brain,
    Mic,
    Gem,
    Coins,
    Lock,
    CheckCircle,
    Gift,
    Sparkles
} from 'lucide-react';

interface Achievement {
    id: string;
    name: string;
    description: string;
    category: 'combat' | 'intellect' | 'social' | 'special';
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    progress: number;
    target: number;
    completed: boolean;
    claimed: boolean;
    rewards: {
        xp: number;
        gold: number;
        gems?: number;
        title?: string;
    };
}

export default function Achievements() {
    const [achievements, setAchievements] = useState<Achievement[]>([
        {
            id: '1',
            name: 'FORÇA BRUTA',
            description: 'Complete 100 quests de força',
            category: 'combat',
            rarity: 'rare',
            progress: 67,
            target: 100,
            completed: false,
            claimed: false,
            rewards: { xp: 1000, gold: 500, title: 'BRUTAL' }
        },
        {
            id: '2',
            name: 'GÊNIO DA LÂMPADA',
            description: 'Complete 100 quests de inteligência',
            category: 'intellect',
            rarity: 'rare',
            progress: 89,
            target: 100,
            completed: false,
            claimed: false,
            rewards: { xp: 1000, gold: 500, title: 'SÁBIO' }
        },
        {
            id: '3',
            name: 'ALMA DA FESTA',
            description: 'Complete 100 quests de carisma',
            category: 'social',
            rarity: 'rare',
            progress: 100,
            target: 100,
            completed: true,
            claimed: false,
            rewards: { xp: 1000, gold: 500, title: 'CARISMÁTICO' }
        },
        {
            id: '4',
            name: 'LENDÁRIO',
            description: 'Alcance o nível 50',
            category: 'special',
            rarity: 'legendary',
            progress: 37,
            target: 50,
            completed: false,
            claimed: false,
            rewards: { xp: 5000, gold: 2000, gems: 100, title: 'LENDÁRIO' }
        },
        {
            id: '5',
            name: 'MESTRE DOS ELEMENTOS',
            description: 'Tenha 500 em todos os atributos',
            category: 'special',
            rarity: 'legendary',
            progress: 234,
            target: 500,
            completed: false,
            claimed: false,
            rewards: { xp: 10000, gold: 5000, gems: 200, title: 'MESTRE' }
        },
        {
            id: '6',
            name: 'STREAK INFINITO',
            description: 'Mantenha 30 dias de streak',
            category: 'special',
            rarity: 'epic',
            progress: 15,
            target: 30,
            completed: false,
            claimed: false,
            rewards: { xp: 3000, gold: 1500, gems: 50 }
        },
        {
            id: '7',
            name: 'COLECIONADOR',
            description: 'Colecione 50 itens diferentes',
            category: 'special',
            rarity: 'epic',
            progress: 23,
            target: 50,
            completed: false,
            claimed: false,
            rewards: { xp: 2000, gold: 1000, title: 'COLECIONADOR' }
        }
    ]);

    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [showClaimAnimation, setShowClaimAnimation] = useState<string | null>(null);
    const [totalAchievementPoints, setTotalAchievementPoints] = useState(0);

    useEffect(() => {
        // Calcular pontos totais
        const points = achievements.reduce((acc, ach) =>
            ach.completed ? acc + ach.rewards.xp : acc, 0
        );
        setTotalAchievementPoints(points);
    }, [achievements]);

    const claimAchievement = (id: string) => {
        setAchievements(prev => prev.map(ach =>
            ach.id === id && ach.completed && !ach.claimed
                ? { ...ach, claimed: true }
                : ach
        ));
        setShowClaimAnimation(id);
        setTimeout(() => setShowClaimAnimation(null), 2000);
    };

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'text-gray-400 border-gray-500';
            case 'rare': return 'text-blue-400 border-blue-500';
            case 'epic': return 'text-purple-400 border-purple-500';
            case 'legendary': return 'text-yellow-400 border-yellow-500';
            default: return 'text-gray-400';
        }
    };

    const getRarityBg = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'from-gray-500/10 to-transparent';
            case 'rare': return 'from-blue-500/10 to-transparent';
            case 'epic': return 'from-purple-500/10 to-transparent';
            case 'legendary': return 'from-yellow-500/10 to-transparent';
            default: return 'from-gray-500/10 to-transparent';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'combat': return <Sword className="w-4 h-4" />;
            case 'intellect': return <Brain className="w-4 h-4" />;
            case 'social': return <Mic className="w-4 h-4" />;
            default: return <Trophy className="w-4 h-4" />;
        }
    };

    return (
        <div className="bg-cyber-dark/50 border border-cyber-purple/30 rounded-lg p-6 backdrop-blur-sm">
            {/* Header com pontos totais */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-cyber-yellow" />
                    <span className="bg-gradient-to-r from-cyber-yellow to-cyber-pink bg-clip-text text-transparent">
                        ACHIEVEMENTS
                    </span>
                </h2>
                <div className="bg-cyber-black border border-cyber-yellow/30 rounded-lg px-4 py-2">
                    <span className="text-sm text-cyber-yellow/60">PONTOS</span>
                    <p className="text-xl font-bold text-cyber-yellow">{totalAchievementPoints}</p>
                </div>
            </div>

            {/* Estatísticas rápidas */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-cyber-black/50 border border-cyber-purple/30 rounded-lg p-3 text-center">
                    <p className="text-xs text-cyber-blue/60">COMPLETOS</p>
                    <p className="text-xl font-bold text-cyber-green">
                        {achievements.filter(a => a.completed).length}
                    </p>
                </div>
                <div className="bg-cyber-black/50 border border-cyber-purple/30 rounded-lg p-3 text-center">
                    <p className="text-xs text-cyber-blue/60">EM PROGRESSO</p>
                    <p className="text-xl font-bold text-cyber-yellow">
                        {achievements.filter(a => !a.completed).length}
                    </p>
                </div>
                <div className="bg-cyber-black/50 border border-cyber-purple/30 rounded-lg p-3 text-center">
                    <p className="text-xs text-cyber-blue/60">NÃO RECEBIDOS</p>
                    <p className="text-xl font-bold text-cyber-pink">
                        {achievements.filter(a => a.completed && !a.claimed).length}
                    </p>
                </div>
            </div>

            {/* Filtros por categoria */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {['all', 'combat', 'intellect', 'social', 'special'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${selectedCategory === cat
                            ? 'bg-cyber-purple text-white'
                            : 'bg-cyber-dark border border-cyber-purple/30 text-cyber-purple/60'
                            }`}
                    >
                        {getCategoryIcon(cat)}
                        {cat.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Lista de achievements */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {achievements
                    .filter(ach => selectedCategory === 'all' || ach.category === selectedCategory)
                    .map((achievement) => {
                        const progressPercent = (achievement.progress / achievement.target) * 100;
                        const rarityColor = getRarityColor(achievement.rarity);
                        const rarityBg = getRarityBg(achievement.rarity);

                        return (
                            <div
                                key={achievement.id}
                                className={`
                  relative overflow-hidden rounded-lg border p-4 transition-all duration-500
                  ${achievement.completed
                                        ? `border-${rarityColor.split(' ')[0]} bg-gradient-to-r ${rarityBg}`
                                        : 'border-cyber-purple/30 bg-cyber-black/50'
                                    }
                  hover:scale-105 cursor-pointer
                `}
                            >
                                {/* Animação de claim */}
                                {showClaimAnimation === achievement.id && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-cyber-green/20 backdrop-blur-sm z-10 animate-pulse">
                                        <div className="text-2xl font-bold text-cyber-green flex items-center gap-2">
                                            <Gift className="w-8 h-8" />
                                            RECEBIDO!
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start gap-3">
                                    {/* Ícone com raridade */}
                                    <div className={`
                    p-3 rounded-lg border
                    ${rarityColor}
                  `}>
                                        {achievement.rarity === 'legendary' ? <Crown className="w-8 h-8" /> :
                                            achievement.rarity === 'epic' ? <Award className="w-8 h-8" /> :
                                                achievement.rarity === 'rare' ? <Medal className="w-8 h-8" /> :
                                                    <Star className="w-8 h-8" />}
                                    </div>

                                    <div className="flex-1">
                                        {/* Header com título e raridade */}
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="font-bold text-lg">{achievement.name}</h3>
                                            <span className={`
                        text-xs px-2 py-1 rounded
                        ${achievement.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    achievement.rarity === 'epic' ? 'bg-purple-500/20 text-purple-400' :
                                                        achievement.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                                                            'bg-gray-500/20 text-gray-400'}
                      `}>
                                                {achievement.rarity.toUpperCase()}
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-400 mb-3">{achievement.description}</p>

                                        {/* Barra de progresso */}
                                        <div className="mb-3">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-cyber-blue/60">PROGRESSO</span>
                                                <span className="text-cyber-green">{achievement.progress}/{achievement.target}</span>
                                            </div>
                                            <div className="h-2 bg-cyber-black rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${achievement.completed
                                                        ? 'bg-gradient-to-r from-cyber-green to-cyber-blue'
                                                        : 'bg-gradient-to-r from-cyber-yellow to-cyber-pink'
                                                        }`}
                                                    style={{ width: `${progressPercent}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Recompensas e ações */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1">
                                                    <Zap className="w-4 h-4 text-cyber-green" />
                                                    <span className="text-sm text-cyber-green">+{achievement.rewards.xp}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Coins className="w-4 h-4 text-cyber-yellow" />
                                                    <span className="text-sm text-cyber-yellow">+{achievement.rewards.gold}</span>
                                                </div>
                                                {achievement.rewards.gems && (
                                                    <div className="flex items-center gap-1">
                                                        <Gem className="w-4 h-4 text-cyber-purple" />
                                                        <span className="text-sm text-cyber-purple">+{achievement.rewards.gems}</span>
                                                    </div>
                                                )}
                                                {achievement.rewards.title && (
                                                    <div className="flex items-center gap-1 bg-cyber-purple/20 px-2 py-1 rounded">
                                                        <Crown className="w-3 h-3 text-cyber-yellow" />
                                                        <span className="text-xs text-cyber-yellow">{achievement.rewards.title}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {achievement.completed && !achievement.claimed ? (
                                                <button
                                                    onClick={() => claimAchievement(achievement.id)}
                                                    className="px-4 py-2 bg-gradient-to-r from-cyber-green to-cyber-blue text-black text-sm font-bold rounded-lg hover:opacity-80 transition-opacity flex items-center gap-2"
                                                >
                                                    <Gift className="w-4 h-4" />
                                                    RECEBER
                                                </button>
                                            ) : achievement.claimed ? (
                                                <div className="flex items-center gap-1 text-cyber-green">
                                                    <CheckCircle className="w-5 h-5" />
                                                    <span className="text-sm">RECEBIDO</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1 text-gray-600">
                                                    <Lock className="w-5 h-5" />
                                                    <span className="text-sm">BLOQUEADO</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>

            {/* Achievement especial escondido */}
            <div className="mt-6 p-4 bg-gradient-to-r from-cyber-purple/20 to-transparent border border-cyber-purple/30 rounded-lg">
                <div className="flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-cyber-pink animate-pulse" />
                    <div>
                        <h3 className="font-bold text-lg">ACHIEVEMENT SECRETO</h3>
                        <p className="text-sm text-gray-400">Continue jogando para descobrir achievements escondidos...</p>
                        <div className="mt-2 flex gap-2">
                            <div className="w-2 h-2 bg-cyber-purple rounded-full animate-pulse" />
                            <div className="w-2 h-2 bg-cyber-pink rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                            <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}