import {
  DarkTheme as RouterDarkTheme,
  DefaultTheme as RouterDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper';

import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { AppDarkTheme, AppLightTheme } from '@/styles/theme';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { LoadingScreen } from '@/components/LoadingScreen';

export const unstable_settings = {
  anchor: '(tabs)',
};

function AllProviders({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider theme={colorScheme === 'dark' ? AppDarkTheme : AppLightTheme}>
      <ThemeProvider
        value={colorScheme === 'dark' ? RouterDarkTheme : RouterDefaultTheme}
      >
        <AuthProvider>
          <StatusBar style="auto" />
          {children}
        </AuthProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}

function RootLayoutNav() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <Stack.Screen name='./authapp/' />
      ) : (
        <Stack.Screen name="./auth/" />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AllProviders>
      <RootLayoutNav />
    </AllProviders>
  );
}
