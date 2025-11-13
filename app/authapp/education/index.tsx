import { StyleSheet } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";

// Import the JSON data
import educationData from "@/assets/resources/education.json";
import { useTheme } from "react-native-paper";
import { EducationData, Section } from "@/types/education";
import EducationCard from "@/components/education/card";
import ParallaxScrollView from "@/components/parallax-scroll-view";

export default function EducationScreen() {
  const data = educationData as EducationData;
  const theme = useTheme();

  return (
    <ParallaxScrollView
      headerImage={
        <IconSymbol
          size={310}
          color={theme.colors.surfaceVariant}
          name="book.fill"
          style={styles.headerImage}
        />
      }
    >
      {data.sections.map((section: Section, index: number) => (
        <EducationCard
          title={section.title}
          key={index}
          id={section.id}
          summary={section.summary}
        />
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    marginBottom: 16,
    opacity: 0.8,
  },
  sectionContainer: {
    marginBottom: 24,
  },
});
