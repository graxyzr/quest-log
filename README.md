# 🎮 Quest-Log - RPG de Produtividade

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Funcionalidades](#-funcionalidades)
- [Instalação](#-instalação)
- [Como Jogar](#-como-jogar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Sistemas do Jogo](#-sistemas-do-jogo)
- [API de Hooks](#-api-de-hooks)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

## 🎯 Sobre o Projeto

Quest-Log é mais que um simples gerenciador de tarefas - é um RPG completo onde VOCÊ é o herói. Cada tarefa completada é uma quest concluída, cada hábito cultivado é uma skill evoluída. Suba de nível, ganhe atributos, colete itens e desbloqueie conquistas enquanto melhora sua vida real!

### 🎨 Tema Visual
- **Estética:** Cyberpunk/RPG Dark
- **Cores:** Pretos profundos com acentos neon (roxo, azul, rosa, verde)
- **Efeitos:** Glitch, scanlines, neon pulsante, partículas flutuantes
- **Animações:** Transições suaves, hover effects, feedback visual

## 🚀 Tecnologias

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Animações:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Estado:** localStorage para persistência
- **Fontes:** Monoespaçadas (Courier, Fira Code, JetBrains Mono)

## ✨ Funcionalidades

### 🎮 **Sistema Principal**
- ✅ Quests diárias com diferentes atributos
- ✅ Sistema de níveis com progressão exponencial
- ✅ 3 atributos principais (Força, Inteligência, Carisma)
- ✅ Barra de XP animada
- ✅ Efeitos de level up com confetti

### 🏪 **Economia e Loja**
- 💰 Sistema de moedas (Gold e Gems)
- 🛒 Loja com itens de diferentes raridades
- 🎁 Ofertas diárias com desconto
- 📦 Inventário para gerenciar itens

### ⚔️ **Sistemas Sociais**
- 🏰 Guildas com membros e raids
- 💬 Chat da guilda
- 📊 Rankings de contribuição
- 🤝 Sistema de multiplayer assíncrono

### 🏆 **Progressão**
- 📜 Battle Pass com 20 níveis
- 🎯 Achievements com recompensas
- 🔥 Streak de dias consecutivos
- 📈 Estatísticas detalhadas

### 🎪 **Entretenimento**
- 🎲 Mini-games (Dice Duel, Coin Flip, Cyber Crash)
- 🎵 Rádio cyberpunk com player de música
- 🗺️ Mapa interativo com navegação
- 🔬 Laboratório científico
- 🧮 Calculadora científica

### ⚙️ **Sistema**
- 🔔 Notificações em tempo real
- ⚙️ Configurações personalizáveis
- 📱 Monitor de dispositivos (bateria, Wi-Fi, Bluetooth)
- 🌤️ Previsão do tempo integrada
- 💾 Persistência com localStorage

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Git

### Passos para instalação

```bash
# Clone o repositório
git clone https://github.com/graxyzr/quest-log.git

# Entre no diretório
cd quest-log

# Instale as dependências
npm install

# Instale dependências adicionais
npm install canvas-confetti lucide-react
npm install --save-dev @types/canvas-confetti

# Rode o projeto
npm run dev
```

Acesse `http://localhost:3000` no seu navegador.

## 🎮 Como Jogar

### 1. **Complete Quests Diárias**
- Clique em "COMPLETE" na quest desejada
- Depois clique em "CLAIM XP" para receber a recompensa
- Quanto maior a dificuldade, mais XP você ganha

### 2. **Suba de Nível**
- Acumule XP para subir de nível
- A cada nível, ganha pontos de atributo
- Ao subir de nível, confetti é disparado!

### 3. **Gerencie Seu Personagem**
- Acompanhe seus atributos no painel lateral
- Veja seu rank atual (Novato → Aprendiz → Guerreiro → Elite → Mestre → Lendário)
- Monitore sua barra de progresso

### 4. **Compre Itens na Loja**
- Use Gold e Gems para comprar itens
- Fique de olho nas ofertas diárias
- Itens têm diferentes raridades e efeitos

### 5. **Use Itens do Inventário**
- Boosts de XP
- Poções de atributo
- Itens especiais

### 6. **Participe da Guild**
- Converse com outros membros
- Participe de raids
- Contribua para o progresso da guild

### 7. **Desbloqueie Achievements**
- Complete objetivos específicos
- Ganhe recompensas exclusivas
- Colecione títulos especiais

## 📁 Estrutura do Projeto

```
quest-log/
├── app/                    # App Router do Next.js
│   ├── page.tsx            # Página principal
│   ├── layout.tsx          # Layout root
│   └── globals.css         # Estilos globais
├── src/
│   ├── components/         # Componentes React
│   │   ├── Achievements.tsx
│   │   ├── BattlePass.tsx
│   │   ├── Guild.tsx
│   │   ├── Inventory.tsx
│   │   ├── MiniGames.tsx
│   │   └── Shop.tsx
│   ├── hooks/              # Custom Hooks
│   │   ├── useQuestEngine.ts
│   │   └── useInventory.ts
│   ├── types/              # Tipos TypeScript
│   │   └── index.ts
│   └── lib/                # Utilitários
│       ├── constants.ts
│       └── utils.ts
├── public/                  # Arquivos estáticos
├── .vscode/                 # Configurações do VS Code
├── tailwind.config.ts       # Configuração do Tailwind
├── postcss.config.js        # Configuração do PostCSS
├── tsconfig.json            # Configuração do TypeScript
├── package.json             # Dependências
└── README.md                # Documentação
```

## ⚙️ Sistemas do Jogo

### 📊 **Fórmula de Progressão**
```typescript
XP_Next_Level = Level × 100 × 1.5
```

### 🎯 **Atributos**
- **Força**: Ganha ao completar quests de treino
- **Inteligência**: Ganha ao completar quests de estudo/coding
- **Carisma**: Ganha ao completar quests de lazer/social

### 💎 **Raridades**
- 🎯 **Comum** - Itens básicos
- 🔵 **Raro** - Itens especiais
- 🟣 **Épico** - Itens poderosos
- 🟡 **Lendário** - Itens únicos

### 🏅 **Ranks**
| Nível | Rank |
|-------|------|
| 1-9 | NOVATO |
| 10-19 | APRENDIZ |
| 20-29 | GUERREIRO |
| 30-39 | ELITE |
| 40-49 | MESTRE |
| 50+ | LENDÁRIO |

## 🎣 API de Hooks

### `useQuestEngine()`
```typescript
const { 
  quests,           // Lista de quests
  character,        // Status do personagem
  setCharacter,     // Atualizar personagem
  claimQuest,       // Reivindicar XP
  completeQuest,    // Completar quest
  resetDailyQuests  // Resetar quests diárias
} = useQuestEngine();
```

### `useInventory()`
```typescript
const {
  inventory,        // Itens no inventário
  activeBoosts,     // Boosts ativos
  useItem,          // Usar um item
  addItem           // Adicionar item
} = useInventory();
```

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Veja como pode ajudar:

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Sugestões de Melhorias
- [ ] Adicionar mais mini-games
- [ ] Sistema de crafting
- [ ] Batalhas PvP
- [ ] Mais achievements
- [ ] Integração com APIs externas
- [ ] Modo noturno/claro
- [ ] Mais animações

## 📝 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## 🙏 Agradecimentos

- [Lucide React](https://lucide.dev/) pelos ícones incríveis
- [Tailwind CSS](https://tailwindcss.com/) pela estilização
- [Next.js](https://nextjs.org/) pelo framework
- [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) pelos efeitos

## 📞 Contato

Link do Projeto: [https://github.com/graxyzr/quest-log](https://github.com/graxyzrquest-log)

---