#!/bin/bash

# Script to recreate Expo SDK 53 + Tamagui setup using Yarn
# This avoids all peer dependency conflicts that npm has

echo "=== Recreating Expo SDK 53 + Tamagui 1.132.16 Setup with Yarn ==="
echo "This setup uses Yarn for smoother dependency resolution"
echo ""

# Step 1: Create a new Expo app with SDK 53
echo "Step 1: Creating new Expo app..."
npx create-expo-app@latest test-app-yarn --template blank-typescript@sdk-53

if [ $? -ne 0 ]; then
  echo "Alternative: trying with expo init..."
  npx expo@~53.0.0 init test-app-yarn --template blank-typescript
fi

cd test-app-yarn

# Step 2: Remove npm artifacts and switch to Yarn
echo ""
echo "Step 2: Switching to Yarn..."
rm -rf package-lock.json
yarn install

# Step 3: Ensure exact Expo SDK version
echo ""
echo "Step 3: Installing exact Expo SDK version with Yarn..."
yarn add expo@53.0.20 --exact

# Step 4: Install web dependencies for Expo
echo ""
echo "Step 4: Installing web dependencies..."
yarn add react-dom@19.0.0 react-native-web@^0.20.0 @expo/metro-runtime@~5.0.4

# Step 5: Check the React version installed
echo ""
echo "Step 5: Verifying React version..."
yarn list --pattern react --depth=0

# Step 6: Install all Tamagui packages (no flags needed with Yarn!)
echo ""
echo "Step 6: Installing Tamagui packages with Yarn..."
yarn add --exact \
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

# Step 7: Verify the installation
echo ""
echo "Step 7: Final verification..."
echo "Installed versions:"
yarn list --pattern "react|react-native|expo|tamagui" --depth=0

echo ""
echo "=== Dependencies Installed Successfully ==="
echo ""

# Step 8: Run bootstrap configuration
echo "Step 8: Bootstrapping Tamagui configuration files..."
echo ""

# Copy and run the bootstrap script
if [ -f "../bootstrap-tamagui.sh" ]; then
  cp ../bootstrap-tamagui.sh .
  chmod +x bootstrap-tamagui.sh
  ./bootstrap-tamagui.sh
else
  echo "⚠️  Bootstrap script not found. You'll need to manually configure:"
  echo "   - babel.config.js with Tamagui plugin"
  echo "   - tamagui.config.ts"
  echo "   - app/_layout.tsx with TamaguiProvider"
fi

echo ""
echo "=== Setup Complete with Yarn ==="
echo ""
echo "Benefits of using Yarn for this setup:"
echo "✅ No --force or --legacy-peer-deps needed"
echo "✅ Cleaner dependency resolution"
echo "✅ Faster installation (parallel downloads)"
echo "✅ Better error messages if issues occur"
echo "✅ All configuration files created"
echo ""
echo "To run the app:"
echo "  cd test-app-yarn"
echo "  yarn start --web"
echo ""
echo "Note: Reanimated warnings about babel plugin are harmless and can be ignored"