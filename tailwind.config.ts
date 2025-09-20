
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
				sans: ['Montserrat', 'sans-serif'],
				heading: ['Poppins', 'sans-serif'],
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
				jillr: {
					// Hauptfarbpalette für Jillr-Branding
					neonPurple: '#9b87f5',
					neonPurpleLight: '#BDB0FB',
					neonPurpleDark: '#7A69CF',
					neonPink: '#FF10F0',
					neonPinkLight: '#FF6AF7',
					neonPinkDark: '#C400BA',
					neonBlue: '#0AEFFF',
					neonBlueLight: '#7AF5FF',
					neonBlueDark: '#00C4D4',
					neonGreen: '#39FF14',
					neonGreenLight: '#85FF6F',
					neonGreenDark: '#1ECF00',
					dark: '#1A1F2C',
					darkBlue: '#232741',
					darkAccent: '#2D3348',
					darkLight: '#374057',
					glass: 'rgba(26, 31, 44, 0.7)',
					border: 'rgba(155, 135, 245, 0.2)',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				neon: '0 0 10px rgba(155, 135, 245, 0.5), 0 0 20px rgba(155, 135, 245, 0.2)',
				neonStrong: '0 0 15px rgba(155, 135, 245, 0.7), 0 0 30px rgba(155, 135, 245, 0.4)',
				neonPink: '0 0 15px rgba(255, 16, 240, 0.5), 0 0 30px rgba(255, 16, 240, 0.2)',
				neonBlue: '0 0 15px rgba(10, 239, 255, 0.5), 0 0 30px rgba(10, 239, 255, 0.2)',
				neonGreen: '0 0 15px rgba(57, 255, 20, 0.5), 0 0 30px rgba(57, 255, 20, 0.2)',
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
