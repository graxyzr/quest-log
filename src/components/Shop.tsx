'use client';

import { useState } from 'react';
import {
    ShoppingBag,
    Gem,
    Coins,
    Zap,
    BookOpen,
    FlaskConical,
    FlaskRound,
    Percent,
    Clock
} from 'lucide-react';
import { ShopItem } from '@/src/types';

interface ShopProps {
    character: any;
    setCharacter: any;
    onBuy: (item: ShopItem) => void;
}

export default function Shop({ character, setCharacter, onBuy }: ShopProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const shopItems: ShopItem[] = [
        {
            id: 's1',
            name: 'POÇÃO DE XP',
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
            name: 'BOOST DE XP',
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
            name: 'LIVRO DA SABEDORIA',
            description: '+50 de Inteligência permanente',
            price: 500,
            currency: 'gems',
            type: 'consumable',
            rarity: 'legendary',
            icon: 'BookOpen',
            effect: { type: 'attribute_boost', value: 50 }
        }
    ];

    const dailyDeals: ShopItem[] = [
        {
            id: 'd1',
            name: 'OFERTA: POÇÃO DE XP',
            description: '70% de desconto!',
            price: 30,
            currency: 'gems',
            type: 'consumable',
            rarity: 'rare',
            icon: 'Percent',
            effect: { type: 'instant_reward', value: 50 }
        },
        {
            id: 'd2',
            name: 'OFERTA: BOOST DE XP',
            description: '50% de desconto!',
            price: 100,
            currency: 'gems',
            type: 'boost',
            rarity: 'epic',
            icon: 'Zap',
            effect: { type: 'xp_boost', value: 100, duration: 60 }
        }
    ];

    const handleBuy = (item: ShopItem) => {
        const currency = item.currency === 'gold' ? character.gold : character.gems;

        if (currency < item.price) {
            setNotification({ message: 'Saldo insuficiente!', type: 'error' });
            setTimeout(() => setNotification(null), 3000);
            return;
        }

        setCharacter((prev: any) => ({
            ...prev,
            [item.currency === 'gold' ? 'gold' : 'gems']: prev[item.currency === 'gold' ? 'gold' : 'gems'] - item.price
        }));

        onBuy(item);
        setNotification({ message: 'Compra realizada com sucesso!', type: 'success' });
        setTimeout(() => setNotification(null), 3000);
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

    const getIcon = (iconName: string) => {
        const icons: any = {
            FlaskConical: <FlaskConical className="w-5 h-5" />,
            FlaskRound: <FlaskRound className="w-5 h-5" />,
            Zap: <Zap className="w-5 h-5" />,
            BookOpen: <BookOpen className="w-5 h-5" />,
            Percent: <Percent className="w-5 h-5" />
        };
        return icons[iconName] || <ShoppingBag className="w-5 h-5" />;
    };

    return (
        <div className="bg-cyber-dark/50 border border-cyber-purple/30 rounded-lg p-6 backdrop-blur-sm">
            {notification && (
                <div className={`fixed top-20 right-5 z-50 p-4 rounded-lg border ${notification.type === 'success'
                    ? 'bg-cyber-green/20 border-cyber-green text-cyber-green'
                    : 'bg-cyber-red/20 border-cyber-red text-cyber-red'
                    }`}>
                    {notification.message}
                </div>
            )}

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-cyber-yellow" />
                <span className="bg-gradient-to-r from-cyber-yellow to-cyber-orange bg-clip-text text-transparent">
                    CYBER SHOP
                </span>
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-cyber-black/50 border border-cyber-yellow/30 rounded-lg p-3 flex items-center gap-2">
                    <Coins className="w-5 h-5 text-cyber-yellow" />
                    <div>
                        <p className="text-xs text-cyber-yellow/60">GOLD</p>
                        <p className="text-lg font-bold text-cyber-yellow">{character.gold}</p>
                    </div>
                </div>
                <div className="bg-cyber-black/50 border border-cyber-purple/30 rounded-lg p-3 flex items-center gap-2">
                    <Gem className="w-5 h-5 text-cyber-purple" />
                    <div>
                        <p className="text-xs text-cyber-purple/60">GEMS</p>
                        <p className="text-lg font-bold text-cyber-purple">{character.gems}</p>
                    </div>
                </div>
            </div>

            {/* Daily Deals */}
            <div className="mb-6">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-cyber-pink">
                    <Clock className="w-4 h-4" />
                    OFERTAS DO DIA
                    <span className="text-xs bg-cyber-pink/20 px-2 py-1 rounded">24h</span>
                </h3>
                <div className="grid grid-cols-1 gap-3">
                    {dailyDeals.map((item) => (
                        <div
                            key={item.id}
                            className="relative bg-gradient-to-r from-cyber-pink/10 to-transparent border border-cyber-pink/30 rounded-lg p-4 overflow-hidden group"
                        >
                            <div className="absolute top-2 right-2 bg-cyber-pink text-black text-xs font-bold px-2 py-1 rounded">
                                -30%
                            </div>
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded border ${getRarityColor(item.rarity)}`}>
                                    {getIcon(item.icon)}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold">{item.name}</h4>
                                    <p className="text-xs text-gray-400 mb-2">{item.description}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            {item.currency === 'gold'
                                                ? <Coins className="w-3 h-3 text-cyber-yellow" />
                                                : <Gem className="w-3 h-3 text-cyber-purple" />
                                            }
                                            <span className="text-sm font-bold">{item.price}</span>
                                        </div>
                                        <button
                                            onClick={() => handleBuy(item)}
                                            className="px-3 py-1 bg-cyber-pink text-black text-xs font-bold rounded hover:bg-cyber-pink/80 transition-colors"
                                        >
                                            COMPRAR
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Categorias */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {['all', 'consumable', 'boost', 'cosmetic'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${selectedCategory === cat
                            ? 'bg-cyber-purple text-white'
                            : 'bg-cyber-dark border border-cyber-purple/30 text-cyber-purple/60'
                            }`}
                    >
                        {cat.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Itens da Loja */}
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {shopItems
                    .filter(item => selectedCategory === 'all' || item.type === selectedCategory)
                    .map((item) => (
                        <div
                            key={item.id}
                            className={`border rounded-lg p-4 transition-all hover:scale-105 cursor-pointer ${getRarityColor(item.rarity)
                                }`}
                            style={{ borderColor: 'currentColor' }}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded border ${getRarityColor(item.rarity)}`}>
                                    {getIcon(item.icon)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-bold">{item.name}</h4>
                                        <span className={`text-xs px-2 py-1 rounded ${item.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-400' :
                                            item.rarity === 'epic' ? 'bg-purple-500/20 text-purple-400' :
                                                item.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                                                    'bg-gray-500/20 text-gray-400'
                                            }`}>
                                            {item.rarity.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-2">{item.description}</p>
                                    {item.effect.duration && (
                                        <p className="text-xs text-cyber-blue mb-2">Duração: {item.effect.duration} min</p>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            {item.currency === 'gold'
                                                ? <Coins className="w-3 h-3 text-cyber-yellow" />
                                                : <Gem className="w-3 h-3 text-cyber-purple" />
                                            }
                                            <span className="text-sm font-bold">{item.price}</span>
                                        </div>
                                        <button
                                            onClick={() => handleBuy(item)}
                                            className="px-4 py-1 bg-gradient-to-r from-cyber-green to-cyber-blue text-black text-xs font-bold rounded hover:opacity-80 transition-opacity"
                                        >
                                            COMPRAR
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}