import React from "react";
import { View, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  spacing,
  fontSize,
  lineHeight,
  borderRadius,
} from "@/styles/constants";

interface ContentItem {
  type: "paragraph" | "header" | "list" | "link" | "table";
  text?: string;
  items?: string[];
  url?: string;
  note?: string;
}

interface ContentRendererProps {
  content: ContentItem[];
}

export function ContentRenderer({ content }: ContentRendererProps) {
  const renderContentItem = (item: ContentItem, index: number) => {
    switch (item.type) {
      case "paragraph":
        return (
          <ThemedText key={index} style={styles.paragraph}>
            {item.text}
          </ThemedText>
        );

      case "header":
        return (
          <ThemedText key={index} type="defaultSemiBold" style={styles.header}>
            {item.text}
          </ThemedText>
        );

      case "list":
        return (
          <View key={index} style={styles.listContainer}>
            {item.items?.map((listItem, listIndex) => (
              <View key={listIndex} style={styles.listItem}>
                <ThemedText style={styles.bullet}>•</ThemedText>
                <ThemedText style={styles.listText}>{listItem}</ThemedText>
              </View>
            ))}
          </View>
        );

      case "link":
        return (
          <TouchableOpacity
            key={index}
            onPress={() => item.url && Linking.openURL(item.url)}
            style={styles.linkContainer}
          >
            <ThemedText type="link" style={styles.link}>
              {item.text || item.url}
            </ThemedText>
          </TouchableOpacity>
        );

      case "table":
        return (
          <ThemedView key={index} style={styles.tableNote}>
            <ThemedText style={styles.tableNoteText}>
              📊 {item.note || "Table content available in full version"}
            </ThemedText>
          </ThemedView>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {content.map((item, index) => renderContentItem(item, index))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  paragraph: {
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
  },
  header: {
    fontSize: fontSize.lg,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  listContainer: {
    gap: spacing.sm,
  },
  listItem: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingLeft: spacing.sm,
  },
  bullet: {
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    marginTop: -2,
  },
  listText: {
    flex: 1,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
  },
  linkContainer: {
    paddingVertical: spacing.xs,
  },
  link: {
    fontSize: fontSize.md,
    textDecorationLine: "underline",
  },
  tableNote: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  tableNoteText: {
    fontSize: fontSize.sm,
    fontStyle: "italic",
  },
});
