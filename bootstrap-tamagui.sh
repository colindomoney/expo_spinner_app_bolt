#!/bin/bash

# Bootstrap script to configure Tamagui after installation
# Run this after recreate-setup-yarn.sh or recreate-setup.sh

echo "=== Bootstrapping Tamagui Configuration ==="
echo ""

# Step 1: Create babel.config.js with Tamagui plugin
echo "Step 1: Creating babel.config.js..."
cat > babel.config.js << 'EOF'
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
EOF

# Step 2: Create tamagui.config.ts
echo "Step 2: Creating tamagui.config.ts..."
cat > tamagui.config.ts << 'EOF'
import { config } from '@tamagui/config/v3'
import { createTamagui } from 'tamagui'

const appConfig = createTamagui(config)

export type AppConfig = typeof appConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig
EOF

# Step 3: Update app.json for web platform
echo "Step 3: Updating app.json for web platform..."
cat > app.json << 'EOF'
{
  "expo": {
    "name": "test-app",
    "slug": "test-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "test-app",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "platforms": ["web"],
    "splash": {
      "image": "./assets/images/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router"
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}
EOF

# Step 4: Create app directory structure and _layout.tsx
echo "Step 4: Creating app directory and root layout..."
mkdir -p app
cat > app/_layout.tsx << 'EOF'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../tamagui.config';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme || 'light'}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
EOF

# Step 5: Create a basic index.tsx with Tamagui components
echo "Step 5: Creating app/index.tsx with Tamagui components..."
cat > app/index.tsx << 'EOF'
import { Button, H1, Paragraph, YStack, XStack, Card, Sheet, useSheet } from 'tamagui';
import { useState } from 'react';
import { ChevronDown } from '@tamagui/lucide-icons';

export default function HomeScreen() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);
  
  return (
    <YStack flex={1} padding="$4" backgroundColor="$background" justifyContent="center" alignItems="center" space="$4">
      <H1 color="$color" textAlign="center">Welcome to Tamagui + Expo</H1>
      
      <Paragraph size="$5" color="$color" textAlign="center">
        Your Expo SDK 53 + Tamagui setup is working! 🎉
      </Paragraph>

      <Card
        size="$4"
        bordered
        width={250}
        height={180}
        scale={0.9}
        hoverStyle={{ scale: 0.95 }}
        pressStyle={{ scale: 0.95 }}
        animation="quick"
      >
        <Card.Header padded>
          <H1 size="$5">Card Title</H1>
          <Paragraph theme="alt2">This is a Tamagui card component</Paragraph>
        </Card.Header>
        <Card.Footer padded>
          <XStack flex={1} />
          <Button borderRadius="$10">Open Sheet</Button>
        </Card.Footer>
      </Card>

      <Button
        size="$6"
        onPress={() => setOpen(true)}
        icon={ChevronDown}
        circular
        backgroundColor="$blue10"
      >
        Open Sheet
      </Button>

      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Sheet.Frame alignItems="center" justifyContent="center">
          <Sheet.Handle />
          <YStack padding="$4" space="$4">
            <H1 size="$6">Sheet Content</H1>
            <Paragraph size="$4">
              This is a Tamagui Sheet component. Drag down to close!
            </Paragraph>
            <Button
              size="$4"
              onPress={() => setOpen(false)}
            >
              Close Sheet
            </Button>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </YStack>
  );
}
EOF

# Step 6: Create tsconfig.json with proper paths
echo "Step 6: Creating tsconfig.json..."
cat > tsconfig.json << 'EOF'
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": false,
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
EOF

# Step 7: Install Lucide icons for the demo
echo "Step 7: Installing Lucide icons for demo components..."
if [ -f "yarn.lock" ]; then
  yarn add @tamagui/lucide-icons
else
  npm install @tamagui/lucide-icons --force
fi

echo ""
echo "=== Bootstrap Complete! ==="
echo ""
echo "Configuration files created:"
echo "✅ babel.config.js - Tamagui babel plugin configured"
echo "✅ tamagui.config.ts - Tamagui theme configuration"
echo "✅ app.json - Web platform enabled"
echo "✅ app/_layout.tsx - Root layout with TamaguiProvider"
echo "✅ app/index.tsx - Demo screen with Tamagui components"
echo "✅ tsconfig.json - TypeScript configuration"
echo ""
echo "To run your app:"
echo "  yarn start --web"
echo "  or"
echo "  npm start -- --web"
echo ""
echo "The app should now load with Tamagui components working!"