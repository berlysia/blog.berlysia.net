const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  prefix: "tw-",
  mode: "jit",
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector", // or 'media' or 'class' or 'selector'
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
        keyColor: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
        },
        // ダークモード専用カラーパレット
        dark: {
          bg: {
            primary: "#0f1419",
            secondary: "#1a1d24",
            tertiary: "#2d1b27",
          },
          text: {
            primary: "#e5e7eb",
            secondary: "#d1d5db",
            muted: "#9ca3af",
            accent: "#e5a8c8",
          },
          border: {
            primary: "#374151",
            secondary: "#4d2d43",
            accent: "#5d3651",
          },
          keyColor: {
            50: "#2d1b27",
            100: "#3d2435",
            200: "#4d2d43",
            300: "#5d3651",
            400: "#c084a3",
            500: "#d896bb",
            600: "#e5a8c8",
            700: "#f2bad5",
            800: "#f7cce0",
            900: "#fbdde8",
          },
        },
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
