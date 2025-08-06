import { Stack } from 'expo-router';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <TamaguiProvider config={config}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </TamaguiProvider>
  );
}