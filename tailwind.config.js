/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#1a1a1a',
        neutral: '#333333',
        greenAccent: '#007f3e',
      },
    },
  },
  plugins: [],
};
