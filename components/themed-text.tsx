import { StyleSheet, Text, type TextProps } from "react-native";

import { useTheme } from "react-native-paper";
import { fontSize, lineHeight } from "@/styles/constants";

export type ThemedTextProps = TextProps & {
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme.colors.onBackground },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
  },
  defaultSemiBold: {
    fontSize: fontSize.lg,
    lineHeight: lineHeight.md,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: fontSize.xl,
    fontWeight: "bold",
  },
  link: {
    fontSize: fontSize.md,
    lineHeight: lineHeight.xl,
    color: "#0a7ea4",
  },
});
