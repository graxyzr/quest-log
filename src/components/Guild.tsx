'use client';

import { useState, useEffect } from 'react';
import {
    Users2,
    Crown,
    Sword,
    Shield,
    Trophy,
    MessageCircle,
    UserPlus,
    Calendar,
    Award,
    Target,
    Flame,
    Zap,
    Coins,
    Gem,
    Mail,
    Bell,
    Settings,
    LogOut
} from 'lucide-react';

interface GuildMember {
    id: string;
    name: string;
    level: number;
    rank: 'lider' | 'oficial' | 'veterano' | 'membro';
    class: 'guerreiro' | 'mago' | 'ladino' | 'clerigo';
    contribution: number;
    lastSeen: string;
    online: boolean;
    avatar?: string;
}

interface GuildRaid {
    id: string;
    name: string;
    description: string;
    difficulty: 'facil' | 'medio' | 'dificil' | 'epico';
    participants: number;
    maxParticipants: number;
    startTime: string;
    rewards: {
        xp: number;
        gold: number;
        gems: number;
    };
}

export default function Guild() {
    const [selectedTab, setSelectedTab] = useState('membros');
    const [members, setMembers] = useState<GuildMember[]>([
        { id: '1', name: 'DarkKnight', level: 42, rank: 'lider', class: 'guerreiro', contribution: 15234, lastSeen: 'online', online: true },
        { id: '2', name: 'WiseWizard', level: 38, rank: 'oficial', class: 'mago', contribution: 12345, lastSeen: 'online', online: true },
        { id: '3', name: 'ShadowBlade', level: 35, rank: 'oficial', class: 'ladino', contribution: 10987, lastSeen: '2h atrás', online: false },
        { id: '4', name: 'HolyHealer', level: 31, rank: 'veterano', class: 'clerigo', contribution: 8765, lastSeen: 'online', online: true },
        { id: '5', name: 'IronFist', level: 28, rank: 'membro', class: 'guerreiro', contribution: 6543, lastSeen: '5h atrás', online: false },
        { id: '6', name: 'ArcaneMind', level: 26, rank: 'membro', class: 'mago', contribution: 5432, lastSeen: 'online', online: true },
        { id: '7', name: 'SwiftWind', level: 24, rank: 'membro', class: 'ladino', contribution: 4321, lastSeen: '1d atrás', online: false },
    ]);

    const [raids, setRaids] = useState<GuildRaid[]>([
        {
            id: '1',
            name: 'CALABOUÇO SOMBRIO',
            description: 'Enfrente as criaturas das profundezas',
            difficulty: 'medio',
            participants: 3,
            maxParticipants: 5,
            startTime: '2024-01-20 20:00',
            rewards: { xp: 5000, gold: 2000, gems: 50 }
        },
        {
            id: '2',
            name: 'DRAGÃO ANCESTRAL',
            description: 'Desafio supremo contra o dragão lendário',
            difficulty: 'epico',
            participants: 8,
            maxParticipants: 10,
            startTime: '2024-01-21 21:00',
            rewards: { xp: 20000, gold: 10000, gems: 200 }
        },
    ]);

    const [chatMessages, setChatMessages] = useState([
        { id: 1, user: 'DarkKnight', message: 'Bom dia pessoal!', time: '10:30' },
        { id: 2, user: 'WiseWizard', message: 'Alguém quer fazer raid hoje?', time: '10:32' },
        { id: 3, user: 'HolyHealer', message: 'Eu vou!', time: '10:33' },
    ]);

    const [newMessage, setNewMessage] = useState('');
    const [guildLevel, setGuildLevel] = useState(5);
    const [guildXP, setGuildXP] = useState(7500);
    const [guildXPMax] = useState(10000);

    const getClassIcon = (className: string) => {
        switch (className) {
            case 'guerreiro': return <Sword className="w-4 h-4 text-cyber-red" />;
            case 'mago': return <Zap className="w-4 h-4 text-cyber-blue" />;
            case 'ladino': return <Target className="w-4 h-4 text-cyber-purple" />;
            case 'clerigo': return <Shield className="w-4 h-4 text-cyber-green" />;
            default: return null;
        }
    };

    const getRankColor = (rank: string) => {
        switch (rank) {
            case 'lider': return 'text-cyber-yellow';
            case 'oficial': return 'text-cyber-blue';
            case 'veterano': return 'text-cyber-purple';
            default: return 'text-gray-400';
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'facil': return 'text-cyber-green';
            case 'medio': return 'text-cyber-blue';
            case 'dificil': return 'text-cyber-purple';
            case 'epico': return 'text-cyber-yellow';
            default: return 'text-gray-400';
        }
    };

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        setChatMessages([...chatMessages, {
            id: chatMessages.length + 1,
            user: 'Você',
            message: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setNewMessage('');
    };

    return (
        <div className="bg-cyber-dark/50 border border-cyber-purple/30 rounded-lg p-6 backdrop-blur-sm">
            {/* Header da Guild */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-lg">
                        <Users2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <span className="bg-gradient-to-r from-cyber-purple to-cyber-pink bg-clip-text text-transparent">
                                LEGION NEGRA
                            </span>
                            <span className="text-xs bg-cyber-purple/20 px-2 py-1 rounded">LVL {guildLevel}</span>
                        </h2>
                        <p className="text-sm text-gray-400">Fundada em 15/01/2024 • 7 membros</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 bg-cyber-dark border border-cyber-purple/30 rounded-lg hover:bg-cyber-purple/20 transition-colors">
                        <Bell className="w-5 h-5 text-cyber-yellow" />
                    </button>
                    <button className="p-2 bg-cyber-dark border border-cyber-purple/30 rounded-lg hover:bg-cyber-purple/20 transition-colors">
                        <Mail className="w-5 h-5 text-cyber-blue" />
                    </button>
                    <button className="p-2 bg-cyber-dark border border-cyber-purple/30 rounded-lg hover:bg-cyber-purple/20 transition-colors">
                        <Settings className="w-5 h-5 text-cyber-purple" />
                    </button>
                </div>
            </div>

            {/* Barra de XP da Guild */}
            <div className="mb-6">
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-cyber-purple">XP DA GUILD</span>
                    <span className="text-cyber-green">{guildXP} / {guildXPMax}</span>
                </div>
                <div className="h-3 bg-cyber-black border border-cyber-purple/30 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-full transition-all duration-500"
                        style={{ width: `${(guildXP / guildXPMax) * 100}%` }}
                    />
                </div>
            </div>

            {/* Estatísticas rápidas */}
            <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="bg-cyber-black/50 border border-cyber-purple/30 rounded-lg p-3 text-center">
                    <Users2 className="w-5 h-5 text-cyber-blue mx-auto mb-1" />
                    <p className="text-xs text-cyber-blue/60">ONLINE</p>
                    <p className="text-lg font-bold text-cyber-green">{members.filter(m => m.online).length}/{members.length}</p>
                </div>
                <div className="bg-cyber-black/50 border border-cyber-purple/30 rounded-lg p-3 text-center">
                    <Trophy className="w-5 h-5 text-cyber-yellow mx-auto mb-1" />
                    <p className="text-xs text-cyber-yellow/60">RAIDS</p>
                    <p className="text-lg font-bold text-cyber-yellow">{raids.length}</p>
                </div>
                <div className="bg-cyber-black/50 border border-cyber-purple/30 rounded-lg p-3 text-center">
                    <Flame className="w-5 h-5 text-cyber-red mx-auto mb-1" />
                    <p className="text-xs text-cyber-red/60">CONTRIBUIÇÃO</p>
                    <p className="text-lg font-bold text-cyber-red">45.2K</p>
                </div>
                <div className="bg-cyber-black/50 border border-cyber-purple/30 rounded-lg p-3 text-center">
                    <Award className="w-5 h-5 text-cyber-purple mx-auto mb-1" />
                    <p className="text-xs text-cyber-purple/60">RANK</p>
                    <p className="text-lg font-bold text-cyber-purple">#42</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {['membros', 'raids', 'chat', 'contribuições'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`px-4 py-2 rounded-lg font-bold transition-all ${selectedTab === tab
                            ? 'bg-gradient-to-r from-cyber-purple to-cyber-pink text-white'
                            : 'bg-cyber-dark border border-cyber-purple/30 text-cyber-purple/60'
                            }`}
                    >
                        {tab.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Conteúdo das Tabs */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {/* Membros */}
                {selectedTab === 'membros' && (
                    <div className="space-y-2">
                        {members.map((member) => (
                            <div
                                key={member.id}
                                className="flex items-center justify-between p-3 border border-cyber-purple/30 rounded-lg hover:bg-cyber-purple/10 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${member.rank === 'lider' ? 'from-cyber-yellow to-cyber-orange' :
                                        member.rank === 'oficial' ? 'from-cyber-blue to-cyber-purple' :
                                            'from-cyber-purple to-cyber-pink'
                                        } p-[2px]`}>
                                        <div className="w-full h-full rounded-full bg-cyber-dark flex items-center justify-center">
                                            <span className="text-lg font-bold">{member.name[0]}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold">{member.name}</span>
                                            <span className={`text-xs ${getRankColor(member.rank)}`}>
                                                {member.rank.toUpperCase()}
                                            </span>
                                            {member.online && (
                                                <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            {getClassIcon(member.class)}
                                            <span>LVL {member.level}</span>
                                            <span>•</span>
                                            <span>CONTRIB: {member.contribution}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500">
                                    {member.lastSeen}
                                </div>
                            </div>
                        ))}
                        <button className="w-full mt-2 p-2 border border-cyber-purple/30 rounded-lg text-cyber-purple hover:bg-cyber-purple/20 transition-colors flex items-center justify-center gap-2">
                            <UserPlus className="w-4 h-4" />
                            CONVIDAR MEMBRO
                        </button>
                    </div>
                )}

                {/* Raids */}
                {selectedTab === 'raids' && (
                    <div className="space-y-4">
                        {raids.map((raid) => (
                            <div
                                key={raid.id}
                                className="border border-cyber-purple/30 rounded-lg p-4 hover:bg-cyber-purple/10 transition-colors"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-lg">{raid.name}</h3>
                                    <span className={`text-sm font-bold ${getDifficultyColor(raid.difficulty)}`}>
                                        {raid.difficulty.toUpperCase()}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400 mb-3">{raid.description}</p>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div className="flex items-center gap-2">
                                        <Users2 className="w-4 h-4 text-cyber-blue" />
                                        <span className="text-sm">{raid.participants}/{raid.maxParticipants} participantes</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-cyber-purple" />
                                        <span className="text-sm">{raid.startTime}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1">
                                            <Zap className="w-4 h-4 text-cyber-green" />
                                            <span className="text-xs">+{raid.rewards.xp}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Coins className="w-4 h-4 text-cyber-yellow" />
                                            <span className="text-xs">+{raid.rewards.gold}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Gem className="w-4 h-4 text-cyber-purple" />
                                            <span className="text-xs">+{raid.rewards.gems}</span>
                                        </div>
                                    </div>
                                    <button className="px-4 py-1 bg-gradient-to-r from-cyber-green to-cyber-blue text-black text-xs font-bold rounded-lg">
                                        PARTICIPAR
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Chat */}
                {selectedTab === 'chat' && (
                    <div className="space-y-4">
                        <div className="h-96 bg-cyber-black/50 border border-cyber-purple/30 rounded-lg p-4 overflow-y-auto">
                            {chatMessages.map((msg) => (
                                <div key={msg.id} className="mb-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-cyber-blue">{msg.user}</span>
                                        <span className="text-xs text-gray-600">{msg.time}</span>
                                    </div>
                                    <p className="text-sm bg-cyber-dark/50 p-2 rounded">{msg.message}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Digite sua mensagem..."
                                className="flex-1 bg-cyber-black border border-cyber-purple/30 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyber-purple"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="px-4 py-2 bg-gradient-to-r from-cyber-purple to-cyber-pink text-white rounded-lg font-bold text-sm"
                            >
                                ENVIAR
                            </button>
                        </div>
                    </div>
                )}

                {/* Contribuições */}
                {selectedTab === 'contribuições' && (
                    <div className="space-y-3">
                        <div className="bg-gradient-to-r from-cyber-yellow/10 to-transparent border border-cyber-yellow/30 rounded-lg p-4">
                            <h3 className="font-bold mb-2 flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-cyber-yellow" />
                                TOP CONTRIBUIDORES
                            </h3>
                            {members.sort((a, b) => b.contribution - a.contribution).map((member, index) => (
                                <div key={member.id} className="flex items-center justify-between py-2 border-b border-cyber-purple/20 last:border-0">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-6 text-center font-bold ${index === 0 ? 'text-cyber-yellow' :
                                            index === 1 ? 'text-cyber-blue' :
                                                index === 2 ? 'text-cyber-purple' :
                                                    'text-gray-500'
                                            }`}>#{index + 1}</span>
                                        <span>{member.name}</span>
                                    </div>
                                    <span className="text-cyber-green font-bold">{member.contribution}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Botão de sair */}
            <button className="mt-4 w-full px-4 py-2 border border-cyber-red/30 text-cyber-red rounded-lg hover:bg-cyber-red/10 transition-colors flex items-center justify-center gap-2">
                <LogOut className="w-4 h-4" />
                SAIR DA GUILD
            </button>
        </div>
    );
}