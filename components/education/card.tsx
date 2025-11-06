import { Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { spacing } from '@/styles/constants';

interface EducationalCardProps {
  title: string;
  id: Number;
  shortDescription: string;
}

export default function EducationCard({ title, shortDescription }: EducationalCardProps) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.title}>{title}</Text>
        <Text variant="bodyMedium">{shortDescription}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: spacing.sm,
  },
  title: {
    marginBottom: spacing.xs,
  },
});
