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
        // セマンティックトークン
        semantic: {
          // 背景色
          bg: {
            primary: "#ffffff",
            surface: "#fdf2f8",
            elevated: "#fce7f3",
            overlay: "rgba(0,0,0,0.5)",
          },
          // テキスト色
          text: {
            primary: "#223333",
            secondary: "#1f2937",
            muted: "#4b5563",
            accent: "#db2777",
            inverse: "#ffffff",
          },
          // ボーダー色
          border: {
            subtle: "#e5e7eb",
            default: "#9ca3af",
            accent: "#f9a8d4",
            focus: "#db2777",
          },
          // 状態色
          state: {
            hover: "#fce7f3",
            active: "#fbcfe8",
            focus: "#f9a8d4",
            disabled: "#f3f4f6",
          },
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
    // セマンティッククラス生成プラグイン
    plugin(({ addUtilities, theme }) => {
      const semanticUtilities = {};

      // セマンティック背景色 - ダークモードマッピング
      const semanticToDarkBgMapping = {
        primary: theme("colors.dark.bg.primary"),
        surface: theme("colors.dark.bg.tertiary"),
        elevated: theme("colors.dark.keyColor.100"),
        overlay: "rgba(0,0,0,0.8)",
      };

      // セマンティックテキスト色 - ダークモードマッピング
      const semanticToDarkTextMapping = {
        primary: theme("colors.dark.text.primary"),
        secondary: theme("colors.dark.text.secondary"),
        muted: theme("colors.dark.text.muted"),
        accent: theme("colors.dark.text.accent"),
        inverse: "#000000",
      };

      // セマンティックボーダー色 - ダークモードマッピング
      const semanticToDarkBorderMapping = {
        subtle: theme("colors.dark.border.primary"),
        default: theme("colors.dark.border.secondary"),
        accent: theme("colors.dark.border.accent"),
        focus: theme("colors.dark.text.accent"),
      };

      // 背景色クラス
      const bgColors = theme("colors.semantic.bg");
      for (const key of Object.keys(bgColors)) {
        semanticUtilities[`.bg-semantic-${key}`] = {
          backgroundColor: bgColors[key],
        };
        if (semanticToDarkBgMapping[key]) {
          semanticUtilities[`.dark .bg-semantic-${key}`] = {
            backgroundColor: semanticToDarkBgMapping[key],
          };
        }
      }

      // テキスト色クラス
      const textColors = theme("colors.semantic.text");
      for (const key of Object.keys(textColors)) {
        semanticUtilities[`.text-semantic-${key}`] = {
          color: textColors[key],
        };
        if (semanticToDarkTextMapping[key]) {
          semanticUtilities[`.dark .text-semantic-${key}`] = {
            color: semanticToDarkTextMapping[key],
          };
        }
      }

      // ボーダー色クラス
      const borderColors = theme("colors.semantic.border");
      for (const key of Object.keys(borderColors)) {
        semanticUtilities[`.border-semantic-${key}`] = {
          borderColor: borderColors[key],
        };
        if (semanticToDarkBorderMapping[key]) {
          semanticUtilities[`.dark .border-semantic-${key}`] = {
            borderColor: semanticToDarkBorderMapping[key],
          };
        }
      }

      // 状態色クラス
      const stateColors = theme("colors.semantic.state");
      const darkKeyColors = theme("colors.dark.keyColor");
      for (const key of Object.keys(stateColors)) {
        semanticUtilities[`.bg-state-${key}`] = {
          backgroundColor: stateColors[key],
        };
        // ダークモード用状態色
        const darkStateMapping = {
          hover: darkKeyColors[100],
          active: darkKeyColors[200],
          focus: darkKeyColors[300],
          disabled: theme("colors.dark.bg.secondary"),
        };
        if (darkStateMapping[key]) {
          semanticUtilities[`.dark .bg-state-${key}`] = {
            backgroundColor: darkStateMapping[key],
          };
        }
      }

      addUtilities(semanticUtilities);
    }),
  ],
};
