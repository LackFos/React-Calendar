/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        calendar: {
          primary: '#F68C54',
          hover: '#FFEDD5',
          dark: '612505',
        },
      },
    },
  },
  plugins: [],
}
