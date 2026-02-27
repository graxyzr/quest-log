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
    Info,
    Sparkles,
    Trophy,
    Coins,
    Heart,
    ShieldCheck,
    Wand2,
    Eye,
    Ghost,
    Skull,
    Feather,
    Shell,
    TreePine,
    Mountain,
    Sun,
    Moon,
    Star,
    Rocket,
    Plane,
    Car,
    Bike,
    Ship,
    Anchor,
    Fish,
    Bird,
    Cat,
    Dog,
    Rabbit,
    Turtle,
    Bug,
    Leaf,
    Flower,
    Apple,
    Coffee,
    Beer,
    Wine,
    Milk,
    Battery,
    BatteryCharging,
    BatteryFull,
    BatteryLow,
    BatteryMedium,
    BatteryWarning,
    Power,
    PowerOff,
    PowerCircle,
    Triangle,
    CircleDot,
    Square,
    Circle,
    Diamond,
    Hexagon,
    Octagon,
    Pentagon,
    Rows,
    Columns,
    Grid,
    List,
    Menu,
    Layers,
    Box,
    Boxes,
    Container,
    Archive,
    ArchiveX,
    ArchiveRestore,
    Trash,
    Trash2
} from 'lucide-react';
import { InventoryItem } from '@/src/types';

interface InventoryProps {
    inventory: InventoryItem[];
    activeBoosts: InventoryItem[];
    onUseItem: (itemId: string) => void;
}

export default function Inventory({ inventory, activeBoosts, onUseItem }: InventoryProps) {
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
    const [filterRarity, setFilterRarity] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'name' | 'rarity' | 'quantity'>('name');

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'text-gray-400 border-gray-500';
            case 'rare': return 'text-blue-400 border-blue-500';
            case 'epic': return 'text-purple-400 border-purple-500';
            case 'legendary': return 'text-yellow-400 border-yellow-500';
            default: return 'text-gray-400';
        }
    };

    const getRarityBg = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'from-gray-500/10';
            case 'rare': return 'from-blue-500/10';
            case 'epic': return 'from-purple-500/10';
            case 'legendary': return 'from-yellow-500/10';
            default: return 'from-gray-500/10';
        }
    };

    const getRarityBadge = (rarity: string) => {
        switch (rarity) {
            case 'common': return 'bg-gray-500/20 text-gray-400';
            case 'rare': return 'bg-blue-500/20 text-blue-400';
            case 'epic': return 'bg-purple-500/20 text-purple-400';
            case 'legendary': return 'bg-yellow-500/20 text-yellow-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };

    const getIcon = (iconName: string) => {
        const icons: { [key: string]: React.ReactNode } = {
            Package: <Package className="w-5 h-5" />,
            FlaskConical: <FlaskConical className="w-5 h-5" />,
            FlaskRound: <FlaskRound className="w-5 h-5" />,
            Gem: <Gem className="w-5 h-5" />,
            Zap: <Zap className="w-5 h-5" />,
            BookOpen: <BookOpen className="w-5 h-5" />,
            Sword: <Sword className="w-5 h-5" />,
            Shield: <Shield className="w-5 h-5" />,
            Sparkles: <Sparkles className="w-5 h-5" />,
            Trophy: <Trophy className="w-5 h-5" />,
            Coins: <Coins className="w-5 h-5" />,
            Heart: <Heart className="w-5 h-5" />,
            ShieldCheck: <ShieldCheck className="w-5 h-5" />,
            Wand2: <Wand2 className="w-5 h-5" />,
            Eye: <Eye className="w-5 h-5" />,
            Ghost: <Ghost className="w-5 h-5" />,
            Skull: <Skull className="w-5 h-5" />,
            Feather: <Feather className="w-5 h-5" />,
            Shell: <Shell className="w-5 h-5" />,
            TreePine: <TreePine className="w-5 h-5" />,
            Mountain: <Mountain className="w-5 h-5" />,
            Sun: <Sun className="w-5 h-5" />,
            Moon: <Moon className="w-5 h-5" />,
            Star: <Star className="w-5 h-5" />,
            Rocket: <Rocket className="w-5 h-5" />,
            Plane: <Plane className="w-5 h-5" />,
            Car: <Car className="w-5 h-5" />,
            Bike: <Bike className="w-5 h-5" />,
            Ship: <Ship className="w-5 h-5" />,
            Anchor: <Anchor className="w-5 h-5" />,
            Fish: <Fish className="w-5 h-5" />,
            Bird: <Bird className="w-5 h-5" />,
            Cat: <Cat className="w-5 h-5" />,
            Dog: <Dog className="w-5 h-5" />,
            Rabbit: <Rabbit className="w-5 h-5" />,
            Turtle: <Turtle className="w-5 h-5" />,
            Bug: <Bug className="w-5 h-5" />,
            Leaf: <Leaf className="w-5 h-5" />,
            Flower: <Flower className="w-5 h-5" />,
            Apple: <Apple className="w-5 h-5" />,
            Coffee: <Coffee className="w-5 h-5" />,
            Beer: <Beer className="w-5 h-5" />,
            Wine: <Wine className="w-5 h-5" />,
            Milk: <Milk className="w-5 h-5" />,
            Battery: <Battery className="w-5 h-5" />,
            BatteryCharging: <BatteryCharging className="w-5 h-5" />,
            BatteryFull: <BatteryFull className="w-5 h-5" />,
            BatteryLow: <BatteryLow className="w-5 h-5" />,
            BatteryMedium: <BatteryMedium className="w-5 h-5" />,
            BatteryWarning: <BatteryWarning className="w-5 h-5" />,
            Power: <Power className="w-5 h-5" />,
            PowerOff: <PowerOff className="w-5 h-5" />,
            PowerCircle: <PowerCircle className="w-5 h-5" />,
            Triangle: <Triangle className="w-5 h-5" />,
            CircleDot: <CircleDot className="w-5 h-5" />,
            Square: <Square className="w-5 h-5" />,
            Circle: <Circle className="w-5 h-5" />,
            Diamond: <Diamond className="w-5 h-5" />,
            Hexagon: <Hexagon className="w-5 h-5" />,
            Octagon: <Octagon className="w-5 h-5" />,
            Pentagon: <Pentagon className="w-5 h-5" />,
            Rows: <Rows className="w-5 h-5" />,
            Columns: <Columns className="w-5 h-5" />,
            Grid: <Grid className="w-5 h-5" />,
            List: <List className="w-5 h-5" />,
            Menu: <Menu className="w-5 h-5" />,
            Layers: <Layers className="w-5 h-5" />,
            Box: <Box className="w-5 h-5" />,
            Boxes: <Boxes className="w-5 h-5" />,
            Container: <Container className="w-5 h-5" />,
            Archive: <Archive className="w-5 h-5" />,
            ArchiveX: <ArchiveX className="w-5 h-5" />,
            ArchiveRestore: <ArchiveRestore className="w-5 h-5" />,
            Trash: <Trash className="w-5 h-5" />,
            Trash2: <Trash2 className="w-5 h-5" />,
        };
        return icons[iconName] || <Package className="w-5 h-5" />;
    };

    // Filtrar e ordenar itens
    const filteredItems = inventory
        .filter(item => filterRarity === 'all' || item.rarity === filterRarity)
        .sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'rarity') {
                const rarityOrder = { common: 1, rare: 2, epic: 3, legendary: 4 };
                return rarityOrder[b.rarity] - rarityOrder[a.rarity];
            }
            if (sortBy === 'quantity') return b.quantity - a.quantity;
            return 0;
        });

    return (
        <div className="bg-cyber-dark/50 border-2 border-cyber-purple/30 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-cyber-green animate-pulse" />
                <span className="bg-gradient-to-r from-cyber-green to-cyber-blue bg-clip-text text-transparent">
                    INVENTÁRIO
                </span>
            </h2>

            {/* Estatísticas do Inventário */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-cyber-black/50 border border-cyber-purple/30 rounded-lg p-3 text-center">
                    <p className="text-xs text-cyber-blue/60">TOTAL</p>
                    <p className="text-xl font-bold text-cyber-green">{inventory.length}</p>
                </div>
                <div className="bg-cyber-black/50 border border-cyber-purple/30 rounded-lg p-3 text-center">
                    <p className="text-xs text-cyber-blue/60">ITENS ÚNICOS</p>
                    <p className="text-xl font-bold text-cyber-yellow">
                        {new Set(inventory.map(i => i.name)).size}
                    </p>
                </div>
                <div className="bg-cyber-black/50 border border-cyber-purple/30 rounded-lg p-3 text-center">
                    <p className="text-xs text-cyber-blue/60">LEGENDÁRIOS</p>
                    <p className="text-xl font-bold text-cyber-purple">
                        {inventory.filter(i => i.rarity === 'legendary').length}
                    </p>
                </div>
            </div>

            {/* Filtros e Ordenação */}
            <div className="flex flex-wrap gap-2 mb-4">
                <select
                    value={filterRarity}
                    onChange={(e) => setFilterRarity(e.target.value)}
                    className="bg-cyber-black border border-cyber-purple/30 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-cyber-purple"
                >
                    <option value="all">Todas Raridades</option>
                    <option value="common">Comum</option>
                    <option value="rare">Raro</option>
                    <option value="epic">Épico</option>
                    <option value="legendary">Lendário</option>
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-cyber-black border border-cyber-purple/30 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-cyber-purple"
                >
                    <option value="name">Ordenar por Nome</option>
                    <option value="rarity">Ordenar por Raridade</option>
                    <option value="quantity">Ordenar por Quantidade</option>
                </select>
            </div>

            {/* Boosts Ativos */}
            {activeBoosts.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-sm font-bold mb-3 text-cyber-blue flex items-center gap-2">
                        <Zap className="w-4 h-4 animate-pulse" />
                        BOOSTS ATIVOS
                    </h3>
                    <div className="space-y-2">
                        {activeBoosts.map((boost, index) => (
                            <div
                                key={`boost-${boost.id}-${index}`}
                                className="bg-gradient-to-r from-cyber-blue/10 to-transparent border-2 border-cyber-blue/30 rounded-lg p-3"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-bold">{boost.name}</span>
                                    <span className="text-xs bg-cyber-blue/20 px-2 py-0.5 rounded">{boost.effect.duration}min</span>
                                </div>
                                <div className="h-1 bg-cyber-black rounded-full overflow-hidden">
                                    <div className="h-full bg-cyber-green w-3/4 rounded-full animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Itens do Inventário */}
            {filteredItems.length === 0 ? (
                <div className="text-center py-12 text-gray-500 border-2 border-dashed border-cyber-purple/30 rounded-lg">
                    <Package className="w-16 h-16 mx-auto mb-3 opacity-30" />
                    <p className="text-lg font-bold mb-1">Inventário Vazio</p>
                    <p className="text-sm">Compre itens na loja para começar!</p>
                </div>
            ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {filteredItems.map((item) => (
                        <div
                            key={`item-${item.id}`}
                            className={`
                relative overflow-hidden rounded-lg border-2 transition-all duration-300 
                transform hover:scale-105 cursor-pointer
                ${getRarityColor(item.rarity)}
                bg-gradient-to-r ${getRarityBg(item.rarity)} to-transparent
              `}
                            style={{ borderColor: 'currentColor' }}
                            onClick={() => setSelectedItem(item)}
                        >
                            <div className="p-4 relative">
                                <div className="flex items-start gap-3">
                                    {/* Ícone com raridade */}
                                    <div className={`
                    p-3 rounded-lg border-2
                    ${getRarityColor(item.rarity)}
                    bg-cyber-black/50
                  `}>
                                        {getIcon(item.icon)}
                                    </div>

                                    <div className="flex-1">
                                        {/* Header com nome e quantidade */}
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="font-bold text-lg">{item.name}</h4>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-xs px-2 py-1 rounded-full ${getRarityBadge(item.rarity)}`}>
                                                    {item.rarity.toUpperCase()}
                                                </span>
                                                <span className="text-sm font-bold text-cyber-green border-l-2 border-cyber-purple/30 pl-2">
                                                    x{item.quantity}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-400 mb-2">{item.description}</p>

                                        {/* Efeito do item */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-xs bg-cyber-purple/20 px-2 py-0.5 rounded text-cyber-purple">
                                                {item.effect.type === 'xp_boost' && '🚀 XP Boost'}
                                                {item.effect.type === 'attribute_boost' && '📈 Atributo +'}
                                                {item.effect.type === 'instant_reward' && '🎁 Recompensa'}
                                            </span>
                                            {item.effect.duration && (
                                                <span className="text-xs text-cyber-blue/60 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {item.effect.duration}min
                                                </span>
                                            )}
                                        </div>

                                        {/* Botões de ação */}
                                        {selectedItem?.id === item.id ? (
                                            <div className="mt-3 p-3 bg-cyber-black/80 rounded-lg border-2 border-cyber-purple">
                                                <p className="text-sm mb-3 text-center">Usar este item?</p>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onUseItem(item.id);
                                                            setSelectedItem(null);
                                                        }}
                                                        className="flex-1 px-3 py-2 bg-gradient-to-r from-cyber-green to-cyber-blue text-black text-sm font-bold rounded-lg hover:opacity-80 transition-all"
                                                    >
                                                        USAR
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedItem(null);
                                                        }}
                                                        className="flex-1 px-3 py-2 border-2 border-cyber-red text-cyber-red text-sm font-bold rounded-lg hover:bg-cyber-red/10 transition-all"
                                                    >
                                                        CANCELAR
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedItem(item);
                                                }}
                                                className="text-xs text-cyber-blue hover:text-cyber-purple transition-colors flex items-center gap-1"
                                            >
                                                <Info className="w-3 h-3" />
                                                DETALHES
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}