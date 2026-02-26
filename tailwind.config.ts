import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                cyber: {
                    black: '#0a0a0f',
                    dark: '#0f0f1a',
                    purple: '#8a2be2',
                    blue: '#00ffff',
                    pink: '#ff00ff',
                    green: '#00ff9d',
                    red: '#ff0055',
                    yellow: '#ffff00',
                    orange: '#ff6600',
                },
            },
            animation: {
                'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glitch': 'glitch 1s linear infinite',
            },
            keyframes: {
                'pulse-neon': {
                    '0%, 100%': {
                        opacity: '1',
                        filter: 'brightness(1) drop-shadow(0 0 10px currentColor)',
                    },
                    '50%': {
                        opacity: '0.8',
                        filter: 'brightness(1.2) drop-shadow(0 0 20px currentColor)',
                    },
                },
                'glitch': {
                    '0%, 100%': { transform: 'translate(0)' },
                    '20%': { transform: 'translate(-2px, 2px)' },
                    '40%': { transform: 'translate(-2px, -2px)' },
                    '60%': { transform: 'translate(2px, 2px)' },
                    '80%': { transform: 'translate(2px, -2px)' },
                },
            },
        },
    },
    plugins: [],
}

export default config