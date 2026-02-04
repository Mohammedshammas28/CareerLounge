export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep navy and charcoal palette for premium feel
        navy: {
          50: '#f0f4f8',
          100: '#e0e9f1',
          600: '#1e3a5f',
          700: '#1a2d4d',
          800: '#142340',
          900: '#0f1b2e',
          950: '#0a1220',
        },
        charcoal: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          600: '#3a3a3a',
          700: '#2a2a2a',
          800: '#1a1a1a',
          900: '#0f0f0f',
          950: '#050505',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Muted gold accents for premium consultancy feel
        gold: {
          50: '#fefcf3',
          100: '#fef8e7',
          200: '#fce8c3',
          300: '#f9d89f',
          400: '#d4af37',
          500: '#b8860b',
          600: '#8b6f0f',
        },
        // Additional academic colors
        ivory: '#f5f1e8',
        academicBlue: '#1a3a52',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        stylish: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-in',
        slideInUp: 'slideInUp 0.7s ease-out',
        slideInDown: 'slideInDown 0.7s ease-out',
        slideInLeft: 'slideInLeft 0.7s ease-out',
        slideInRight: 'slideInRight 0.7s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
