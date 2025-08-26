/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,html}",
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0F0C24',
        'space-medium': '#1a1347',
        'neon-purple': '#A350A3',
        'neon-pink': '#C1436D',
        'light-purple': '#E0B4E0',
        'pale-purple': '#F0E5F0'
      },
      fontFamily: {
        'mono': ['Courier New', 'monospace']
      },
      animation: {
        'neon-glow': 'neonGlow 2s ease-in-out infinite alternate',
        'glitch-1': 'glitch1 0.5s infinite',
        'glitch-2': 'glitch2 0.5s infinite',
        'float': 'float 15s infinite linear',
        'twinkle': 'twinkle 2s infinite',
        'rotate': 'spin 4s linear infinite',
        'shimmer': 'shimmer 2s infinite',
        'slide-up': 'slideUp 1s ease-out forwards',
        'border-glow': 'borderGlow 3s linear infinite',
        'pulse-custom': 'pulseCustom 2s ease-in-out infinite',
        'ripple': 'rippleEffect 0.6s linear'
      },
      keyframes: {
        neonGlow: {
          '0%': { 
            textShadow: '0 0 10px #E0B4E0, 0 0 20px #E0B4E0, 0 0 30px #E0B4E0',
            filter: 'brightness(1)'
          },
          '100%': { 
            textShadow: '0 0 20px #C1436D, 0 0 30px #C1436D, 0 0 40px #C1436D',
            filter: 'brightness(1.2)'
          }
        },
        glitch1: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' }
        },
        glitch2: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(2px, -2px)' },
          '40%': { transform: 'translate(2px, 2px)' },
          '60%': { transform: 'translate(-2px, -2px)' },
          '80%': { transform: 'translate(-2px, 2px)' },
          '100%': { transform: 'translate(0)' }
        },
        float: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)', opacity: '0' }
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' }
        },
        shimmer: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' }
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(50px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        borderGlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        pulseCustom: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' }
        },
        rippleEffect: {
          to: {
            transform: 'scale(4)',
            opacity: '0'
          }
        }
      }
    }
  },
  plugins: [],
}