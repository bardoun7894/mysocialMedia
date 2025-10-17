/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8c52ff',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    // Add RTL support plugin
    function({ addUtilities }) {
      const newUtilities = {
        '.text-right': { 'text-align': 'right' },
        '.text-left': { 'text-align': 'left' },
        '.float-right': { 'float': 'right' },
        '.float-left': { 'float': 'left' },
        '.border-r': { 'border-right-width': '1px' },
        '.border-l': { 'border-left-width': '1px' },
        '.mr-2': { 'margin-right': '0.5rem' },
        '.ml-2': { 'margin-left': '0.5rem' },
        '.pr-2': { 'padding-right': '0.5rem' },
        '.pl-2': { 'padding-left': '0.5rem' },
      };
      
      addUtilities(newUtilities);
    }
  ],
}
