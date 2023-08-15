/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      hoverGrayBG: "#e5e5e5",
      selectedGrayBG: "#f2f2f2",
      selectedBlackBG: "#0e0e0f",
      white: "#fff",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
