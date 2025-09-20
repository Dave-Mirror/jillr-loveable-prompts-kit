
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['Orbitron', 'sans-serif'],
				mono: ['Space Mono', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// New futuristic neon colors
				'neon-purple': 'hsl(var(--neon-purple))',
				'neon-cyan': 'hsl(var(--neon-cyan))',
				'neon-pink': 'hsl(var(--neon-pink))',
				'neon-green': 'hsl(var(--neon-green))',
				'neon-blue': 'hsl(var(--neon-blue))',
				jillr: {
					// Updated neon palette with stronger values
					neonPurple: '#8A2BE2',
					neonPurpleLight: '#BF7FFF',
					neonPurpleDark: '#6A1B9A',
					neonPink: '#FF00FF',
					neonPinkLight: '#FF6AFF',
					neonPinkDark: '#CC00CC',
					neonBlue: '#00FFFF',
					neonBlueLight: '#7FFFFF',
					neonBlueDark: '#00CCCC',
					neonGreen: '#39FF14',
					neonGreenLight: '#85FF6F',
					neonGreenDark: '#1ECF00',
					// Deep space backgrounds
					dark: '#0A0A1A',
					darkBlue: '#151529',
					darkAccent: '#1F1F35',
					darkLight: '#2A2A40',
					glass: 'rgba(10, 10, 26, 0.8)',
					border: 'rgba(138, 43, 226, 0.3)',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				neon: '0 0 20px rgba(138, 43, 226, 0.6), 0 0 40px rgba(138, 43, 226, 0.3)',
				neonStrong: '0 0 30px rgba(138, 43, 226, 0.8), 0 0 60px rgba(138, 43, 226, 0.5)',
				neonPink: '0 0 20px rgba(255, 0, 255, 0.6), 0 0 40px rgba(255, 0, 255, 0.3)',
				neonBlue: '0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.3)',
				neonGreen: '0 0 20px rgba(57, 255, 20, 0.6), 0 0 40px rgba(57, 255, 20, 0.3)',
				'glow-sm': '0 0 10px rgba(138, 43, 226, 0.5)',
				'glow-md': '0 0 20px rgba(138, 43, 226, 0.6)',
				'glow-lg': '0 0 30px rgba(138, 43, 226, 0.7)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'glow': {
					'0%, 100%': { 
						'box-shadow': '0 0 5px rgba(155, 135, 245, 0.5), 0 0 10px rgba(155, 135, 245, 0.3)'
					},
					'50%': { 
						'box-shadow': '0 0 15px rgba(155, 135, 245, 0.8), 0 0 20px rgba(155, 135, 245, 0.5)' 
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-3px)' }
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow': 'glow 2s ease-in-out infinite',
				'float': 'float 4s ease-in-out infinite',
				'pulse-soft': 'pulse-soft 3s infinite',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 8s linear infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'neon-glow': 'linear-gradient(to right, rgba(155, 135, 245, 0.5), rgba(10, 239, 255, 0.5))',
				'challenge-card': 'linear-gradient(to bottom right, rgba(35, 39, 65, 0.8), rgba(26, 31, 44, 0.9))',
				'game-card': 'linear-gradient(to bottom right, rgba(57, 255, 20, 0.05), rgba(10, 239, 255, 0.05))',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
