import React from "react";
import { View, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

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
    gap: 12,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
  },
  header: {
    fontSize: 17,
    marginTop: 8,
    marginBottom: 4,
  },
  listContainer: {
    gap: 8,
  },
  listItem: {
    flexDirection: "row",
    gap: 8,
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: -2,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  linkContainer: {
    paddingVertical: 4,
  },
  link: {
    fontSize: 15,
    textDecorationLine: "underline",
  },
  tableNote: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  tableNoteText: {
    fontSize: 14,
    fontStyle: "italic",
  },
});
