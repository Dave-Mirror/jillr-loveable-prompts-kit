
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
				sans: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
				heading: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
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
				jillr: {
					// Jillr Style v2 - Neon Glassmorphism + Hologram
					neonBlue: '#00f0ff',
					neonBlueDark: '#0080aa',
					neonPurple: '#a020f0',
					neonPurpleDark: '#7a1ab8',
					neonGreen: '#39ff14',
					neonGreenDark: '#28cc0a',
					neonPink: '#ff007f',
					neonPinkDark: '#cc0066',
					// Deep space gradient colors
					spaceDeep: '#0f0c29',
					spaceMid: '#302b63',
					spaceDark: '#24243e',
					// Glass and hologram
					glass: 'rgba(255, 255, 255, 0.08)',
					glassBorder: 'rgba(255, 255, 255, 0.2)',
					glassHover: 'rgba(255, 255, 255, 0.12)',
					// Dark variants
					dark: '#0a0a0f',
					darkCard: '#1a1a2e',
					darkAccent: '#16213e',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				// Glassmorphism shadows
				glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
				glassStrong: '0 12px 40px 0 rgba(31, 38, 135, 0.5)',
				// Neon glow effects
				neonBlue: '0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.2)',
				neonPurple: '0 0 20px rgba(160, 32, 240, 0.5), 0 0 40px rgba(160, 32, 240, 0.2)',
				neonGreen: '0 0 20px rgba(57, 255, 20, 0.5), 0 0 40px rgba(57, 255, 20, 0.2)',
				neonPink: '0 0 20px rgba(255, 0, 127, 0.5), 0 0 40px rgba(255, 0, 127, 0.2)',
				// Hologram effects
				hologram: '0 0 30px rgba(160, 32, 240, 0.3), 0 0 60px rgba(0, 240, 255, 0.2)',
				hologramStrong: '0 0 40px rgba(160, 32, 240, 0.5), 0 0 80px rgba(0, 240, 255, 0.3)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'glow-pulse': {
					'0%, 100%': { 
						'box-shadow': '0 0 20px rgba(160, 32, 240, 0.4), 0 0 40px rgba(0, 240, 255, 0.2)'
					},
					'50%': { 
						'box-shadow': '0 0 30px rgba(160, 32, 240, 0.6), 0 0 60px rgba(0, 240, 255, 0.4)' 
					}
				},
				'aurora-sweep': {
					'0%': { 
						'background-position': '0% 50%',
						'background-size': '200% 200%'
					},
					'50%': { 
						'background-position': '100% 50%' 
					},
					'100%': { 
						'background-position': '0% 50%' 
					}
				},
				'hologram-shimmer': {
					'0%': { 'background-position': '-200% 0' },
					'100%': { 'background-position': '200% 0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-6px)' }
				},
				'glass-morph': {
					'0%': { 
						'backdrop-filter': 'blur(10px)',
						'background': 'rgba(255, 255, 255, 0.08)'
					},
					'50%': { 
						'backdrop-filter': 'blur(15px)',
						'background': 'rgba(255, 255, 255, 0.12)'
					},
					'100%': { 
						'backdrop-filter': 'blur(10px)',
						'background': 'rgba(255, 255, 255, 0.08)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'aurora-sweep': 'aurora-sweep 8s ease-in-out infinite',
				'hologram-shimmer': 'hologram-shimmer 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'glass-morph': 'glass-morph 4s ease-in-out infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				// Deep space gradients
				'space-gradient': 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
				'nebula-aurora': 'linear-gradient(45deg, rgba(160, 32, 240, 0.3) 0%, rgba(0, 240, 255, 0.2) 25%, rgba(57, 255, 20, 0.1) 50%, rgba(255, 0, 127, 0.2) 75%, rgba(160, 32, 240, 0.3) 100%)',
				// Hologram effects
				'hologram-gradient': 'linear-gradient(135deg, rgba(160, 32, 240, 0.8) 0%, rgba(0, 240, 255, 0.6) 50%, rgba(57, 255, 20, 0.4) 100%)',
				'aurora-shimmer': 'linear-gradient(110deg, transparent 25%, rgba(255, 255, 255, 0.3) 50%, transparent 75%)',
				// Glass cards
				'glass-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
				'glass-hover': 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
