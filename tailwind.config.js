/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dental: {
          blue: '#0F9DFF',
          blueHover: '#0084E3',
          darkBlue: '#0A2540',
          mint: '#00C9A7',
          mintHover: '#00B092',
          lightBg: '#F8FCFF',
          darkBg: '#080E1A',
          darkCard: '#10192D',
          darkCardBorder: 'rgba(255, 255, 255, 0.08)',
          glassBg: 'rgba(255, 255, 255, 0.75)',
          glassDark: 'rgba(16, 25, 45, 0.8)',
          textDark: '#1F2937',
          textMuted: '#6B7280',
          textLightMuted: '#9CA3AF',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px rgba(15, 157, 255, 0.4)',
        'glow-mint': '0 0 25px rgba(0, 201, 167, 0.4)',
        'glass': '0 8px 32px 0 rgba(15, 157, 255, 0.08)',
        'glass-hover': '0 12px 40px 0 rgba(15, 157, 255, 0.2)',
        '3d-card': '0 20px 40px -15px rgba(15, 157, 255, 0.15)',
      },
      backdropBlur: {
        xs: '2px',
        glass: '16px',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(15, 157, 255, 0.5))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(0, 201, 167, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
