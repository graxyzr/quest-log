'use client';

import { useState, useEffect } from 'react';
import { InventoryItem } from '@/src/types';

const INITIAL_INVENTORY: InventoryItem[] = [
    {
        id: '1',
        name: 'POÇÃO DE XP',
        description: 'Ganha 50 XP instantaneamente',
        type: 'consumable',
        rarity: 'common',
        icon: 'FlaskConical',
        quantity: 2,
        effect: { type: 'instant_reward', value: 50 }
    },
    {
        id: '2',
        name: 'AMULETO DA SORTE',
        description: '+20% de chance de XP dobrado por 1 hora',
        type: 'boost',
        rarity: 'rare',
        icon: 'Gem',
        quantity: 1,
        effect: { type: 'xp_boost', value: 20, duration: 60 }
    },
    {
        id: '3',
        name: 'ELIXIR DE FORÇA',
        description: '+30 de Força por 30 minutos',
        type: 'boost',
        rarity: 'epic',
        icon: 'FlaskRound',
        quantity: 1,
        effect: { type: 'attribute_boost', value: 30, duration: 30 }
    }
];

export function useInventory() {
    const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
    const [activeBoosts, setActiveBoosts] = useState<InventoryItem[]>([]);

    useEffect(() => {
        const savedInventory = localStorage.getItem('inventory');
        if (savedInventory) {
            setInventory(JSON.parse(savedInventory));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('inventory', JSON.stringify(inventory));
    }, [inventory]);

    const useItem = (itemId: string) => {
        setInventory(prev => {
            const item = prev.find(i => i.id === itemId);
            if (!item || item.quantity <= 0) return prev;

            if (item.type === 'boost') {
                setActiveBoosts(prevBoosts => [...prevBoosts, { ...item, quantity: 1 }]);
                setTimeout(() => {
                    setActiveBoosts(prevBoosts => prevBoosts.filter(b => b.id !== itemId));
                }, (item.effect.duration || 60) * 60 * 1000);
            }

            return prev.map(i =>
                i.id === itemId
                    ? { ...i, quantity: i.quantity - 1 }
                    : i
            ).filter(i => i.quantity > 0);
        });
    };

    const addItem = (item: InventoryItem) => {
        setInventory(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }
            return [...prev, item];
        });
    };

    return {
        inventory,
        activeBoosts,
        useItem,
        addItem
    };
}