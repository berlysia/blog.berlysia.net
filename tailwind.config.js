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
    },
  },
  variants: {
    extend: {
      textColor: ["visited"],
    },
  },
  plugins: [],
};
