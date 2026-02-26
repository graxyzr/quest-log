'use client';

import { useState } from 'react';
import {
    Package,
    FlaskConical,
    FlaskRound,
    Gem,
    Zap,
    BookOpen,
    Sword,
    Shield,
    Clock,
    Info
} from 'lucide-react';
import { InventoryItem } from '@/src/types';

interface InventoryProps {
    inventory: InventoryItem[];
    activeBoosts: InventoryItem[];
    onUseItem: (itemId: string) => void;
}

export default function Inventory({ inventory, activeBoosts, onUseItem }: InventoryProps) {
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

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
            Gem: <Gem className="w-5 h-5" />,
            Zap: <Zap className="w-5 h-5" />,
            BookOpen: <BookOpen className="w-5 h-5" />,
            Sword: <Sword className="w-5 h-5" />,
            Shield: <Shield className="w-5 h-5" />
        };
        return icons[iconName] || <Package className="w-5 h-5" />;
    };

    return (
        <div className="bg-cyber-dark/50 border border-cyber-purple/30 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-cyber-green" />
                <span className="bg-gradient-to-r from-cyber-green to-cyber-blue bg-clip-text text-transparent">
                    INVENTÁRIO
                </span>
            </h2>

            {/* Boosts Ativos */}
            {activeBoosts.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-sm font-bold mb-2 text-cyber-blue flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        BOOSTS ATIVOS
                    </h3>
                    <div className="space-y-2">
                        {activeBoosts.map((boost) => (
                            <div
                                key={boost.id}
                                className="bg-gradient-to-r from-cyber-blue/10 to-transparent border border-cyber-blue/30 rounded-lg p-3 flex items-center gap-2"
                            >
                                <div className="p-1 rounded bg-cyber-blue/20">
                                    {getIcon(boost.icon)}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold">{boost.name}</p>
                                    <div className="flex items-center gap-2 text-xs">
                                        <Clock className="w-3 h-3 text-cyber-blue" />
                                        <span>{boost.effect.duration} min restantes</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Itens do Inventário */}
            {inventory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">Inventário vazio</p>
                    <p className="text-xs">Compre itens na loja!</p>
                </div>
            ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {inventory.map((item) => (
                        <div
                            key={item.id}
                            className={`relative border rounded-lg p-4 transition-all hover:scale-105 cursor-pointer ${getRarityColor(item.rarity)
                                }`}
                            style={{ borderColor: 'currentColor' }}
                            onClick={() => setSelectedItem(item)}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded border ${getRarityColor(item.rarity)}`}>
                                    {getIcon(item.icon)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-bold">{item.name}</h4>
                                        <span className="text-sm font-bold text-cyber-green">x{item.quantity}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-2">{item.description}</p>

                                    {selectedItem?.id === item.id && (
                                        <div className="mt-2 p-2 bg-cyber-black rounded border border-cyber-purple">
                                            <p className="text-xs mb-2">Usar este item?</p>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onUseItem(item.id);
                                                        setSelectedItem(null);
                                                    }}
                                                    className="flex-1 px-2 py-1 bg-cyber-green text-black text-xs font-bold rounded"
                                                >
                                                    USAR
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedItem(null);
                                                    }}
                                                    className="flex-1 px-2 py-1 border border-cyber-red text-cyber-red text-xs font-bold rounded"
                                                >
                                                    CANCELAR
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedItem(item);
                                        }}
                                        className="mt-2 text-xs text-cyber-blue hover:text-cyber-purple transition-colors flex items-center gap-1"
                                    >
                                        <Info className="w-3 h-3" />
                                        DETALHES
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}