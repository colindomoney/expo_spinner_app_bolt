# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm start` or `npm run dev` - Start Expo development server (web-only)
- `npx expo start` - Alternative way to start the development server

### Installation
- `npm install` - Install dependencies

## Architecture

This is a **web-only Expo React Native application** using Expo SDK 53 with Expo Router for file-based routing and Tamagui as the UI framework.

### Technology Stack
- **React 19.0.0** with React Native 0.79.5
- **Expo SDK ~53.0.20** configured exclusively for web platform
- **Tamagui v1.132.16** - Complete UI component library and design system
- **Expo Router ~5.1.4** - File-based routing via `/app` directory
- **Metro bundler** for web builds (not webpack)
- **New Architecture** enabled (`newArchEnabled: true` in app.json)

### Routing Structure
Routes are automatically generated from the `/app` directory structure:
- `/app/_layout.tsx` - Root layout with TamaguiProvider wrapper
- `/app/index.tsx` - Main splash screen with interactive widgets
- `/app/test.tsx` - Minimal testing component
- Navigation uses Expo Router's `Link` component

### Tamagui Integration
The project uses a comprehensive Tamagui setup:
- Configuration in `tamagui.config.ts` extends Tamagui v3 base config
- Root layout wraps app with `TamaguiProvider`
- Components use Tamagui's design tokens and theme system
- Includes animations via `@tamagui/animations-react-native`

### Framework Integration Hook
The `/hooks/useFrameworkReady.ts` hook calls `window.frameworkReady?.()` when components mount. This integration point is used by external tools or deployment systems and is initialized in the root layout.

### TypeScript Configuration
- Extends Expo's base TypeScript config
- Path alias `@/*` maps to root directory
- Strict mode is disabled (`"strict": false`)
- Global Window interface extended for `frameworkReady`

## Project Structure

```
app/           # Expo Router screens and layouts (file-based routing)
hooks/         # Custom React hooks including useFrameworkReady
assets/        # Images and static resources  
tamagui.config.ts  # Tamagui UI framework configuration
```

## Package Versions and Compatibility

### Core Dependencies
```json
{
  "react": "19.0.0",
  "react-native": "0.79.5",
  "expo": "~53.0.20",
  "tamagui": "^1.132.16"
}
```

### Version Compatibility Explanation
This setup works without conflicts because:
1. **Tamagui v1.132.16** declares `react: "*"` as its peer dependency, accepting any React version
2. **Expo SDK 53** also declares `react: "*"`, making it compatible with React 19.0.0
3. **npm's dependency resolution** deduplicates to a single React 19.0.0 installation
4. Although Tamagui's latest versions are tested with React 19.1, it maintains backward compatibility with React 19.0.0

### Installation from Scratch

#### Method 1: Using create-expo-app (Recommended)
```bash
# Create Expo app with SDK 53 template
npx create-expo-app@latest my-app --template blank-typescript@sdk-53
cd my-app

# Install web support dependencies (REQUIRED for web-only app)
npx expo install react-dom react-native-web @expo/metro-runtime

# Install Tamagui with --force to handle peer dependency warnings
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
```

#### Method 2: Manual package.json approach
Create a `package.json` with exact versions, then run `npm install`:
```json
{
  "dependencies": {
    "expo": "53.0.20",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "react-native": "0.79.5",
    "react-native-web": "^0.20.0",
    "@expo/metro-runtime": "~5.0.4",
    "tamagui": "1.132.16"
    // ... other Tamagui packages
  }
}
```

**Important**: Use `--force` or `--legacy-peer-deps` flags when installing Tamagui to bypass peer dependency warnings about React versions.

### Alternative: Using Yarn
This project can also use Yarn, which handles the React version compatibility automatically:
```bash
# Remove npm artifacts and switch to Yarn
rm -rf node_modules package-lock.json
yarn install

# Future installations work without flags
yarn add [package-name]
```

The peer dependency warnings are an npm v7+ strictness issue, not an actual incompatibility. Both npm (with flags) and Yarn (without flags) produce a working application.

### Why This Works Despite Version Differences
- **Peer dependency flexibility**: Both Expo and Tamagui use wildcard (`*`) for React peer dependencies
- **Semantic versioning**: React 19.0.0 and 19.1.x maintain API compatibility within the major version
- **npm deduplication**: npm resolves to a single React instance (19.0.0) that satisfies all requirements
- **Runtime compatibility**: Tamagui's components work with React 19.0.0 despite being developed against 19.1

## Development Notes

- No testing framework currently configured
- No linting or formatting tools set up
- Components use both Tamagui components and React Native StyleSheet
- The main screen demonstrates advanced Tamagui components: Sheet, Progress, Avatar, Switch, Slider
- Animations use both React Native Animated API and Tamagui's animation system

### Known Warnings
- **Reanimated Babel plugin warnings**: You'll see repeated warnings about `react-native-reanimated/plugin` needing to move to `react-native-worklets/plugin`. These are harmless and the app bundles correctly despite them.