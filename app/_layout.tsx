import {
  DarkTheme as RouterDarkTheme,
  DefaultTheme as RouterDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { PaperProvider, useTheme } from "react-native-paper";

import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";

export const unstable_settings = {
  anchor: "(tabs)",
};

function AllProviders({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider>
      <ThemeProvider
        value={colorScheme === "dark" ? RouterDarkTheme : RouterDefaultTheme}
      >
        <StatusBar style="auto" />
        {children}
      </ThemeProvider>
    </PaperProvider>
  );
}

export default function RootLayout() {
  const theme = useTheme();
  return (
    <AllProviders>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors.outline,
          headerShown: false,
          tabBarButton: HapticTab,
        }}
      >
        <Tabs.Screen
          name="modal"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="education"
          options={{
            title: "Education",
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
    </AllProviders>
  );
}
