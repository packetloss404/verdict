/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'Helvetica Neue', 'sans-serif'],
      serif: ['Georgia', 'Times New Roman', 'serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
    },
    extend: {},
  },
  plugins: [],
};
