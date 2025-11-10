import { EducationData, Section } from "@/types/education";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import educationData from "@/assets/resources/education.json";
import { SectionViewer } from "@/components/education/section-viewer";
import { ThemedView } from "@/components/themed-view";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "react-native-paper";
import { ThemedText } from "@/components/themed-text";

const Page = () => {
  const { pageId } = useLocalSearchParams<{ pageId: string }>();
  const [section, setSection] = useState<Section | null>(null);
  const theme = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    const allSections = educationData as EducationData;
    setSection(
      allSections.sections.find((sec) => String(sec.id) === pageId) || null,
    );
  }, [pageId, navigation]);

  useEffect(() => {
    navigation.setOptions({
      title: section?.title.split(":")[1].trim(),
    });
  }, [section, navigation]);

  if (!section) {
    return (
      <ThemedView>
        <ThemedText>Sorry ntg here</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ParallaxScrollView
      headerImage={
        <IconSymbol
          size={310}
          color={theme.colors.surfaceVariant}
          name="book.fill"
        />
      }
    >
      <SectionViewer section={section} />
    </ParallaxScrollView>
  );
};

export default Page;
