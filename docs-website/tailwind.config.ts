import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // WalaPlus Brand
        'walaplus': {
          25: '#E6FBF4',
          50: '#CCF7E9',
          100: '#99EFCC',
          200: '#66E7B8',
          300: '#33DEA3',
          400: '#1AD997',
          500: '#00CE8B',
          600: '#00B87D',
          700: '#009B69',
          800: '#007D55',
          900: '#005F41',
          950: '#003D2A',
        },
        'walaplus-secondary': {
          25: '#FFF0E6',
          50: '#FFE1CC',
          100: '#FFC299',
          200: '#FFA366',
          300: '#FF8433',
          400: '#FF751D',
          500: '#FF6608',
          600: '#E65C07',
          700: '#CC5206',
          800: '#B34705',
          900: '#993D04',
          950: '#662903',
        },
        // WalaOne Brand
        'walaone': {
          25: '#F1EEFC',
          50: '#E3DDF9',
          100: '#C7BBF3',
          200: '#AB99ED',
          300: '#9077E7',
          400: '#8269E0',
          500: '#755BD8',
          600: '#6952C2',
          700: '#5844A8',
          800: '#48378A',
          900: '#372A69',
          950: '#241C46',
        },
        'walaone-secondary': {
          25: '#FEF9E9',
          50: '#FDF3D3',
          100: '#FCE7A7',
          200: '#FBDB7B',
          300: '#FACF4F',
          400: '#FAC941',
          500: '#FAC333',
          600: '#E1AF2E',
          700: '#C89B29',
          800: '#AF8724',
          900: '#8A6A1C',
          950: '#5C4712',
        },
        // Doam Brand
        'doam': {
          25: '#E6F8F6',
          50: '#CCF1ED',
          100: '#99E3DB',
          200: '#66D5C9',
          300: '#33C7B7',
          400: '#1AC0AD',
          500: '#07B6A0',
          600: '#06A390',
          700: '#058A7A',
          800: '#047163',
          900: '#03574D',
          950: '#023A33',
        },
        // Neutral (Slate)
        'neutral': {
          25: '#FCFCFD',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        // Status Colors
        'success': {
          50: '#DCFCE7',
          100: '#BBF7D0',
          500: '#16A34A',
          600: '#15803D',
        },
        'warning': {
          50: '#FEF3C7',
          100: '#FDE68A',
          500: '#D97706',
          600: '#B45309',
        },
        'error': {
          50: '#FEE2E2',
          100: '#FECACA',
          500: '#DC2626',
          600: '#B91C1C',
        },
        'info': {
          50: '#DBEAFE',
          100: '#BFDBFE',
          500: '#2563EB',
          600: '#1D4ED8',
        },
      },
      fontFamily: {
        'display': ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'arabic': ['IBM Plex Sans Arabic', 'Tajawal', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': 'url("data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },
      boxShadow: {
        'glow': '0 0 40px -10px var(--tw-shadow-color)',
        'glow-lg': '0 0 60px -15px var(--tw-shadow-color)',
        'inner-glow': 'inset 0 0 20px -5px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [],
};

export default config;

