'use client';

import { useEffect, useRef } from 'react';
import { useQuestEngine } from '@/src/hooks/useQuestEngine';
import {
  Cpu,
  Bot,
  Sword,
  Brain,
  Mic,
  ListTodo,
  Dumbbell,
  Users,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Home() {
  const { quests, character, claimQuest, completeQuest } = useQuestEngine();
  const prevLevelRef = useRef(character.level);

  const xpPercentage = (character.xp / character.xpToNextLevel) * 100;

  useEffect(() => {
    if (character.level > prevLevelRef.current) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8a2be2', '#00ffff', '#ff00ff', '#00ff9d']
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#8a2be2', '#00ffff']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff00ff', '#00ff9d']
        });
      }, 200);
    }
    prevLevelRef.current = character.level;
  }, [character.level]);

  const handleClaimXP = (questId: string) => {
    claimQuest(questId);
  };

  const getAttributeIcon = (attribute: string) => {
    switch (attribute) {
      case 'strength': return <Sword className="w-5 h-5 text-cyber-red" />;
      case 'intelligence': return <Brain className="w-5 h-5 text-cyber-blue" />;
      case 'charisma': return <Mic className="w-5 h-5 text-cyber-pink" />;
      default: return null;
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Dumbbell: Dumbbell,
      Brain: Brain,
      Users: Users,
    };
    return icons[iconName] || HelpCircle;
  };

  return (
    <main className="min-h-screen bg-cyber-black text-white font-mono">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyber-purple/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h60v60H0z\' fill=\'none\'/%3E%3Cpath d=\'M30 0v60M0 30h60\' stroke=\'%238a2be2\' stroke-width=\'0.5\' opacity=\'0.1\'/%3E%3C/svg%3E')] pointer-events-none" />

      <div className="container mx-auto p-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <h1 className="text-6xl font-black tracking-tighter mb-2 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink animate-pulse-neon">
              QUEST-LOG
            </span>
            <span className="absolute -inset-1 bg-cyber-blue/20 blur-2xl -z-10" />
          </h1>
          <p className="text-cyber-blue/60 text-sm tracking-[0.3em]">SYSTEM v.1.0.4 // NEURAL INTERFACE ACTIVE</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Character Dashboard */}
          <div className="lg:col-span-1">
            <div className="bg-cyber-dark/50 border border-cyber-purple/30 rounded-lg p-6 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/10 via-transparent to-cyber-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-cyber-blue animate-pulse" />
                  <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                    NEURAL LINK
                  </span>
                </h2>

                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyber-purple to-cyber-blue p-[2px] animate-pulse-neon">
                      <div className="w-full h-full rounded-full bg-cyber-dark flex items-center justify-center">
                        <Bot className="w-12 h-12 text-cyber-blue" />
                      </div>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-cyber-black border border-cyber-purple px-3 py-1 rounded-full">
                      <span className="text-xs font-bold text-cyber-blue">LVL {character.level}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <span className="text-sm text-cyber-blue/60">RANK</span>
                  <div className="text-2xl font-black tracking-wider text-cyber-pink animate-glitch">
                    {character.rank}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-cyber-blue">XP</span>
                    <span className="text-cyber-green">{character.xp} / {character.xpToNextLevel}</span>
                  </div>
                  <div className="h-3 bg-cyber-black border border-cyber-purple/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full transition-all duration-500 ease-out relative"
                      style={{ width: `${xpPercentage}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 border border-cyber-red/30 rounded group hover:border-cyber-red/60 transition-colors">
                    <div className="flex items-center gap-2">
                      <Sword className="w-4 h-4 text-cyber-red" />
                      <span className="text-sm">FORÇA</span>
                    </div>
                    <span className="text-cyber-red font-bold">{character.strength}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 border border-cyber-blue/30 rounded group hover:border-cyber-blue/60 transition-colors">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-cyber-blue" />
                      <span className="text-sm">INTEL.</span>
                    </div>
                    <span className="text-cyber-blue font-bold">{character.intelligence}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 border border-cyber-pink/30 rounded group hover:border-cyber-pink/60 transition-colors">
                    <div className="flex items-center gap-2">
                      <Mic className="w-4 h-4 text-cyber-pink" />
                      <span className="text-sm">CARISMA</span>
                    </div>
                    <span className="text-cyber-pink font-bold">{character.charisma}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Quests */}
          <div className="lg:col-span-3">
            <div className="bg-cyber-dark/50 border border-cyber-purple/30 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ListTodo className="w-6 h-6 text-cyber-green" />
                <span className="bg-gradient-to-r from-cyber-green to-cyber-blue bg-clip-text text-transparent">
                  DAILY QUESTS // ONLINE
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quests.map((quest) => {
                  const IconComponent = getIconComponent(quest.icon);

                  return (
                    <div
                      key={quest.id}
                      className={`
                        relative group overflow-hidden rounded-lg border transition-all duration-300
                        ${quest.completed
                          ? 'border-cyber-green/50 bg-cyber-green/5'
                          : 'border-cyber-purple/30 bg-cyber-black/50 hover:border-cyber-purple/60'
                        }
                      `}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/10 via-transparent to-cyber-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="p-4 relative">
                        <div className="flex justify-between items-start mb-3">
                          <div className={`
                            p-2 rounded border 
                            ${quest.attribute === 'strength' ? 'border-cyber-red text-cyber-red' : ''}
                            ${quest.attribute === 'intelligence' ? 'border-cyber-blue text-cyber-blue' : ''}
                            ${quest.attribute === 'charisma' ? 'border-cyber-pink text-cyber-pink' : ''}
                          `}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div className="flex items-center gap-1">
                            {getAttributeIcon(quest.attribute)}
                            <span className="text-xs font-bold text-cyber-green">+{quest.xpReward} XP</span>
                          </div>
                        </div>

                        <h3 className="font-bold mb-1 text-lg">{quest.title}</h3>
                        <p className="text-sm text-gray-400 mb-4">{quest.description}</p>

                        <div className="flex gap-2">
                          <button
                            onClick={() => completeQuest(quest.id)}
                            disabled={quest.completed}
                            className={`
                              flex-1 px-3 py-2 rounded text-xs font-bold transition-all duration-300
                              ${quest.completed
                                ? 'bg-cyber-green/20 text-cyber-green/50 cursor-not-allowed'
                                : 'bg-cyber-purple/20 text-cyber-purple hover:bg-cyber-purple/30 border border-cyber-purple/50'
                              }
                            `}
                          >
                            {quest.completed ? 'COMPLETED' : 'COMPLETE'}
                          </button>

                          <button
                            onClick={() => handleClaimXP(quest.id)}
                            disabled={!quest.completed || quest.claimed}
                            className={`
                              px-3 py-2 rounded text-xs font-bold transition-all duration-300 relative overflow-hidden
                              ${quest.claimed
                                ? 'bg-cyber-green/20 text-cyber-green/50 cursor-not-allowed'
                                : quest.completed
                                  ? 'bg-gradient-to-r from-cyber-green to-cyber-blue text-black hover:shadow-lg hover:shadow-cyber-green/20'
                                  : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                              }
                            `}
                          >
                            {quest.claimed ? 'CLAIMED' : 'CLAIM XP'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-dark/30 border border-cyber-purple/30 rounded-full">
            <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
            <span className="text-xs text-cyber-green/60">SYSTEM ONLINE // READY FOR QUESTS</span>
          </div>
        </div>
      </div>
    </main>
  );
}