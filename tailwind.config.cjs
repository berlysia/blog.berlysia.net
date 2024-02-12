const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  prefix: "tw-",
  mode: "jit",
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        Lato: ["var(--font-family-lato)"],
      },
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
  plugins: [
    require("tailwindcss-logical"),
    plugin(({ addUtilities, theme }) => {
      addUtilities({
        ".writing-vertical-rl": {
          writingMode: "vertical-rl",
        },
        ".writing-horizontal-tb": {
          writingMode: "horizontal-tb",
        },
        ".tcu": {
          textCombineUpright: "all",
        },
        ".line-break-loose": {
          lineBreak: "loose",
        },
        ".line-break-strict": {
          lineBreak: "strict",
        },
        ".line-break-normal": {
          lineBreak: "normal",
        },
        ".column-fill-auto": {
          columnFill: "auto",
        },
        ".column-rule-size-1": {
          columnRuleWidth: "1px",
        },
        ".column-rule-style-solid": {
          columnRuleStyle: "solid",
        },
        ...Object.fromEntries(
          Object.keys(theme("colors.keyColor")).map((key) => {
            return [
              `.column-rule-color-keyColor-${key}`,
              { columnRuleColor: theme("colors.keyColor")[key] },
            ];
          })
        ),
      });
    }),
  ],
};
