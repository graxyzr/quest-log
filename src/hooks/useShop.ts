'use client';

import { useState, useEffect } from 'react';
import { ShopItem } from '@/src/types';

const SHOP_ITEMS: ShopItem[] = [
    {
        id: 's1',
        name: 'POÇÃO DE XP PEQUENA',
        description: 'Ganha 50 XP instantaneamente',
        price: 100,
        currency: 'gold',
        type: 'consumable',
        rarity: 'common',
        icon: 'FlaskConical',
        effect: { type: 'instant_reward', value: 50 }
    },
    {
        id: 's2',
        name: 'POÇÃO DE XP GRANDE',
        description: 'Ganha 200 XP instantaneamente',
        price: 50,
        currency: 'gems',
        type: 'consumable',
        rarity: 'rare',
        icon: 'FlaskRound',
        effect: { type: 'instant_reward', value: 200 }
    },
    {
        id: 's3',
        name: 'BOOST DE XP 2x',
        description: 'Dobra o XP ganho por 1 hora',
        price: 200,
        currency: 'gems',
        type: 'boost',
        rarity: 'epic',
        icon: 'Zap',
        effect: { type: 'xp_boost', value: 100, duration: 60 }
    },
    {
        id: 's4',
        name: 'LIVRO DE SABEDORIA',
        description: '+50 de Inteligência permanente',
        price: 500,
        currency: 'gems',
        type: 'consumable',
        rarity: 'legendary',
        icon: 'BookOpen',
        effect: { type: 'attribute_boost', value: 50 }
    }
];

export function useShop() {
    const [shopItems, setShopItems] = useState<ShopItem[]>(SHOP_ITEMS);
    const [dailyDeals, setDailyDeals] = useState<ShopItem[]>([]);

    useEffect(() => {
        // Seleciona 3 itens aleatórios para ofertas do dia
        const shuffled = [...SHOP_ITEMS].sort(() => 0.5 - Math.random());
        setDailyDeals(shuffled.slice(0, 3).map(item => ({
            ...item,
            price: Math.floor(item.price * 0.7) // 30% de desconto
        })));
    }, []);

    const buyItem = (itemId: string, character: any, setCharacter: any) => {
        const item = shopItems.find(i => i.id === itemId) || dailyDeals.find(i => i.id === itemId);
        if (!item) return false;

        const currency = item.currency === 'gold' ? character.gold : character.gems;
        if (currency < item.price) return false;

        setCharacter((prev: any) => ({
            ...prev,
            [item.currency === 'gold' ? 'gold' : 'gems']: prev[item.currency === 'gold' ? 'gold' : 'gems'] - item.price
        }));

        return true;
    };

    return {
        shopItems,
        dailyDeals,
        buyItem
    };
}