export interface Quest {
    id: string;
    title: string;
    description: string;
    xpReward: number;
    attribute: 'strength' | 'intelligence' | 'charisma';
    icon: string;
    completed: boolean;
    claimed: boolean;
    difficulty: 'easy' | 'medium' | 'hard';
    timeLimit?: number;
}

export interface CharacterStats {
    level: number;
    xp: number;
    xpToNextLevel: number;
    strength: number;
    intelligence: number;
    charisma: number;
    rank: string;
    gold: number;
    gems: number;
}

export interface InventoryItem {
    id: string;
    name: string;
    description: string;
    type: 'consumable' | 'equipment' | 'boost' | 'key';
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    icon: string;
    quantity: number;
    effect: {
        type: 'xp_boost' | 'attribute_boost' | 'instant_reward';
        value: number;
        duration?: number;
    };
}

export interface ShopItem {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: 'gold' | 'gems';
    type: 'consumable' | 'boost' | 'cosmetic';
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    icon: string;
    effect: {
        type: 'xp_boost' | 'attribute_boost' | 'instant_reward';
        value: number;
        duration?: number;
    };
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    xpReward: number;
    goldReward: number;
    icon: string;
    condition: {
        type: 'quests_completed' | 'level_reached' | 'streak_days' | 'attribute_level';
        target: number;
        attribute?: string;
    };
    progress: number;
    completed: boolean;
    claimed: boolean;
}

export interface BattlePassTier {
    tier: number;
    xpRequired: number;
    rewards: {
        type: 'xp' | 'gold' | 'gems' | 'item' | 'cosmetic';
        value: number;
        itemId?: string;
    }[];
    claimed: boolean;
}

export interface GuildMember {
    id: string;
    name: string;
    level: number;
    rank: string;
    contribution: number;
    online: boolean;
}