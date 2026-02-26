export const RANKS = [
    'NOVATO',
    'APRENDIZ',
    'GUERREIRO',
    'ELITE',
    'MESTRE',
    'LENDÁRIO'
];

export const ATTRIBUTE_COLORS = {
    strength: 'cyber-red',
    intelligence: 'cyber-blue',
    charisma: 'cyber-pink'
};

export const QUEST_DIFFICULTY = {
    easy: { xp: 100, time: 30 },
    medium: { xp: 200, time: 60 },
    hard: { xp: 400, time: 120 }
};

export const ACHIEVEMENTS = [
    {
        id: 'first_quest',
        name: 'Primeiros Passos',
        description: 'Complete sua primeira quest',
        xp: 100,
        gold: 200
    },
    {
        id: 'streak_7',
        name: 'Força de Vontade',
        description: 'Mantenha 7 dias de streak',
        xp: 500,
        gold: 1000
    }
];