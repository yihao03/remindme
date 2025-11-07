import { Card, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { spacing } from "@/styles/constants";
import { Link } from "expo-router";

interface EducationalCardProps {
  title: string;
  id: number;
  shortDescription: string;
}

export default function EducationCard({
  title,
  id,
  shortDescription,
}: EducationalCardProps) {
  return (
    <Link
      href={{
        pathname: "/education/[pageId]",
        params: { pageId: id },
      }}
    >
      <Card style={styles.card} key={id}>
        <Card.Content style={styles.content}>
          <View>
            <Text
              variant="titleLarge"
              style={styles.title}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
            <Text
              variant="bodyMedium"
              style={styles.description}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {shortDescription}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: spacing.sm,
    height: 140,
    width: "100%",
  },
  content: {
    height: "100%",
    justifyContent: "flex-start",
  },
  title: {
    marginBottom: spacing.xs,
    fontWeight: "600",
  },
  description: {
    opacity: 0.7,
  },
});
