/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'borderWhite': '0px 0px 0px 1px #ffffff inset',
        'inputShadow': '0px 0px 18px -6px #474A52 inset',
        'buttonShadow': '0px 0px 20px 0px #474A52 inset',
        'boxShadow': '0px 0px 8px 0px #474A52 inset',
        'hoverShadow': '0px 0px 6px 2px #000000',
        'searchShadow': '0px 3px 2px 2px #C7C3C5',
        'cardShadow': '0px 2px 0px 3px #C7C3C5',
        'fbShadow': '0px 1px 0px 2px #C7C3C5',
        'tbShadow': '0px 0px 0px 1px #C7C3C5',
        'tableShadow': '0px 2px 4px 1px #C7C3C5',
      },
    },
  },
  plugins: [],
}

