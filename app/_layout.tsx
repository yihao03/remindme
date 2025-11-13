import {
  DarkTheme as RouterDarkTheme,
  DefaultTheme as RouterDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper';

import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useEffect } from 'react';
import { AppDarkTheme, AppLightTheme } from '@/styles/theme';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

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
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!user && !inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace('/auth/login');
    } else if (user && inAuthGroup) {
      // Redirect to main app if authenticated
      router.replace('/(tabs)');
    }
  }, [user, loading, segments, router]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      <Stack.Screen name="education" />
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
