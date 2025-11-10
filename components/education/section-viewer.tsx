import React from "react";
import { StyleSheet } from "react-native";
import { Collapsible } from "@/components/ui/collapsible";
import { ThemedView } from "@/components/themed-view";
import { ContentRenderer } from "./content-renderer";
import { Section } from "@/types/education";
import { spacing } from "@/styles/constants";

interface SectionViewerProps {
  section: Section;
}

export function SectionViewer({ section }: SectionViewerProps) {
  return (
    <ThemedView style={styles.container}>
      {section.subsections.map((subsection, index) => (
        <Collapsible key={index} title={subsection.title}>
          <ContentRenderer content={subsection.content} />
        </Collapsible>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
});
