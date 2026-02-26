export const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
};

export const calculateLevelProgress = (xp: number, level: number): number => {
    const xpForNextLevel = Math.floor(level * 100 * 1.5);
    return (xp / xpForNextLevel) * 100;
};

export const getRandomReward = (): { xp: number; gold: number } => {
    return {
        xp: Math.floor(Math.random() * 50) + 10,
        gold: Math.floor(Math.random() * 100) + 20
    };
};

export const getRarityColor = (rarity: string): string => {
    switch (rarity) {
        case 'common': return 'text-gray-400';
        case 'rare': return 'text-blue-400';
        case 'epic': return 'text-purple-400';
        case 'legendary': return 'text-yellow-400';
        default: return 'text-gray-400';
    }
};