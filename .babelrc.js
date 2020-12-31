const isProd = process.env.NODE_ENV === "production";

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "styled-components",
      { ssr: true, displayName: !isProd, preprocess: false },
    ],
    [
      "transform-rename-import",
      { original: "^rebass$", replacement: "rebass/styled-components" },
    ],
  ],
};
