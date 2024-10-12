/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark_gray: "#1D1916",
        light_gray: "#717171",
        light_brown_1: "#7A695A",
        light_brown_2: "#927E6C",
        light_brown_3: "#B6A99D",
        light_white: "#F6F4F3"
      },
      fontFamily: {
        "garamond": ["EB Garamond", "sans-serif"],
        "roboto": ["Roboto", "sans-serif"],
      },
      animation: {
        bounce: 'bounce 1s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'scale(0.0)' },
          '50%': { transform: 'scale(1.0)' },
        },
      },
    },
  },
  plugins: [],
}

