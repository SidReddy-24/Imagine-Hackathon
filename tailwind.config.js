/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'slow-spin': 'slow-spin 20s linear infinite',
        'float': 'float 8s ease-in-out infinite',
        'float-delay': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'slow-spin': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'float': {
          '0%, 100%': { 
            transform: 'translate(0px, 0px) scale(1)',
            opacity: '0.5',
          },
          '50%': { 
            transform: 'translate(20px, -20px) scale(1.05)',
            opacity: '0.8',
          },
        },
        'pulse': {
          '0%, 100%': { opacity: '.5' },
          '50%': { opacity: '.95' },
        },
      },
    },
  },
  plugins: [],
};
