import { DarkTheme as RouterDarkTheme, DefaultTheme as RouterDefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper';

import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';

export const unstable_settings = {
  anchor: '(tabs)',
};

function AllProviders({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === 'dark' ? RouterDarkTheme : RouterDefaultTheme}>
        <StatusBar style="auto" />
        {children}
      </ThemeProvider>
    </PaperProvider>
  )
}

export default function RootLayout() {
  return (
    <AllProviders>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
    </AllProviders>
  );
}
