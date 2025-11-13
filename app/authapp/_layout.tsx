import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.outline,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="education"
        options={{
          title: 'Education',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="chevron.left.forwardslash.chevron.right"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
