# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm start` or `npm run dev` - Start Expo development server (web-only)
- `npx expo start` - Alternative way to start the development server

### Installation
- `npm install` - Install dependencies

## Architecture

This is a **web-only Expo React Native application** using Expo SDK 53 with Expo Router for file-based routing. Key architectural decisions:

### Routing Structure
- **Expo Router** (`~5.1.4`) provides file-based routing via the `/app` directory
- `/app/_layout.tsx` - Root layout wrapper
- `/app/index.tsx` - Main entry screen
- Routes are automatically generated from file structure

### Platform Configuration
- Configured exclusively for web platform in `app.json` with `"platforms": ["web"]`
- Uses Metro bundler for web builds instead of webpack
- React Native Web (`^0.20.0`) enables web rendering
- React Native 0.79.5 with React 19.0.0
- New Architecture enabled by default (`newArchEnabled: true` in app.json)

### Framework Integration Hook
The codebase includes a unique `useFrameworkReady` hook in `/hooks/useFrameworkReady.ts` that calls `window.frameworkReady?.()` when components mount. This integration point is likely used by external tools or deployment systems.

### TypeScript Configuration
- Strict mode enabled for type safety
- Path alias `@/*` maps to root directory
- Extends Expo's base TypeScript configuration

## Project Structure

```
app/           # Expo Router screens and layouts
hooks/         # Custom React hooks including useFrameworkReady
assets/        # Images and static resources
```

## Development Notes

- No testing framework currently configured
- No linting or formatting tools set up
- Metro bundler handles web bundling
- Components use inline StyleSheet definitions
- The app showcases a modern dark theme splash screen with interactive elements