/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B1A1A',
          dark: '#5C0E0E',
          light: '#B02020',
        },
        accent: {
          DEFAULT: '#C9A84C',
          light: '#E8C96A',
          dark: '#A07830',
        },
        cta: {
          DEFAULT: '#7C3AED',
          hover: '#6D28D9',
        },
        bg: {
          DEFAULT: '#0D0505',
          card: '#1A0808',
          card2: '#140606',
        },
        fg: {
          DEFAULT: '#F5EDD6',
          muted: '#C4A882',
          dim: '#7A6040',
        },
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #A07830 0%, #C9A84C 30%, #E8C96A 60%, #C9A84C 80%, #A07830 100%)',
        'maroon-gradient': 'linear-gradient(135deg, #1A0808 0%, #2D0A0A 50%, #1A0808 100%)',
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,26,26,0.6) 0%, rgba(13,5,5,0.95) 60%, #0D0505 100%)',
        'cta-gradient': 'linear-gradient(135deg, #7C3AED 0%, #9333EA 50%, #7C3AED 100%)',
      },
      boxShadow: {
        'gold': '0 0 40px rgba(201, 168, 76, 0.15)',
        'gold-strong': '0 0 60px rgba(201, 168, 76, 0.3)',
        'maroon': '0 20px 60px rgba(139, 26, 26, 0.4)',
        'cta': '0 10px 40px rgba(124, 58, 237, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 7s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'pulse-cta': 'pulse-cta 2s ease-in-out infinite',
        'shimmer': 'shimmer-gold 3s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'ticker': 'ticker 30s linear infinite',
        'gradient': 'gradient-shift 4s ease infinite',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'fade-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-scale': 'fadeInScale 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(0.5deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-0.5deg)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-8px) rotate(-0.5deg)' },
          '66%': { transform: 'translateY(-14px) rotate(0.5deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 168, 76, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(201, 168, 76, 0.6), 0 0 80px rgba(201, 168, 76, 0.2)' },
        },
        'pulse-cta': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)' },
          '50%': { boxShadow: '0 0 50px rgba(124, 58, 237, 0.8), 0 0 100px rgba(124, 58, 237, 0.3)' },
        },
        'shimmer-gold': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'scale-in': {
          from: { transform: 'scale(0.8)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInScale: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};