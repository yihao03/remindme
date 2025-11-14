import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { DefaultTheme } from "react-native-paper";
import lightTheme from "@/assets/themes/light-theme.json";
import darkTheme from "@/assets/themes/dark-theme.json";

export const AppLightTheme: ThemeProp = {
  ...DefaultTheme,
  colors: lightTheme.colors,
};

export const AppDarkTheme: ThemeProp = {
  ...DefaultTheme,
  colors: darkTheme.colors,
};
