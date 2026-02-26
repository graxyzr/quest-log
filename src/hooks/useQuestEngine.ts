'use client';

import { useState, useEffect, useCallback } from 'react';
import { Quest, CharacterStats } from '@/src/types';

const RANKS = [
    'NOVATO',
    'APRENDIZ',
    'GUERREIRO',
    'ELITE',
    'MESTRE',
    'LENDÁRIO'
];

const INITIAL_QUESTS: Quest[] = [
    {
        id: '1',
        title: 'TREINO PESADO',
        description: 'Complete seu treino diário',
        xpReward: 150,
        attribute: 'strength',
        icon: 'Dumbbell',
        completed: false,
        claimed: false,
        difficulty: 'medium',
        timeLimit: 60
    },
    {
        id: '2',
        title: 'MODO FOCUS',
        description: '2 horas de estudo/coding',
        xpReward: 200,
        attribute: 'intelligence',
        icon: 'Brain',
        completed: false,
        claimed: false,
        difficulty: 'hard',
        timeLimit: 120
    },
    {
        id: '3',
        title: 'NEXUS SOCIAL',
        description: 'Assista um filme ou saia com amigos',
        xpReward: 100,
        attribute: 'charisma',
        icon: 'Users',
        completed: false,
        claimed: false,
        difficulty: 'easy',
        timeLimit: 30
    }
];

export function useQuestEngine() {
    const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
    const [character, setCharacter] = useState<CharacterStats>({
        level: 1,
        xp: 0,
        xpToNextLevel: 150,
        strength: 0,
        intelligence: 0,
        charisma: 0,
        rank: RANKS[0],
        gold: 0,
        gems: 0
    });

    // Load data from localStorage
    useEffect(() => {
        const savedData = localStorage.getItem('quest-log-data');
        if (savedData) {
            try {
                const { quests: savedQuests, character: savedCharacter } = JSON.parse(savedData);
                setQuests(savedQuests);
                setCharacter(savedCharacter);
            } catch (error) {
                console.error('Error loading saved data:', error);
            }
        }
    }, []);

    // Save data to localStorage
    useEffect(() => {
        localStorage.setItem('quest-log-data', JSON.stringify({ quests, character }));
    }, [quests, character]);

    const calculateXpForNextLevel = useCallback((level: number): number => {
        return Math.floor(level * 100 * 1.5);
    }, []);

    const handleLevelUp = useCallback((currentXp: number, currentLevel: number) => {
        let newLevel = currentLevel;
        let remainingXp = currentXp;
        let xpForNext = calculateXpForNextLevel(newLevel);

        while (remainingXp >= xpForNext) {
            remainingXp -= xpForNext;
            newLevel++;
            xpForNext = calculateXpForNextLevel(newLevel);
        }

        const newRank = RANKS[Math.min(Math.floor(newLevel / 10), RANKS.length - 1)];

        return {
            level: newLevel,
            xp: remainingXp,
            xpToNextLevel: xpForNext,
            rank: newRank
        };
    }, [calculateXpForNextLevel]);

    const claimQuest = useCallback((questId: string) => {
        let leveledUp = false;
        let bonusGold = 0;

        setQuests(prev => prev.map(quest => {
            if (quest.id === questId && quest.completed && !quest.claimed) {
                // Bônus aleatório de gold
                bonusGold = Math.floor(Math.random() * 50) + 20;

                setCharacter(prevChar => {
                    const newXp = prevChar.xp + quest.xpReward;
                    const levelUpResult = handleLevelUp(newXp, prevChar.level);

                    if (levelUpResult.level > prevChar.level) {
                        leveledUp = true;
                    }

                    return {
                        ...prevChar,
                        ...levelUpResult,
                        gold: prevChar.gold + bonusGold,
                        strength: prevChar.strength + (quest.attribute === 'strength' ? 10 : 0),
                        intelligence: prevChar.intelligence + (quest.attribute === 'intelligence' ? 10 : 0),
                        charisma: prevChar.charisma + (quest.attribute === 'charisma' ? 10 : 0),
                    };
                });

                return { ...quest, claimed: true };
            }
            return quest;
        }));

        return { leveledUp, bonusGold };
    }, [handleLevelUp]);

    const completeQuest = useCallback((questId: string) => {
        setQuests(prev => prev.map(quest =>
            quest.id === questId && !quest.completed
                ? { ...quest, completed: true }
                : quest
        ));
    }, []);

    const resetDailyQuests = useCallback(() => {
        setQuests(INITIAL_QUESTS.map(quest => ({
            ...quest,
            completed: false,
            claimed: false
        })));
    }, []);

    return {
        quests,
        character,
        setCharacter,
        claimQuest,
        completeQuest,
        resetDailyQuests
    };
}