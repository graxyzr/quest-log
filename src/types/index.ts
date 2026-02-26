export interface Quest {
    id: string;
    title: string;
    description: string;
    xpReward: number;
    attribute: 'strength' | 'intelligence' | 'charisma';
    icon: string;
    completed: boolean;
    claimed: boolean;
}

export interface CharacterStats {
    level: number;
    xp: number;
    xpToNextLevel: number;
    strength: number;
    intelligence: number;
    charisma: number;
    rank: string;
}