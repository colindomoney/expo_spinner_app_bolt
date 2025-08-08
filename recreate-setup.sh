#!/bin/bash

# Script to recreate this exact Expo + Tamagui setup
# This handles the React version compatibility between Expo SDK 53 (React 19.0.0) and Tamagui

echo "=== Recreating Expo SDK 53 + Tamagui 1.132.16 Setup ==="
echo "Note: This setup uses React 19.0.0 from Expo SDK 53"
echo ""

# Step 1: Create a new Expo app with SDK 53
echo "Step 1: Creating new Expo app..."
npx create-expo-app@latest test-app --template blank-typescript@sdk-53

if [ $? -ne 0 ]; then
  echo "Alternative: trying with expo init..."
  npx expo@~53.0.0 init test-app --template blank-typescript
fi

cd test-app

# Step 2: Ensure we have Expo SDK 53.0.20 exactly
echo ""
echo "Step 2: Installing exact Expo SDK version..."
npm install expo@53.0.20 --save-exact

# Step 3: Install web dependencies for Expo
echo ""
echo "Step 3: Installing web dependencies..."
npx expo install react-dom react-native-web @expo/metro-runtime

# Step 4: Check the React version installed
echo ""
echo "Step 4: Verifying React version..."
npm ls react --depth=0

# Step 5: Install Tamagui with --force to override peer dependency warnings
echo ""
echo "Step 5: Installing Tamagui packages (using --force to handle peer deps)..."
npm install --force --save-exact \
  tamagui@1.132.16 \
  @tamagui/config@1.132.16 \
  @tamagui/animations-react-native@1.132.16 \
  @tamagui/babel-plugin@1.132.16 \
  @tamagui/core@1.132.16 \
  @tamagui/font-inter@1.132.16 \
  @tamagui/react-native-media-driver@1.132.16 \
  @tamagui/shorthands@1.132.16 \
  @tamagui/theme-base@1.132.16 \
  @tamagui/themes@1.132.16

# Alternative approach if --force doesn't work
if [ $? -ne 0 ]; then
  echo ""
  echo "Alternative: Installing with --legacy-peer-deps..."
  npm install --legacy-peer-deps --save-exact \
    tamagui@1.132.16 \
    @tamagui/config@1.132.16 \
    @tamagui/animations-react-native@1.132.16 \
    @tamagui/babel-plugin@1.132.16 \
    @tamagui/core@1.132.16 \
    @tamagui/font-inter@1.132.16 \
    @tamagui/react-native-media-driver@1.132.16 \
    @tamagui/shorthands@1.132.16 \
    @tamagui/theme-base@1.132.16 \
    @tamagui/themes@1.132.16
fi

# Step 6: Verify the installation
echo ""
echo "Step 6: Final verification..."
echo "Installed versions:"
npm ls react react-native expo tamagui --depth=0

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Key points about this setup:"
echo "- React 19.0.0 (from Expo SDK 53)"
echo "- React Native 0.79.5"
echo "- Tamagui 1.132.16 (works with React 19.0.0 due to wildcard peer dep)"
echo "- Use --force or --legacy-peer-deps if you see peer dependency warnings"
echo ""
echo "Note: You'll see Reanimated warnings about babel plugin - these are harmless"
echo "The app will still bundle and run correctly despite these warnings."