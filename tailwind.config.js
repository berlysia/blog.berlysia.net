const colors = require("tailwindcss/colors");

module.exports = {
  prefix: "tw-",
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx,astro}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        "fade-blink": {
          "0%": {
            opacity: 0,
          },
          "50%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
      },
      animation: {
        "fade-blink": "fade-blink 3s ease-in-out infinite",
      },
      colors: {
        keyColor: colors.pink,
      },
    },
    // fontSize: {
    //   sm: '0.8rem',
    //   base: '1rem',
    //   xl: '1.25rem',
    //   "2xl": '1.563rem',
    //   "3xl": '1.953rem',
    //   "4xl": '2.441rem',
    //   "5xl": '3.052rem',
    // }
  },
  variants: {
    extend: {
      textColor: ["visited"],
    },
  },
  plugins: [],
};
