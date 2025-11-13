import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Education", headerShown: true }}
      />
      <Stack.Screen name="[pageId]" options={{ headerShown: true }} />
    </Stack>
  );
}
