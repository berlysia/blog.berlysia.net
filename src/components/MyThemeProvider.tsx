import theme from "@rebass/preset";
import { ThemeProvider } from "emotion-theming";
import { merge } from "lodash";

const dayTheme = merge(theme, {
  colors: {
    text: "#233",
    backgrounds: ["#FBFFB9", "#fff5cf"],
  },
});

const nightTheme = merge(theme);

export const MyThemeProvider: React.FC<{ daylight: boolean }> = props => (
  <ThemeProvider theme={props.daylight ? dayTheme : nightTheme}>
    {props.children}
  </ThemeProvider>
);
