/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      padding: {
        '120px': '120px',
      },
      keyframes: {
        shake: {
          "0%": {
            letterSpacing: "-0.5em",
            opacity: "0",
          },
          "40%": {
            opacity: "0.6",
          },
          "100%": {
            opacity: "1",
          },
        },
        scaleFromCenter: {
          "0%": {
            transform: "scaleX(0.4)",
          },
          "100%": {
            transform: "scaleX(1)",
          },
        },
      },
    },
    plugins: [],
  },
};
