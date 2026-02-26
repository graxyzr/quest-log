'use client';

import { useEffect, useRef, useState } from 'react';
import { useQuestEngine } from '@/src/hooks/useQuestEngine';
import { useInventory } from '@/src/hooks/useInventory';
import Shop from '@/src/components/Shop';
import Inventory from '@/src/components/Inventory';
import Achievements from '@/src/components/Achievements';
import Guild from '@/src/components/Guild';
import MiniGames from '@/src/components/MiniGames';
import BattlePass from '@/src/components/BattlePass';
import { 
  Cpu, 
  Bot, 
  Sword, 
  Brain, 
  Mic, 
  ListTodo,
  Dumbbell,
  Users,
  HelpCircle,
  Trophy,
  Target,
  Clock,
  Zap,
  Award,
  Flame,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  Star,
  BarChart3,
  ShoppingBag,
  Package,
  Coins,
  Gem,
  Gamepad2,
  Users2,
  ScrollText,
  Sparkles,
  Gift,
  AlertCircle,
  ChevronRight,
  Settings,
  LogOut,
  Moon,
  Sun,
  Bell,
  Mail,
  Calendar,
  Map,
  Compass,
  Radio,
  Wifi,
  Bluetooth,
  Battery,
  Volume2,
  VolumeX,
  Monitor,
  Smartphone,
  Tablet,
  Watch,
  Headphones,
  Speaker,
  Mic2,
  Camera,
  Video,
  Image,
  Music,
  Film,
  Tv,
  Airplay,
  Disc,
  RadioTower,
  Satellite,
  Navigation,
  Plane,
  Rocket,
  Space,
  Telescope,
  Atom,
  Dna,
  Microscope,
  Flask,
  Beaker,
  TestTube,
  Thermometer,
  Droplet,
  Wind,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  SunDim,
  Sunset,
  Sunrise,
  MoonStar,
  Stars,
  Meteor,
  Comet,
  Eclipse,
  Galaxy,
  Infinity,
  Sigma,
  Pi,
  Omega,
  Alpha,
  Beta,
  Gamma,
  Delta,
  Epsilon,
  Theta,
  Lambda,
  Mu,
  Nu,
  Xi,
  Omicron,
  Rho,
  SigmaSquare,
  Tau,
  Upsilon,
  Phi,
  Chi,
  Psi,
  OmegaIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Home() {
  const { quests, character, setCharacter, claimQuest, completeQuest, resetDailyQuests } = useQuestEngine();
  const { inventory, activeBoosts, useItem, addItem } = useInventory();
  
  const prevLevelRef = useRef(character.level);
  const [showStats, setShowStats] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [streak, setStreak] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: string} | null>(null);
  const [selectedTab, setSelectedTab] = useState('quests');
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Quest completada!', read: false, time: '5min', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 2, message: 'Novo item na loja!', read: false, time: '1h', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 3, message: 'Achievement desbloqueado', read: true, time: '2h', icon: <Trophy className="w-4 h-4" /> },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [dailyReward, setDailyReward] = useState({
    available: true,
    streak: 3,
    nextIn: '12h',
    claimed: false
  });

  // Novos estados para funcionalidades extras
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showRadio, setShowRadio] = useState(false);
  const [showDevice, setShowDevice] = useState(false);
  const [showScience, setShowScience] = useState(false);
  const [showMath, setShowMath] = useState(false);
  const [currentSong, setCurrentSong] = useState({ title: 'Cyberpunk 2077', artist: 'Marcin Przybyłowicz', playing: false });
  const [volume, setVolume] = useState(75);
  const [brightness, setBrightness] = useState(80);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [charging, setCharging] = useState(true);
  const [wifiSignal, setWifiSignal] = useState(4);
  const [bluetoothDevices, setBluetoothDevices] = useState(['Fones', 'Teclado', 'Mouse']);
  const [connectedDevices, setConnectedDevices] = useState(['Fones']);
  const [coordinates, setCoordinates] = useState({ lat: -23.5505, lng: -46.6333 });
  const [altitude, setAltitude] = useState(760);
  const [speed, setSpeed] = useState(0);
  const [direction, setDirection] = useState('N');
  const [weather, setWeather] = useState({ temp: 22, condition: 'Nublado', humidity: 65, wind: 12 });
  const [forecast, setForecast] = useState([
    { day: 'HOJE', temp: 22, icon: <Cloud className="w-4 h-4" /> },
    { day: 'AMANHÃ', temp: 24, icon: <Sun className="w-4 h-4" /> },
    { day: 'SÁB', temp: 21, icon: <CloudRain className="w-4 h-4" /> },
    { day: 'DOM', temp: 23, icon: <Sun className="w-4 h-4" /> },
  ]);
  const [scientificNotation, setScientificNotation] = useState(false);
  const [mathExpression, setMathExpression] = useState('');
  const [mathResult, setMathResult] = useState('');
  const [selectedElement, setSelectedElement] = useState('Hidrogênio');
  const [elements, setElements] = useState([
    { symbol: 'H', name: 'Hidrogênio', mass: 1.008, category: 'Não-metal' },
    { symbol: 'He', name: 'Hélio', mass: 4.0026, category: 'Gás nobre' },
    { symbol: 'Li', name: 'Lítio', mass: 6.94, category: 'Metal alcalino' },
    { symbol: 'Be', name: 'Berílio', mass: 9.0122, category: 'Metal alcalino-terroso' },
    { symbol: 'B', name: 'Boro', mass: 10.81, category: 'Semimetal' },
    { symbol: 'C', name: 'Carbono', mass: 12.011, category: 'Não-metal' },
    { symbol: 'N', name: 'Nitrogênio', mass: 14.007, category: 'Não-metal' },
    { symbol: 'O', name: 'Oxigênio', mass: 15.999, category: 'Não-metal' },
    { symbol: 'F', name: 'Flúor', mass: 18.998, category: 'Halogênio' },
    { symbol: 'Ne', name: 'Neônio', mass: 20.180, category: 'Gás nobre' },
  ]);
  const [mathConstants] = useState([
    { name: 'π (Pi)', value: Math.PI.toFixed(10) },
    { name: 'e (Euler)', value: Math.E.toFixed(10) },
    { name: 'φ (Phi)', value: ((1 + Math.sqrt(5)) / 2).toFixed(10) },
    { name: '√2', value: Math.SQRT2.toFixed(10) },
    { name: '√3', value: Math.sqrt(3).toFixed(10) },
    { name: 'γ (Euler-Mascheroni)', value: '0.5772156649' },
  ]);

  const xpPercentage = (character.xp / character.xpToNextLevel) * 100;

  useEffect(() => {
    setMounted(true);
    // Simular mudanças de bateria
    const interval = setInterval(() => {
      setBatteryLevel(prev => Math.max(0, prev - 1));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Efeito de level up
  useEffect(() => {
    if (!mounted) return;
    
    if (character.level > prevLevelRef.current) {
      // Confetti principal
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8a2be2', '#00ffff', '#ff00ff', '#00ff9d']
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#8a2be2', '#00ffff']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff00ff', '#00ff9d']
        });
      }, 200);

      showNotification(`LEVEL UP! ${character.level}`, 'success');
      
      if (vibrationEnabled && navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }
    }
    prevLevelRef.current = character.level;
  }, [character.level, mounted]);

  const showNotification = (message: string, type: string) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
    
    if (soundEnabled) {
      // Tocar som de notificação
      const audio = new Audio('/notification.mp3');
      audio.volume = volume / 100;
      audio.play().catch(() => {});
    }
  };

  const handleClaimXP = (questId: string) => {
    const result = claimQuest(questId);
    
    if (result.bonusGold > 0) {
      showNotification(`+${result.bonusGold} GOLD BÔNUS!`, 'success');
    }
  };

  const handleCompleteQuest = (questId: string) => {
    completeQuest(questId);
    setStreak(prev => prev + 1);
    showNotification('Quest completada! Clame seu XP!', 'info');
  };

  const handleBuyItem = (item: any) => {
    addItem({
      id: Date.now().toString(),
      name: item.name,
      description: item.description,
      type: item.type,
      rarity: item.rarity,
      icon: item.icon,
      quantity: 1,
      effect: item.effect
    });
    showNotification('Item adicionado ao inventário!', 'success');
  };

  const handleDailyReward = () => {
    if (dailyReward.available && !dailyReward.claimed) {
      setDailyReward(prev => ({ ...prev, available: false, claimed: true }));
      setCharacter((prev: any) => ({
        ...prev,
        gold: prev.gold + 500,
        gems: prev.gems + 10
      }));
      showNotification('Recompensa diária recebida! +500 Gold, +10 Gems', 'success');
      
      if (vibrationEnabled && navigator.vibrate) {
        navigator.vibrate(100);
      }
    }
  };

  const calculateMath = () => {
    try {
      // Função segura para calcular expressões matemáticas
      const result = Function('"use strict";return (' + mathExpression + ')')();
      setMathResult(result.toString());
    } catch (error) {
      setMathResult('Erro');
    }
  };

  const getAttributeIcon = (attribute: string) => {
    switch(attribute) {
      case 'strength': return <Sword className="w-5 h-5 text-cyber-red" />;
      case 'intelligence': return <Brain className="w-5 h-5 text-cyber-blue" />;
      case 'charisma': return <Mic className="w-5 h-5 text-cyber-pink" />;
      default: return null;
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Dumbbell: Dumbbell,
      Brain: Brain,
      Users: Users,
    };
    return icons[iconName] || HelpCircle;
  };

  if (!mounted) {
    return (
      <main className="min-h-screen bg-cyber-black text-white font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Rocket className="w-20 h-20 text-cyber-blue animate-bounce mx-auto mb-4" />
            <div className="absolute inset-0 animate-ping">
              <Rocket className="w-20 h-20 text-cyber-purple opacity-50 mx-auto mb-4" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyber-blue to-cyber-pink bg-clip-text text-transparent">
            INICIANDO SISTEMA...
          </h1>
          <div className="space-y-2">
            <p className="text-cyber-blue/60 flex items-center justify-center gap-2">
              <Radio className="w-4 h-4 animate-pulse" />
              CONECTANDO AO NEURAL LINK
            </p>
            <div className="flex items-center justify-center gap-2 text-xs">
              <Wifi className={`w-3 h-3 ${wifiSignal > 0 ? 'text-cyber-green' : 'text-gray-600'}`} />
              <Bluetooth className={`w-3 h-3 ${connectedDevices.length > 0 ? 'text-cyber-blue' : 'text-gray-600'}`} />
              <Battery className={`w-3 h-3 ${batteryLevel > 20 ? 'text-cyber-green' : 'text-cyber-red'}`} />
              <span className="text-gray-500">{batteryLevel}%</span>
            </div>
          </div>
          <div className="mt-6 flex gap-2 justify-center">
            <div className="w-2 h-2 bg-cyber-purple rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-cyber-pink rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cyber-black text-white font-mono">
      {/* Notificações Toast */}
      {notification && (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 animate-bounce px-6 py-3 rounded-lg font-bold shadow-lg shadow-cyber-purple/20 flex items-center gap-3 border ${
          notification.type === 'success' ? 'bg-cyber-green text-black border-cyber-green' :
          notification.type === 'achievement' ? 'bg-cyber-yellow text-black border-cyber-yellow' :
          'bg-cyber-blue text-black border-cyber-blue'
        }`}>
          {notification.type === 'success' && <Gift className="w-5 h-5 animate-spin" />}
          {notification.type === 'achievement' && <Trophy className="w-5 h-5 animate-bounce" />}
          {notification.type === 'info' && <Sparkles className="w-5 h-5 animate-pulse" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Menu de Notificações */}
      {showNotifications && (
        <div className="fixed top-16 right-4 z-50 w-96 bg-cyber-dark border-2 border-cyber-purple rounded-lg shadow-2xl shadow-cyber-purple/30 animate-slideDown">
          <div className="p-4 border-b-2 border-cyber-purple/30 bg-gradient-to-r from-cyber-purple/20 to-transparent">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Bell className="w-5 h-5 text-cyber-yellow animate-pulse" />
                <span className="bg-gradient-to-r from-cyber-yellow to-cyber-pink bg-clip-text text-transparent">
                  NOTIFICAÇÕES
                </span>
              </h3>
              <button 
                onClick={() => setShowNotifications(false)} 
                className="text-gray-500 hover:text-white hover:scale-110 transition-transform"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-cyber-blue/60 mt-1">
              {notifications.filter(n => !n.read).length} não lidas
            </p>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`p-4 border-b border-cyber-purple/20 hover:bg-cyber-purple/10 transition-all cursor-pointer transform hover:scale-105 ${
                  !notif.read ? 'bg-cyber-purple/5 border-l-4 border-l-cyber-yellow' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    !notif.read ? 'bg-cyber-yellow/20' : 'bg-cyber-purple/10'
                  }`}>
                    {notif.icon}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${!notif.read ? 'font-bold' : ''}`}>{notif.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-cyber-blue/60" />
                      <p className="text-xs text-cyber-blue/60">{notif.time} atrás</p>
                    </div>
                  </div>
                  {!notif.read && (
                    <span className="w-2 h-2 bg-cyber-yellow rounded-full animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t-2 border-cyber-purple/30 bg-gradient-to-r from-cyber-purple/10 to-transparent">
            <div className="flex gap-2">
              <button className="flex-1 text-center text-xs bg-cyber-purple/20 hover:bg-cyber-purple/30 text-cyber-purple py-2 rounded-lg transition-colors">
                MARCAR TODAS
              </button>
              <button className="flex-1 text-center text-xs bg-cyber-red/20 hover:bg-cyber-red/30 text-cyber-red py-2 rounded-lg transition-colors">
                LIMPAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Menu de Configurações */}
      {showSettings && (
        <div className="fixed top-16 right-4 z-50 w-80 bg-cyber-dark border-2 border-cyber-purple rounded-lg shadow-2xl shadow-cyber-purple/30 animate-slideDown">
          <div className="p-4 border-b-2 border-cyber-purple/30 bg-gradient-to-r from-cyber-purple/20 to-transparent">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Settings className="w-5 h-5 text-cyber-blue animate-spin-slow" />
                <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                  CONFIGURAÇÕES
                </span>
              </h3>
              <button 
                onClick={() => setShowSettings(false)} 
                className="text-gray-500 hover:text-white hover:scale-110 transition-transform"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="p-4 space-y-4">
            {/* Modo Noturno */}
            <div className="flex items-center justify-between p-3 bg-cyber-black/50 rounded-lg border border-cyber-purple/30">
              <div className="flex items-center gap-2">
                {darkMode ? <Moon className="w-4 h-4 text-cyber-blue" /> : <Sun className="w-4 h-4 text-cyber-yellow" />}
                <span className="text-sm">MODO NOTURNO</span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  darkMode ? 'bg-cyber-blue' : 'bg-gray-600'
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  darkMode ? 'right-1' : 'left-1'
                }`} />
              </button>
            </div>

            {/* Som */}
            <div className="flex items-center justify-between p-3 bg-cyber-black/50 rounded-lg border border-cyber-purple/30">
              <div className="flex items-center gap-2">
                {soundEnabled ? <Volume2 className="w-4 h-4 text-cyber-green" /> : <VolumeX className="w-4 h-4 text-cyber-red" />}
                <span className="text-sm">SOM</span>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  soundEnabled ? 'bg-cyber-green' : 'bg-gray-600'
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  soundEnabled ? 'right-1' : 'left-1'
                }`} />
              </button>
            </div>

            {/* Vibração */}
            <div className="flex items-center justify-between p-3 bg-cyber-black/50 rounded-lg border border-cyber-purple/30">
              <div className="flex items-center gap-2">
                <Radio className={`w-4 h-4 ${vibrationEnabled ? 'text-cyber-purple' : 'text-gray-600'}`} />
                <span className="text-sm">VIBRAÇÃO</span>
              </div>
              <button
                onClick={() => setVibrationEnabled(!vibrationEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  vibrationEnabled ? 'bg-cyber-purple' : 'bg-gray-600'
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  vibrationEnabled ? 'right-1' : 'left-1'
                }`} />
              </button>
            </div>

            {/* Volume */}
            <div className="p-3 bg-cyber-black/50 rounded-lg border border-cyber-purple/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-cyber-blue">VOLUME</span>
                <span className="text-xs text-cyber-green">{volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-full accent-cyber-green"
              />
            </div>

            {/* Brilho */}
            <div className="p-3 bg-cyber-black/50 rounded-lg border border-cyber-purple/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-cyber-yellow">BRILHO</span>
                <span className="text-xs text-cyber-green">{brightness}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(parseInt(e.target.value))}
                className="w-full accent-cyber-yellow"
              />
            </div>

            <hr className="border-cyber-purple/30" />

            {/* Sair */}
            <button className="w-full text-left text-sm bg-cyber-red/10 hover:bg-cyber-red/20 text-cyber-red p-3 rounded-lg transition-all flex items-center gap-2 border border-cyber-red/30">
              <LogOut className="w-4 h-4" />
              SAIR DA CONTA
            </button>
          </div>
        </div>
      )}

      {/* Menu de Dispositivos */}
      {showDevice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-cyber-dark border-2 border-cyber-purple rounded-lg w-96 p-6 animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Bluetooth className="w-5 h-5 text-cyber-blue animate-pulse" />
                <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                  DISPOSITIVOS
                </span>
              </h3>
              <button 
                onClick={() => setShowDevice(false)} 
                className="text-gray-500 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            {/* Status do dispositivo */}
            <div className="space-y-4 mb-4">
              <div className="bg-cyber-black/50 p-3 rounded-lg border border-cyber-purple/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-cyber-blue">BATERIA</span>
                  <div className="flex items-center gap-2">
                    <Battery className={`w-5 h-5 ${batteryLevel > 50 ? 'text-cyber-green' : batteryLevel > 20 ? 'text-cyber-yellow' : 'text-cyber-red'}`} />
                    <span className="text-sm font-bold">{batteryLevel}%</span>
                  </div>
                </div>
                <div className="mt-2 h-2 bg-cyber-black rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      batteryLevel > 50 ? 'bg-cyber-green' : batteryLevel > 20 ? 'bg-cyber-yellow' : 'bg-cyber-red'
                    }`}
                    style={{ width: `${batteryLevel}%` }}
                  />
                </div>
                {charging && (
                  <p className="text-xs text-cyber-green mt-1 flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    CARREGANDO
                  </p>
                )}
              </div>

              <div className="bg-cyber-black/50 p-3 rounded-lg border border-cyber-purple/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-cyber-green">WI-FI</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <Wifi key={i} className={`w-4 h-4 ${i <= wifiSignal ? 'text-cyber-green' : 'text-gray-600'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-400">Rede: CyberNet_5G</p>
              </div>

              <div className="bg-cyber-black/50 p-3 rounded-lg border border-cyber-purple/30">
                <span className="text-sm text-cyber-purple block mb-2">BLUETOOTH</span>
                <div className="space-y-2">
                  {bluetoothDevices.map((device) => (
                    <div key={device} className="flex items-center justify-between">
                      <span className="text-xs">{device}</span>
                      <button
                        onClick={() => {
                          if (connectedDevices.includes(device)) {
                            setConnectedDevices(prev => prev.filter(d => d !== device));
                          } else {
                            setConnectedDevices(prev => [...prev, device]);
                          }
                        }}
                        className={`px-2 py-1 rounded text-xs ${
                          connectedDevices.includes(device)
                            ? 'bg-cyber-green text-black'
                            : 'bg-cyber-purple/20 text-cyber-purple'
                        }`}
                      >
                        {connectedDevices.includes(device) ? 'CONECTADO' : 'CONECTAR'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowDevice(false)}
              className="w-full py-2 bg-gradient-to-r from-cyber-purple to-cyber-pink text-black font-bold rounded-lg"
            >
              FECHAR
            </button>
          </div>
        </div>
      )}

      {/* Menu de Rádio/Música */}
      {showRadio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-cyber-dark border-2 border-cyber-purple rounded-lg w-96 p-6 animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Radio className="w-5 h-5 text-cyber-pink animate-pulse" />
                <span className="bg-gradient-to-r from-cyber-pink to-cyber-purple bg-clip-text text-transparent">
                  CYBER RADIO
                </span>
              </h3>
              <button 
                onClick={() => setShowRadio(false)} 
                className="text-gray-500 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            {/* Player de música */}
            <div className="bg-gradient-to-r from-cyber-purple/20 to-cyber-pink/20 p-4 rounded-lg mb-4 border border-cyber-purple/30">
              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple p-[2px] animate-spin-slow">
                  <div className="w-full h-full rounded-full bg-cyber-dark flex items-center justify-center">
                    <Music className="w-8 h-8 text-cyber-pink" />
                  </div>
                </div>
              </div>
              <p className="text-center font-bold">{currentSong.title}</p>
              <p className="text-center text-sm text-gray-400 mb-3">{currentSong.artist}</p>
              
              {/* Controles */}
              <div className="flex items-center justify-center gap-4">
                <button className="p-2 hover:bg-cyber-purple/20 rounded-full transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setCurrentSong(prev => ({ ...prev, playing: !prev.playing }))}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-cyber-green to-cyber-blue flex items-center justify-center hover:scale-110 transition-transform"
                >
                  {currentSong.playing ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button className="p-2 hover:bg-cyber-purple/20 rounded-full transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Barra de progresso */}
              <div className="mt-4">
                <div className="h-1 bg-cyber-black rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1:23</span>
                  <span>3:45</span>
                </div>
              </div>
            </div>

            {/* Lista de rádios */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {['CYBERPUNK 2077', 'NEON WAVE', 'SYNTHWAVE 80', 'DARK ELECTRO', 'FUTURE BASS'].map((station) => (
                <button
                  key={station}
                  className="w-full text-left p-3 bg-cyber-black/50 hover:bg-cyber-purple/20 rounded-lg border border-cyber-purple/30 transition-colors flex items-center gap-3"
                >
                  <Radio className="w-4 h-4 text-cyber-pink" />
                  <span className="text-sm">{station}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowRadio(false)}
              className="w-full mt-4 py-2 bg-gradient-to-r from-cyber-pink to-cyber-purple text-black font-bold rounded-lg"
            >
              FECHAR
            </button>
          </div>
        </div>
      )}

      {/* Menu de Mapa/Navegação */}
      {showMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-cyber-dark border-2 border-cyber-purple rounded-lg w-[600px] p-6 animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Map className="w-5 h-5 text-cyber-green animate-pulse" />
                <span className="bg-gradient-to-r from-cyber-green to-cyber-blue bg-clip-text text-transparent">
                  CYBER MAP
                </span>
              </h3>
              <button 
                onClick={() => setShowMap(false)} 
                className="text-gray-500 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            {/* Mapa simulado */}
            <div className="relative h-64 bg-cyber-black/50 rounded-lg mb-4 border border-cyber-purple/30 overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h60v60H0z" fill="none"/%3E%3Cpath d="M30 0v60M0 30h60" stroke="%238a2be2" stroke-width="0.5" opacity="0.2"/%3E%3C/svg%3E')] opacity-30" />
              
              {/* Marcador de posição */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <Navigation className="w-8 h-8 text-cyber-blue animate-pulse" />
                  <div className="absolute inset-0 animate-ping">
                    <Navigation className="w-8 h-8 text-cyber-purple opacity-50" />
                  </div>
                </div>
              </div>

              {/* Informações de navegação */}
              <div className="absolute bottom-2 left-2 right-2 bg-cyber-dark/90 p-2 rounded-lg border border-cyber-purple">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-cyber-blue/60">LAT</span>
                    <p className="font-bold">{coordinates.lat.toFixed(4)}</p>
                  </div>
                  <div>
                    <span className="text-cyber-blue/60">LNG</span>
                    <p className="font-bold">{coordinates.lng.toFixed(4)}</p>
                  </div>
                  <div>
                    <span className="text-cyber-blue/60">ALT</span>
                    <p className="font-bold">{altitude}m</p>
                  </div>
                  <div>
                    <span className="text-cyber-blue/60">VEL</span>
                    <p className="font-bold">{speed} km/h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Controles de navegação */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button className="p-2 bg-cyber-black/50 hover:bg-cyber-purple/20 rounded border border-cyber-purple/30">
                <Compass className="w-5 h-5 mx-auto text-cyber-blue" />
              </button>
              <button className="p-2 bg-cyber-black/50 hover:bg-cyber-purple/20 rounded border border-cyber-purple/30">
                <Plane className="w-5 h-5 mx-auto text-cyber-green" />
              </button>
              <button className="p-2 bg-cyber-black/50 hover:bg-cyber-purple/20 rounded border border-cyber-purple/30">
                <Satellite className="w-5 h-5 mx-auto text-cyber-yellow" />
              </button>
            </div>

            {/* Pontos de interesse */}
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {['ARESAD CONSTRUCT', 'NIGHT CITY', 'PACIFICA', 'WATSON', 'HEYWOOD'].map((location) => (
                <button
                  key={location}
                  className="w-full text-left p-2 bg-cyber-black/50 hover:bg-cyber-purple/20 rounded border border-cyber-purple/30 text-sm"
                >
                  {location}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowMap(false)}
              className="w-full mt-4 py-2 bg-gradient-to-r from-cyber-green to-cyber-blue text-black font-bold rounded-lg"
            >
              FECHAR
            </button>
          </div>
        </div>
      )}

      {/* Menu de Ciência */}
      {showScience && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-cyber-dark border-2 border-cyber-purple rounded-lg w-[600px] p-6 animate-scaleIn max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sticky top-0 bg-cyber-dark/90 p-2 backdrop-blur-sm z-10">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Atom className="w-5 h-5 text-cyber-yellow animate-spin-slow" />
                <span className="bg-gradient-to-r from-cyber-yellow to-cyber-orange bg-clip-text text-transparent">
                  LABORATÓRIO
                </span>
              </h3>
              <button 
                onClick={() => setShowScience(false)} 
                className="text-gray-500 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            {/* Tabela periódica simplificada */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-cyber-blue mb-2">TABELA PERIÓDICA</h4>
              <div className="grid grid-cols-5 gap-1">
                {elements.map((element) => (
                  <button
                    key={element.symbol}
                    onClick={() => setSelectedElement(element.name)}
                    className={`p-2 text-center rounded border transition-all ${
                      selectedElement === element.name
                        ? 'border-cyber-yellow bg-cyber-yellow/10 scale-110'
                        : 'border-cyber-purple/30 hover:border-cyber-purple'
                    }`}
                  >
                    <p className="font-bold text-sm">{element.symbol}</p>
                    <p className="text-[10px] text-gray-400">{element.mass.toFixed(2)}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Detalhes do elemento */}
            {selectedElement && (
              <div className="mb-6 p-4 bg-gradient-to-r from-cyber-purple/10 to-transparent rounded-lg border border-cyber-purple/30">
                <h4 className="font-bold text-cyber-yellow mb-2">{selectedElement}</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-cyber-blue/60">SÍMBOLO</span>
                    <p>{elements.find(e => e.name === selectedElement)?.symbol}</p>
                  </div>
                  <div>
                    <span className="text-cyber-blue/60">MASSA</span>
                    <p>{elements.find(e => e.name === selectedElement)?.mass} u</p>
                  </div>
                  <div>
                    <span className="text-cyber-blue/60">CATEGORIA</span>
                    <p>{elements.find(e => e.name === selectedElement)?.category}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Experimentos */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-cyber-green mb-2">EXPERIMENTOS</h4>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-3 bg-cyber-black/50 hover:bg-cyber-purple/20 rounded border border-cyber-purple/30 text-left">
                  <Microscope className="w-5 h-5 text-cyber-blue mb-1" />
                  <p className="text-sm">Microscopia</p>
                  <p className="text-xs text-gray-400">Analisar amostras</p>
                </button>
                <button className="p-3 bg-cyber-black/50 hover:bg-cyber-purple/20 rounded border border-cyber-purple/30 text-left">
                  <TestTube className="w-5 h-5 text-cyber-green mb-1" />
                  <p className="text-sm">Química</p>
                  <p className="text-xs text-gray-400">Reações</p>
                </button>
                <button className="p-3 bg-cyber-black/50 hover:bg-cyber-purple/20 rounded border border-cyber-purple/30 text-left">
                  <Dna className="w-5 h-5 text-cyber-pink mb-1" />
                  <p className="text-sm">Genética</p>
                  <p className="text-xs text-gray-400">Sequenciamento</p>
                </button>
                <button className="p-3 bg-cyber-black/50 hover:bg-cyber-purple/20 rounded border border-cyber-purple/30 text-left">
                  <Flask className="w-5 h-5 text-cyber-yellow mb-1" />
                  <p className="text-sm">Bioquímica</p>
                  <p className="text-xs text-gray-400">Síntese</p>
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowScience(false)}
              className="w-full py-2 bg-gradient-to-r from-cyber-yellow to-cyber-orange text-black font-bold rounded-lg"
            >
              FECHAR
            </button>
          </div>
        </div>
      )}

      {/* Menu de Matemática */}
      {showMath && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-cyber-dark border-2 border-cyber-purple rounded-lg w-[500px] p-6 animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Infinity className="w-5 h-5 text-cyber-blue animate-pulse" />
                <span className="bg-gradient-to-r from-cyber-blue to-cyber-cyan bg-clip-text text-transparent">
                  CALCULADORA CIENTÍFICA
                </span>
              </h3>
              <button 
                onClick={() => setShowMath(false)} 
                className="text-gray-500 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            {/* Calculadora */}
            <div className="mb-6">
              <div className="bg-cyber-black/50 p-3 rounded-lg mb-3 border border-cyber-purple/30">
                <p className="text-right text-2xl font-mono mb-1">{mathExpression || '0'}</p>
                <p className="text-right text-cyber-green text-sm">{mathResult}</p>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {['7', '8', '9', '/'].map((btn) => (
                  <button
                    key={btn}
                    onClick={() => setMathExpression(prev => prev + btn)}
                    className="p-3 bg-cyber-black/50 hover:bg-cyber-purple/20 rounded border border-cyber-purple/30 font-mono"
                  >
                    {btn}
                  </button>
                ))}
                {['4', '5', '6', '*'].map((btn) => (
                  <button
                    key={btn}
                    onClick={() => setMathExpression(prev => prev + btn)}
                    className="p-3 bg-cyber-black/50 hover:bg-cyber-purple/20 rounded border border-cyber-purple/30 font-mono"
                  >
                    {btn}
                  </button>
                ))}
                {['1', '2', '3', '-'].map((btn) => (
                  <button
                    key={btn}
                    onClick={() => setMathExpression(prev => prev + btn)}
                    className="p-3 bg-cyber-black/50 hover:bg-cyber-purple/20 rounded border border-cyber-purple/30 font-mono"
                  >
                    {btn}
                  </button>
                ))}
                {['0', '.', '=', '+'].map((btn) => (
                  <button
                    key={btn}
                    onClick={() => {
                      if (btn === '=') {
                        calculateMath();
                      } else {
                        setMathExpression(prev => prev + btn);
                      }
                    }}
                    className="p-3 bg-cyber-black/50 hover:bg-cyber-purple/20 rounded border border-cyber-purple/30 font-mono"
                  >
                    {btn}
                  </button>
                ))}
                <button
                  onClick={() => setMathExpression('')}
                  className="col-span-4 p-3 bg-cyber-red/20 hover:bg-cyber-red/30 text-cyber-red rounded border border-cyber-red/30 font-mono"
                >
                  LIMPAR
                </button>
              </div>
            </div>

            {/* Constantes matemáticas */}
            <div>
              <h4 className="text-sm font-bold text-cyber-green mb-2">CONSTANTES</h4>
              <div className="grid grid-cols-2 gap-2">
                {mathConstants.map((constante) => (
                  <button
                    key={constante.name}
                    onClick={() => setMathExpression(prev => prev + constante.value)}
                    className="p-2 bg-cyber-black/50 hover:bg-cyber-purple/20 rounded border border-cyber-purple/30 text-left"
                  >
                    <p className="text-xs text-cyber-blue">{constante.name}</p>
                    <p className="text-sm font-mono">{constante.value}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowMath(false)}
              className="w-full mt-4 py-2 bg-gradient-to-r from-cyber-blue to-cyber-cyan text-black font-bold rounded-lg"
            >
              FECHAR
            </button>
          </div>
        </div>
      )}

      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyber-purple/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h60v60H0z\' fill=\'none\'/%3E%3Cpath d=\'M30 0v60M0 30h60\' stroke=\'%238a2be2\' stroke-width=\'0.5\' opacity=\'0.1\'/%3E%3C/svg%3E')] pointer-events-none" />

      <div className="container mx-auto p-6 relative z-10">
        {/* Header com status do sistema */}
        <div className="flex items-center justify-between mb-6 bg-cyber-dark/30 p-3 rounded-lg border border-cyber-purple/30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
              <span className="text-xs text-cyber-green">ONLINE</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className={`w-4 h-4 ${wifiSignal > 0 ? 'text-cyber-blue' : 'text-gray-600'}`} />
              <span className="text-xs">{wifiSignal}/4</span>
            </div>
            <div className="flex items-center gap-2">
              <Bluetooth className={`w-4 h-4 ${connectedDevices.length > 0 ? 'text-cyber-purple' : 'text-gray-600'}`} />
              <span className="text-xs">{connectedDevices.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Battery className={`w-4 h-4 ${batteryLevel > 50 ? 'text-cyber-green' : batteryLevel > 20 ? 'text-cyber-yellow' : 'text-cyber-red'}`} />
              <span className="text-xs">{batteryLevel}%</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRadio(!showRadio)}
              className="p-2 bg-cyber-dark border border-cyber-purple/30 rounded-lg hover:bg-cyber-purple/20 transition-colors"
            >
              <Radio className="w-4 h-4 text-cyber-pink" />
            </button>
            <button
              onClick={() => setShowMap(!showMap)}
              className="p-2 bg-cyber-dark border border-cyber-purple/30 rounded-lg hover:bg-cyber-purple/20 transition-colors"
            >
              <Map className="w-4 h-4 text-cyber-green" />
            </button>
            <button
              onClick={() => setShowDevice(!showDevice)}
              className="p-2 bg-cyber-dark border border-cyber-purple/30 rounded-lg hover:bg-cyber-purple/20 transition-colors"
            >
              <Monitor className="w-4 h-4 text-cyber-blue" />
            </button>
            <button
              onClick={() => setShowScience(!showScience)}
              className="p-2 bg-cyber-dark border border-cyber-purple/30 rounded-lg hover:bg-cyber-purple/20 transition-colors"
            >
              <Atom className="w-4 h-4 text-cyber-yellow" />
            </button>
            <button
              onClick={() => setShowMath(!showMath)}
              className="p-2 bg-cyber-dark border border-cyber-purple/30 rounded-lg hover:bg-cyber-purple/20 transition-colors"
            >
              <Infinity className="w-4 h-4 text-cyber-cyan" />
            </button>
          </div>
        </div>

        {/* Header com recursos principais */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div className="md:col-span-2 bg-gradient-to-r from-cyber-purple/20 to-transparent border-2 border-cyber-purple/30 rounded-lg p-4 hover:border-cyber-purple transition-all cursor-pointer transform hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-lg animate-pulse">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-xs text-cyber-blue/60">RANK • {character.rank}</p>
                <p className="text-2xl font-bold">NÍVEL {character.level}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-cyber-dark/30 border-2 border-cyber-yellow/30 rounded-lg p-4 hover:border-cyber-yellow transition-all cursor-pointer transform hover:scale-105">
            <div className="flex items-center gap-2">
              <Coins className="w-6 h-6 text-cyber-yellow animate-spin-slow" />
              <div>
                <p className="text-xs text-cyber-yellow/60">GOLD</p>
                <p className="text-xl font-bold text-cyber-yellow">{character.gold}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-cyber-dark/30 border-2 border-cyber-purple/30 rounded-lg p-4 hover:border-cyber-purple transition-all cursor-pointer transform hover:scale-105">
            <div className="flex items-center gap-2">
              <Gem className="w-6 h-6 text-cyber-purple animate-pulse" />
              <div>
                <p className="text-xs text-cyber-purple/60">GEMS</p>
                <p className="text-xl font-bold text-cyber-purple">{character.gems}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-cyber-dark/30 border-2 border-cyber-red/30 rounded-lg p-4 hover:border-cyber-red transition-all cursor-pointer transform hover:scale-105">
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-cyber-red animate-bounce" />
              <div>
                <p className="text-xs text-cyber-red/60">STREAK</p>
                <p className="text-xl font-bold text-cyber-red">{streak}d</p>
              </div>
            </div>
          </div>
          
          <div className="bg-cyber-dark/30 border-2 border-cyber-green/30 rounded-lg p-4 hover:border-cyber-green transition-all cursor-pointer transform hover:scale-105">
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6 text-cyber-green animate-ping" />
              <div>
                <p className="text-xs text-cyber-green/60">QUESTS</p>
                <p className="text-xl font-bold text-cyber-green">{quests.filter(q => q.completed).length}/3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de XP com efeitos */}
        <div className="bg-cyber-dark/30 border-2 border-cyber-purple/30 rounded-lg p-4 mb-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/10 via-transparent to-cyber-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="flex justify-between items-center mb-2 relative">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyber-yellow animate-pulse" />
              <span className="text-sm font-bold">PROGRESSO PARA NÍVEL {character.level + 1}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-cyber-green font-bold">{character.xp} / {character.xpToNextLevel} XP</span>
              <ChevronRight className="w-4 h-4 text-cyber-blue group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
          
          <div className="h-5 bg-cyber-black border-2 border-cyber-purple/30 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink rounded-full transition-all duration-500 relative"
              style={{ width: `${xpPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
            
            {/* Marcadores de nível */}
            {[25, 50, 75].map((mark) => (
              <div
                key={mark}
                className="absolute top-0 h-full w-0.5 bg-white/30"
                style={{ left: `${mark}%` }}
              />
            ))}
          </div>
        </div>

        {/* Tabs de Navegação com ícones animados */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-thin">
          <button
            onClick={() => {
              setSelectedTab('quests');
              setShowShop(false);
              setShowInventory(false);
            }}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 whitespace-nowrap transform hover:scale-105 ${
              selectedTab === 'quests' && !showShop && !showInventory
                ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-black shadow-lg shadow-cyber-purple/30 border-2 border-white/20'
                : 'bg-cyber-dark border-2 border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/20'
            }`}
          >
            <ListTodo className={`w-4 h-4 ${selectedTab === 'quests' ? 'animate-spin' : ''}`} />
            QUESTS
          </button>
          
          <button
            onClick={() => {
              setShowShop(true);
              setShowInventory(false);
              setSelectedTab('shop');
            }}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 whitespace-nowrap transform hover:scale-105 ${
              showShop
                ? 'bg-gradient-to-r from-cyber-yellow to-cyber-orange text-black shadow-lg shadow-cyber-yellow/30 border-2 border-white/20'
                : 'bg-cyber-dark border-2 border-cyber-yellow/30 text-cyber-yellow hover:bg-cyber-yellow/20'
            }`}
          >
            <ShoppingBag className={`w-4 h-4 ${showShop ? 'animate-bounce' : ''}`} />
            SHOP
          </button>
          
          <button
            onClick={() => {
              setShowInventory(true);
              setShowShop(false);
              setSelectedTab('inventory');
            }}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 whitespace-nowrap transform hover:scale-105 ${
              showInventory
                ? 'bg-gradient-to-r from-cyber-green to-cyber-blue text-black shadow-lg shadow-cyber-green/30 border-2 border-white/20'
                : 'bg-cyber-dark border-2 border-cyber-green/30 text-cyber-green hover:bg-cyber-green/20'
            }`}
          >
            <Package className={`w-4 h-4 ${showInventory ? 'animate-pulse' : ''}`} />
            INVENTORY ({inventory.length})
          </button>
          
          <button
            onClick={() => {
              setSelectedTab('achievements');
              setShowShop(false);
              setShowInventory(false);
            }}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 whitespace-nowrap transform hover:scale-105 ${
              selectedTab === 'achievements'
                ? 'bg-gradient-to-r from-cyber-yellow to-cyber-pink text-black shadow-lg shadow-cyber-yellow/30 border-2 border-white/20'
                : 'bg-cyber-dark border-2 border-cyber-yellow/30 text-cyber-yellow hover:bg-cyber-yellow/20'
            }`}
          >
            <Trophy className={`w-4 h-4 ${selectedTab === 'achievements' ? 'animate-bounce' : ''}`} />
            ACHIEVEMENTS
          </button>
          
          <button
            onClick={() => {
              setSelectedTab('guild');
              setShowShop(false);
              setShowInventory(false);
            }}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 whitespace-nowrap transform hover:scale-105 ${
              selectedTab === 'guild'
                ? 'bg-gradient-to-r from-cyber-purple to-cyber-pink text-black shadow-lg shadow-cyber-purple/30 border-2 border-white/20'
                : 'bg-cyber-dark border-2 border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/20'
            }`}
          >
            <Users2 className={`w-4 h-4 ${selectedTab === 'guild' ? 'animate-pulse' : ''}`} />
            GUILD
          </button>
          
          <button
            onClick={() => {
              setSelectedTab('minigames');
              setShowShop(false);
              setShowInventory(false);
            }}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 whitespace-nowrap transform hover:scale-105 ${
              selectedTab === 'minigames'
                ? 'bg-gradient-to-r from-cyber-green to-cyber-blue text-black shadow-lg shadow-cyber-green/30 border-2 border-white/20'
                : 'bg-cyber-dark border-2 border-cyber-green/30 text-cyber-green hover:bg-cyber-green/20'
            }`}
          >
            <Gamepad2 className={`w-4 h-4 ${selectedTab === 'minigames' ? 'animate-spin' : ''}`} />
            MINI GAMES
          </button>
          
          <button
            onClick={() => {
              setSelectedTab('battlepass');
              setShowShop(false);
              setShowInventory(false);
            }}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 whitespace-nowrap transform hover:scale-105 ${
              selectedTab === 'battlepass'
                ? 'bg-gradient-to-r from-cyber-yellow to-cyber-pink text-black shadow-lg shadow-cyber-yellow/30 border-2 border-white/20'
                : 'bg-cyber-dark border-2 border-cyber-yellow/30 text-cyber-yellow hover:bg-cyber-yellow/20'
            }`}
          >
            <ScrollText className={`w-4 h-4 ${selectedTab === 'battlepass' ? 'animate-pulse' : ''}`} />
            BATTLE PASS
          </button>
          
          <button
            onClick={() => {
              setSelectedTab('stats');
              setShowShop(false);
              setShowInventory(false);
            }}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 whitespace-nowrap transform hover:scale-105 ${
              selectedTab === 'stats'
                ? 'bg-gradient-to-r from-cyber-blue to-cyber-cyan text-black shadow-lg shadow-cyber-blue/30 border-2 border-white/20'
                : 'bg-cyber-dark border-2 border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/20'
            }`}
          >
            <BarChart3 className={`w-4 h-4 ${selectedTab === 'stats' ? 'animate-bounce' : ''}`} />
            STATS
          </button>
        </div>

        {/* Conteúdo Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Coluna da Esquerda - Personagem */}
          <div className="lg:col-span-1">
            <div className="bg-cyber-dark/50 border-2 border-cyber-purple/30 rounded-lg p-6 backdrop-blur-sm sticky top-6 hover:border-cyber-purple transition-all">
              {/* Avatar e informações básicas */}
              <div className="text-center mb-6">
                <div className="relative inline-block group">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyber-purple to-cyber-blue p-[2px] animate-pulse-neon group-hover:scale-110 transition-transform">
                    <div className="w-full h-full rounded-full bg-cyber-dark flex items-center justify-center">
                      <Bot className="w-12 h-12 text-cyber-blue" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-cyber-black border-2 border-cyber-purple px-3 py-1 rounded-full whitespace-nowrap">
                    <span className="text-xs font-bold text-cyber-blue">LVL {character.level}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyber-green rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-xs">✓</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mt-4 bg-gradient-to-r from-cyber-purple to-cyber-pink bg-clip-text text-transparent">
                  {character.rank}
                </h3>
                <p className="text-xs text-cyber-blue/60 mt-1">MEMBRO DESDE 2024</p>
              </div>

              {/* Atributos com barras de progresso animadas */}
              <div className="space-y-4 mb-6">
                <div className="p-3 border-2 border-cyber-red/30 rounded-lg hover:border-cyber-red/60 transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Sword className="w-4 h-4 text-cyber-red group-hover:animate-bounce" />
                      <span className="text-sm font-bold">FORÇA</span>
                    </div>
                    <span className="text-cyber-red font-bold text-lg">{character.strength}</span>
                  </div>
                  <div className="h-2 bg-cyber-black rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyber-red to-cyber-orange rounded-full transition-all duration-500 group-hover:animate-pulse"
                      style={{ width: `${(character.strength % 100)}%` }} 
                    />
                  </div>
                  <p className="text-xs text-cyber-red/60 mt-1">Próximo nível: {100 - (character.strength % 100)}</p>
                </div>
                
                <div className="p-3 border-2 border-cyber-blue/30 rounded-lg hover:border-cyber-blue/60 transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-cyber-blue group-hover:animate-pulse" />
                      <span className="text-sm font-bold">INTELIGÊNCIA</span>
                    </div>
                    <span className="text-cyber-blue font-bold text-lg">{character.intelligence}</span>
                  </div>
                  <div className="h-2 bg-cyber-black rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyber-blue to-cyber-cyan rounded-full transition-all duration-500"
                      style={{ width: `${(character.intelligence % 100)}%` }} 
                    />
                  </div>
                  <p className="text-xs text-cyber-blue/60 mt-1">Próximo nível: {100 - (character.intelligence % 100)}</p>
                </div>
                
                <div className="p-3 border-2 border-cyber-pink/30 rounded-lg hover:border-cyber-pink/60 transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Mic className="w-4 h-4 text-cyber-pink group-hover:animate-bounce" />
                      <span className="text-sm font-bold">CARISMA</span>
                    </div>
                    <span className="text-cyber-pink font-bold text-lg">{character.charisma}</span>
                  </div>
                  <div className="h-2 bg-cyber-black rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyber-pink to-cyber-purple rounded-full transition-all duration-500"
                      style={{ width: `${(character.charisma % 100)}%` }} 
                    />
                  </div>
                  <p className="text-xs text-cyber-pink/60 mt-1">Próximo nível: {100 - (character.charisma % 100)}</p>
                </div>
              </div>

              {/* Boosts Ativos com temporizador */}
              {activeBoosts.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold mb-3 text-cyber-green flex items-center gap-2">
                    <Zap className="w-4 h-4 animate-pulse" />
                    BOOSTS ATIVOS
                  </h4>
                  <div className="space-y-2">
                    {activeBoosts.map((boost) => (
                      <div key={boost.id} className="bg-gradient-to-r from-cyber-green/10 to-transparent border-2 border-cyber-green/30 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold">{boost.name}</span>
                          <span className="text-xs bg-cyber-green/20 px-2 py-0.5 rounded">{boost.effect.duration}min</span>
                        </div>
                        <div className="h-1 bg-cyber-black rounded-full overflow-hidden">
                          <div className="h-full bg-cyber-green w-3/4 rounded-full animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Botões rápidos */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={resetDailyQuests}
                  className="px-3 py-2 bg-cyber-purple/20 text-cyber-purple border-2 border-cyber-purple/50 rounded-lg text-xs font-bold hover:bg-cyber-purple/30 transition-all flex items-center justify-center gap-1 transform hover:scale-105"
                >
                  <RotateCcw className="w-3 h-3" />
                  RESET
                </button>
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="px-3 py-2 bg-cyber-blue/20 text-cyber-blue border-2 border-cyber-blue/50 rounded-lg text-xs font-bold hover:bg-cyber-blue/30 transition-all flex items-center justify-center gap-1 transform hover:scale-105"
                >
                  <BarChart3 className="w-3 h-3" />
                  {showStats ? 'OCULTAR' : 'STATS'}
                </button>
              </div>

              {/* Stats Detalhados */}
              {showStats && (
                <div className="mt-4 p-3 bg-cyber-black/50 border-2 border-cyber-purple/30 rounded-lg space-y-2 text-sm animate-fadeIn">
                  <div className="flex justify-between items-center">
                    <span className="text-cyber-blue/60">Total Quests:</span>
                    <span className="text-cyber-green font-bold">{quests.filter(q => q.claimed).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyber-blue/60">Taxa de Conclusão:</span>
                    <span className="text-cyber-yellow font-bold">
                      {((quests.filter(q => q.claimed).length / 30) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyber-blue/60">Média de XP/dia:</span>
                    <span className="text-cyber-purple font-bold">{(character.xp / 7).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyber-blue/60">Tempo jogado:</span>
                    <span className="text-cyber-pink font-bold">127h</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Coluna da Direita - Conteúdo das Tabs */}
          <div className="lg:col-span-3">
            {/* Tab de Quests */}
            {selectedTab === 'quests' && !showShop && !showInventory && (
              <div className="bg-cyber-dark/50 border-2 border-cyber-purple/30 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <ListTodo className="w-6 h-6 text-cyber-green animate-pulse" />
                    <span className="bg-gradient-to-r from-cyber-green to-cyber-blue bg-clip-text text-transparent">
                      DAILY QUESTS
                    </span>
                  </h2>
                  <div className="flex items-center gap-2 text-sm bg-cyber-black/50 px-3 py-1 rounded-lg border border-cyber-yellow/30">
                    <Clock className="w-4 h-4 text-cyber-yellow animate-spin-slow" />
                    <span className="text-cyber-yellow">RESET EM 12H</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quests.map((quest) => {
                    const IconComponent = getIconComponent(quest.icon);
                    
                    return (
                      <div
                        key={quest.id}
                        className={`
                          relative group overflow-hidden rounded-lg border-2 transition-all duration-300 transform hover:scale-105
                          ${quest.completed 
                            ? 'border-cyber-green/50 bg-gradient-to-r from-cyber-green/5 to-transparent' 
                            : 'border-cyber-purple/30 bg-cyber-black/50 hover:border-cyber-purple/60'
                          }
                        `}
                      >
                        {/* Efeito de brilho no hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/10 via-transparent to-cyber-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="p-4 relative">
                          <div className="flex justify-between items-start mb-3">
                            <div className={`
                              p-2 rounded-lg border-2 
                              ${quest.attribute === 'strength' ? 'border-cyber-red text-cyber-red bg-cyber-red/5 group-hover:animate-bounce' : ''}
                              ${quest.attribute === 'intelligence' ? 'border-cyber-blue text-cyber-blue bg-cyber-blue/5 group-hover:animate-pulse' : ''}
                              ${quest.attribute === 'charisma' ? 'border-cyber-pink text-cyber-pink bg-cyber-pink/5 group-hover:animate-ping' : ''}
                            `}>
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <div className="flex items-center gap-2">
                              {getAttributeIcon(quest.attribute)}
                              <span className="text-xs font-bold text-cyber-green bg-cyber-green/10 px-2 py-1 rounded border border-cyber-green/30">
                                +{quest.xpReward} XP
                              </span>
                            </div>
                          </div>

                          <h3 className="font-bold text-lg mb-1">{quest.title}</h3>
                          <p className="text-sm text-gray-400 mb-4">{quest.description}</p>

                          {/* Dificuldade */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`text-xs px-2 py-0.5 rounded border ${
                              quest.difficulty === 'easy' ? 'bg-cyber-green/20 text-cyber-green border-cyber-green/30' :
                              quest.difficulty === 'medium' ? 'bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/30' :
                              'bg-cyber-red/20 text-cyber-red border-cyber-red/30'
                            }`}>
                              {quest.difficulty.toUpperCase()}
                            </span>
                            {quest.timeLimit && (
                              <span className="text-xs text-cyber-blue/60 flex items-center gap-1 border border-cyber-blue/30 px-2 py-0.5 rounded">
                                <Clock className="w-3 h-3" />
                                {quest.timeLimit}min
                              </span>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleCompleteQuest(quest.id)}
                              disabled={quest.completed}
                              className={`
                                flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all transform hover:scale-105
                                ${quest.completed
                                  ? 'bg-cyber-green/20 text-cyber-green/50 cursor-not-allowed border border-cyber-green/30'
                                  : 'bg-cyber-purple/20 text-cyber-purple hover:bg-cyber-purple/30 border-2 border-cyber-purple/50'
                                }
                              `}
                            >
                              {quest.completed ? '✓ COMPLETED' : 'COMPLETE'}
                            </button>
                            
                            <button
                              onClick={() => handleClaimXP(quest.id)}
                              disabled={!quest.completed || quest.claimed}
                              className={`
                                px-3 py-2 rounded-lg text-xs font-bold transition-all relative overflow-hidden transform hover:scale-105
                                ${quest.claimed
                                  ? 'bg-cyber-green/20 text-cyber-green/50 cursor-not-allowed border border-cyber-green/30'
                                  : quest.completed
                                    ? 'bg-gradient-to-r from-cyber-green to-cyber-blue text-black hover:shadow-lg hover:shadow-cyber-green/20 border-2 border-white/20'
                                    : 'bg-gray-800/50 text-gray-600 cursor-not-allowed border border-gray-700'
                                }
                              `}
                            >
                              {quest.claimed ? 'CLAIMED ✓' : 'CLAIM XP'}
                            </button>
                          </div>

                          {/* Timer para daily quests */}
                          {quest.completed && !quest.claimed && (
                            <div className="mt-3 flex items-center justify-center gap-1 text-xs text-cyber-blue/60 bg-cyber-blue/5 py-1 rounded border border-cyber-blue/30">
                              <Clock className="w-3 h-3 animate-pulse" />
                              <span>Disponível para claim</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bônus por completar todas */}
                {quests.every(q => q.completed) && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-cyber-yellow/20 to-transparent border-2 border-cyber-yellow/30 rounded-lg animate-pulse">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Trophy className="w-8 h-8 text-cyber-yellow animate-bounce" />
                        <div>
                          <h3 className="font-bold">BÔNUS DIÁRIO!</h3>
                          <p className="text-sm text-gray-400">Todas as quests completadas</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-cyber-yellow to-cyber-orange text-black font-bold rounded-lg hover:opacity-80 transition-all transform hover:scale-105">
                        RECEBER +100 XP
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Outras Tabs */}
            {selectedTab === 'achievements' && <Achievements />}
            {selectedTab === 'guild' && <Guild />}
            {selectedTab === 'minigames' && <MiniGames />}
            {selectedTab === 'battlepass' && <BattlePass />}
            {selectedTab === 'stats' && (
              <div className="bg-cyber-dark/50 border-2 border-cyber-blue/30 rounded-lg p-6 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-cyber-blue animate-pulse" />
                  <span className="bg-gradient-to-r from-cyber-blue to-cyber-cyan bg-clip-text text-transparent">
                    ESTATÍSTICAS DETALHADAS
                  </span>
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-cyber-black/50 border-2 border-cyber-purple/30 rounded-lg p-4 hover:border-cyber-purple transition-all">
                    <h3 className="text-sm font-bold text-cyber-blue mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4 animate-bounce" />
                      GERAL
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Nível</span>
                          <span className="text-cyber-green font-bold">{character.level}</span>
                        </div>
                        <div className="h-1 bg-cyber-black rounded-full overflow-hidden">
                          <div className="h-full bg-cyber-green" style={{ width: `${xpPercentage}%` }} />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">XP Total</span>
                        <span className="text-cyber-green font-bold">{character.xp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Quests</span>
                        <span className="text-cyber-green font-bold">{quests.filter(q => q.claimed).length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Streak Máximo</span>
                        <span className="text-cyber-red font-bold">{streak} dias</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyber-black/50 border-2 border-cyber-purple/30 rounded-lg p-4 hover:border-cyber-purple transition-all">
                    <h3 className="text-sm font-bold text-cyber-blue mb-3 flex items-center gap-2">
                      <Sword className="w-4 h-4 animate-pulse" />
                      ATRIBUTOS
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Força</span>
                          <span className="text-cyber-red font-bold">{character.strength}</span>
                        </div>
                        <div className="h-1 bg-cyber-black rounded-full overflow-hidden">
                          <div className="h-full bg-cyber-red" style={{ width: `${(character.strength % 100)}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Inteligência</span>
                          <span className="text-cyber-blue font-bold">{character.intelligence}</span>
                        </div>
                        <div className="h-1 bg-cyber-black rounded-full overflow-hidden">
                          <div className="h-full bg-cyber-blue" style={{ width: `${(character.intelligence % 100)}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Carisma</span>
                          <span className="text-cyber-pink font-bold">{character.charisma}</span>
                        </div>
                        <div className="h-1 bg-cyber-black rounded-full overflow-hidden">
                          <div className="h-full bg-cyber-pink" style={{ width: `${(character.charisma % 100)}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyber-black/50 border-2 border-cyber-purple/30 rounded-lg p-4 hover:border-cyber-purple transition-all">
                    <h3 className="text-sm font-bold text-cyber-blue mb-3 flex items-center gap-2">
                      <Coins className="w-4 h-4 animate-spin-slow" />
                      ECONOMIA
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Gold Total</span>
                        <span className="text-cyber-yellow font-bold">{character.gold}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Gems</span>
                        <span className="text-cyber-purple font-bold">{character.gems}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Itens no Inventário</span>
                        <span className="text-cyber-green font-bold">{inventory.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Gasto Total</span>
                        <span className="text-cyber-pink font-bold">2.5K</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyber-black/50 border-2 border-cyber-purple/30 rounded-lg p-4 hover:border-cyber-purple transition-all">
                    <h3 className="text-sm font-bold text-cyber-blue mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 animate-pulse" />
                      EFICIÊNCIA
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">XP/min</span>
                        <span className="text-cyber-green font-bold">{(character.xp / 100).toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Gold/hora</span>
                        <span className="text-cyber-yellow font-bold">{(character.gold / 24).toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Quests/hora</span>
                        <span className="text-cyber-blue font-bold">0.8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tempo Médio</span>
                        <span className="text-cyber-pink font-bold">45min</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gráfico de progresso (simulado) */}
                <div className="mt-6 p-4 bg-cyber-black/50 border-2 border-cyber-purple/30 rounded-lg">
                  <h3 className="text-sm font-bold text-cyber-blue mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    PROGRESSO SEMANAL
                  </h3>
                  <div className="flex items-end justify-between h-32 gap-2">
                    {['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'].map((day, i) => (
                      <div key={day} className="flex-1 flex flex-col items-center gap-2 group">
                        <div 
                          className="w-full bg-gradient-to-t from-cyber-blue to-cyber-purple rounded-t-lg transition-all group-hover:opacity-80 group-hover:scale-105 cursor-pointer relative"
                          style={{ height: `${Math.random() * 80 + 20}px` }}
                        >
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-cyber-dark px-2 py-1 rounded text-xs whitespace-nowrap border border-cyber-purple">
                            {Math.floor(Math.random() * 500 + 100)} XP
                          </div>
                        </div>
                        <span className="text-xs text-cyber-blue/60">{day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Shop e Inventory */}
            {showShop && (
              <Shop 
                character={character}
                setCharacter={setCharacter}
                onBuy={handleBuyItem}
              />
            )}

            {showInventory && (
              <Inventory
                inventory={inventory}
                activeBoosts={activeBoosts}
                onUseItem={useItem}
              />
            )}
          </div>
        </div>

        {/* Footer com informações e previsão do tempo */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-cyber-dark/30 border-2 border-cyber-purple/30 rounded-lg p-3 backdrop-blur-sm hover:border-cyber-purple transition-all">
            <h4 className="text-xs font-bold mb-1 text-cyber-blue flex items-center gap-1">
              <Sparkles className="w-3 h-3 animate-pulse" />
              DICA DO DIA
            </h4>
            <p className="text-xs text-gray-400">Complete todas as quests para ganhar bônus de 100 XP!</p>
          </div>
          
          <div className="bg-cyber-dark/30 border-2 border-cyber-purple/30 rounded-lg p-3 backdrop-blur-sm hover:border-cyber-purple transition-all">
            <h4 className="text-xs font-bold mb-1 text-cyber-green flex items-center gap-1">
              <Trophy className="w-3 h-3 animate-bounce" />
              PRÓXIMO RANK
            </h4>
            <p className="text-xs text-gray-400">
              {character.rank} → {character.rank === 'LENDÁRIO' ? 'MÁXIMO' : 
                ['NOVATO', 'APRENDIZ', 'GUERREIRO', 'ELITE', 'MESTRE', 'LENDÁRIO'][
                  ['NOVATO', 'APRENDIZ', 'GUERREIRO', 'ELITE', 'MESTRE', 'LENDÁRIO'].indexOf(character.rank) + 1
                ] || 'MÁXIMO'}
            </p>
          </div>
          
          <div className="bg-cyber-dark/30 border-2 border-cyber-purple/30 rounded-lg p-3 backdrop-blur-sm hover:border-cyber-purple transition-all">
            <h4 className="text-xs font-bold mb-1 text-cyber-pink flex items-center gap-1">
              <Users2 className="w-3 h-3 animate-pulse" />
              COMUNIDADE
            </h4>
            <p className="text-xs text-gray-400">1.2K players online</p>
          </div>

          <div className="bg-cyber-dark/30 border-2 border-cyber-purple/30 rounded-lg p-3 backdrop-blur-sm hover:border-cyber-purple transition-all">
            <h4 className="text-xs font-bold mb-1 text-cyber-yellow flex items-center gap-1">
              <Gift className="w-3 h-3 animate-bounce" />
              EVENTO ATIVO
            </h4>
            <p className="text-xs text-gray-400">Dobro de XP em quests de força!</p>
          </div>

          {/* Previsão do tempo */}
          <div className="bg-cyber-dark/30 border-2 border-cyber-purple/30 rounded-lg p-3 backdrop-blur-sm hover:border-cyber-purple transition-all">
            <h4 className="text-xs font-bold mb-1 text-cyber-cyan flex items-center gap-1">
              <Cloud className="w-3 h-3 animate-pulse" />
              TEMPO
            </h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {weather.condition === 'Nublado' ? <Cloud className="w-4 h-4 text-gray-400" /> : <Sun className="w-4 h-4 text-cyber-yellow" />}
                <span className="text-xs font-bold">{weather.temp}°C</span>
              </div>
              <div className="flex gap-1">
                {forecast.map((day) => (
                  <div key={day.day} className="text-center">
                    <p className="text-[8px] text-gray-500">{day.day}</p>
                    {day.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Status com informações em tempo real */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-cyber-dark/30 border-2 border-cyber-purple/30 rounded-full hover:border-cyber-purple transition-all">
            <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
            <span className="text-xs text-cyber-green/60">SYSTEM ONLINE</span>
            <span className="w-px h-4 bg-cyber-purple/30" />
            <span className="text-xs text-cyber-blue/60">{quests.filter(q => q.completed).length}/3 QUESTS</span>
            <span className="w-px h-4 bg-cyber-purple/30" />
            <span className="text-xs text-cyber-yellow/60">{new Date().toLocaleTimeString()}</span>
            <span className="w-px h-4 bg-cyber-purple/30" />
            <span className="text-xs text-cyber-pink/60 flex items-center gap-1">
              <Wifi className="w-3 h-3" />
              {wifiSignal}/4
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

// Componentes auxiliares que precisam ser importados
const Play = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const Square = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="6" y="6" width="12" height="12" />
  </svg>
);

const CheckCircle = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);