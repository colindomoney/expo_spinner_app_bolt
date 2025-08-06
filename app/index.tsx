import { Dimensions, Animated, TouchableOpacity, Text as RNText } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { YStack, XStack, H1, H2, Text, Paragraph, Card, Button, Progress, Stack, Sheet, Switch, Slider, Avatar } from 'tamagui';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [fabPressed, setFabPressed] = useState(false);
  const [isBlue, setIsBlue] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [volume, setVolume] = useState(50);
  
  // Animation refs
  const progressAnim = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(1)).current;
  const fabScale = useRef(new Animated.Value(1)).current;
  const fabRotation = useRef(new Animated.Value(0)).current;
  
  // Animated progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev >= 100 ? 0 : prev + 2;
        Animated.timing(progressAnim, {
          toValue: newProgress,
          duration: 100,
          useNativeDriver: false,
        }).start();
        return newProgress;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [progressAnim]);

  const handleCardPress = () => {
    setIsCardOpen(!isCardOpen);
    Animated.sequence([
      Animated.timing(cardScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(cardScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleFabPress = () => {
    setFabPressed(!fabPressed);
    Animated.parallel([
      Animated.sequence([
        Animated.timing(fabScale, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(fabScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(fabRotation, {
        toValue: 360,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <YStack flex={1} backgroundColor="#0f0f23" alignItems="center" justifyContent="center" paddingHorizontal="$4">
      {/* Header Section */}
      <YStack alignItems="center" marginBottom="$8">
        <Stack padding="$5" backgroundColor="rgba(99, 102, 241, 0.1)" borderRadius="$10" borderWidth={2} borderColor="rgba(99, 102, 241, 0.3)" marginBottom="$5">
          <Text fontSize={60} textAlign="center">🚀</Text>
        </Stack>
        
        <H1 size="$9" color="white" textAlign="center" marginBottom="$3">
          Welcome to Your App
        </H1>
        <Paragraph size="$5" color="$gray10" textAlign="center">
          Ready to build something amazing?
        </Paragraph>
        <Link href="/test" asChild>
          <Text color="yellow" fontSize={20}>Go to TEST</Text>
        </Link>
        <Button
          backgroundColor={isBlue ? '#3b82f6' : '#10b981'}
          paddingVertical={6}
          paddingHorizontal={12}
          borderRadius={8}
          marginTop={16}
          pressStyle={{ opacity: 0.9, scale: 0.98 }}
          hoverStyle={{ 
            backgroundColor: isBlue ? '#2563eb' : '#059669',
            opacity: 1
          }}
          animation="quick"
          onPress={() => {
            console.log('Button pressed!');

            setIsBlue(prev => {
              console.log('=== BUTTON PRESS EVENT ===');
              console.log('Current isBlue before setState:', prev);
              console.log('Called setIsBlue with:', !prev);
              return !prev;
            });
          }}
          onPressIn={() => console.log('onPressIn fired')}
          onPressOut={() => console.log('onPressOut fired')}
        >
          <Text color="white" fontSize={16} textAlign="center">
            Toggle Background ({isBlue.toString()})
          </Text>
        </Button>
      </YStack>

      {/* Widget 1: Animated Progress Bar */}
      <YStack width="100%" maxWidth={400} marginBottom="$6">
        <H2 size="$6" color="white" textAlign="center" marginBottom="$4">
          Loading Awesome Features...
        </H2>
        <Progress value={progress} max={100} backgroundColor="rgba(255,255,255,0.1)" marginBottom="$2">
          <Progress.Indicator animation="quick" backgroundColor="#6366f1" />
        </Progress>
        <Text color="$gray11" textAlign="center" fontSize="$3">
          {Math.round(progress)}% Complete
        </Text>
      </YStack>

      {/* Widget 2: Interactive Card */}
      <Card
        elevate
        bordered
        padded
        pressStyle={{ scale: 0.95 }}
        animation="quick"
        onPress={handleCardPress}
        width="100%"
        maxWidth={400}
        marginBottom="$6"
        backgroundColor="rgba(255,255,255,0.05)"
        borderColor="rgba(255,255,255,0.1)"
      >
        <XStack marginBottom="$3">
          <Text fontSize={24} marginRight="$2">🎨</Text>
          <YStack flex={1}>
            <H2 size="$5" color="white" marginBottom="$1">
              Interactive Card
            </H2>
            <Paragraph size="$3" color="$gray10">
              Tap me to see the magic!
            </Paragraph>
          </YStack>
        </XStack>
        
        {isCardOpen && (
          <YStack borderTopWidth={1} borderTopColor="rgba(255,255,255,0.1)" paddingTop="$3">
            <Paragraph size="$3" color="$green10" textAlign="center" marginBottom="$2">
              ✨ Wow! You discovered the secret animation!
            </Paragraph>
            <XStack justifyContent="center" gap="$2">
              <Text fontSize={20}>🌟</Text>
              <Text fontSize={20}>💫</Text>
              <Text fontSize={20}>⭐</Text>
            </XStack>
          </YStack>
        )}
      </Card>

      {/* Widget 3: Floating Action Button */}
      <YStack alignItems="center" marginBottom="$6">
        <Button
          size="$6"
          circular
          backgroundColor={fabPressed ? '#10b981' : '#6366f1'}
          onPress={handleFabPress}
          pressStyle={{ scale: 0.8 }}
          hoverStyle={{ 
            backgroundColor: fabPressed ? '#059669' : '#4f46e5',
            opacity: 1
          }}
          animation="quick"
          width={80}
          height={80}
          marginBottom="$2"
        >
          <Text fontSize={24}>
            {fabPressed ? '✨' : '🎉'}
          </Text>
        </Button>
        
        <Text color="$gray11" textAlign="center" fontSize="$3">
          {fabPressed ? 'Amazing!' : 'Tap the floating button!'}
        </Text>
      </YStack>

      {/* Features Section */}
      <XStack justifyContent="space-around" width="100%" maxWidth={400}>
        <YStack alignItems="center" flex={1}>
          <Text fontSize={24} marginBottom="$2">⚡</Text>
          <Paragraph size="$2" color="$gray11" textAlign="center" fontWeight="500">
            Lightning Fast
          </Paragraph>
        </YStack>
        <YStack alignItems="center" flex={1}>
          <Text fontSize={24} marginBottom="$2">🎨</Text>
          <Paragraph size="$2" color="$gray11" textAlign="center" fontWeight="500">
            Beautiful Design
          </Paragraph>
        </YStack>
        <YStack alignItems="center" flex={1}>
          <Text fontSize={24} marginBottom="$2">📱</Text>
          <Paragraph size="$2" color="$gray11" textAlign="center" fontWeight="500">
            Mobile Ready
          </Paragraph>
        </YStack>
      </XStack>

      {/* Bento Grid Section */}
      <YStack width="100%" maxWidth={600} marginTop="$8" marginBottom="$6">
        <H2 size="$7" color="white" textAlign="center" marginBottom="$6">
          ✨ Feature Showcase
        </H2>
        
        {/* Bento Grid Layout */}
        <YStack gap="$3">
          {/* Top Row - Large Feature + Small Stats */}
          <XStack gap="$3" height={200}>
            {/* Main Feature Card */}
            <Card
              flex={2}
            hoverStyle={{ backgroundColor: "rgba(124, 58, 237, 0.9)" }}
            animation="quick"
          >
            <Text color="white" fontSize="$4" fontWeight="600">
              Test
            </Text>
          </Button>
        </Link>
      {/* Bento Grid Section */}
      <YStack width="100%" maxWidth={600} marginTop="$8" marginBottom="$6">
        <H2 size="$7" color="white" textAlign="center" marginBottom="$6">
          ✨ Feature Showcase
        </H2>
        
        {/* Bento Grid Layout */}
        <YStack gap="$3">
          {/* Top Row - Large Feature + Small Stats */}
          <XStack gap="$3" height={200}>
            {/* Main Feature Card */}
            <Card
              flex={2}
            pressStyle={{ scale: 0.95, backgroundColor: "rgba(147, 51, 234, 0.9)" }}
            hoverStyle={{ backgroundColor: "rgba(147, 51, 234, 0.9)" }}
            animation="quick"
          >
            <Text color="white" fontSize="$4" fontWeight="600">
              Test Page
            </Text>
          </Button>
        </Link>
      {/* Cool Sheet Trigger Button */}
      <Button
        size="$5"
        backgroundColor="rgba(139, 92, 246, 0.8)"
        color="white"
        marginTop="$6"
        pressStyle={{ scale: 0.95, backgroundColor: "rgba(124, 58, 237, 0.9)" }}
        hoverStyle={{ backgroundColor: "rgba(124, 58, 237, 0.9)" }}
        animation="quick"
        onPress={() => setSheetOpen(true)}
      >
        <Text color="white" fontSize="$4" fontWeight="600">
          🎛️ Open Control Panel
        </Text>
      </Button>

      {/* Tamagui Sheet - The Cool Part! */}
      <Sheet
        modal
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        snapPoints={[85]}
        dismissOnSnapToBottom
        animation="medium"
      >
        <Sheet.Overlay 
          animation="lazy" 
          enterStyle={{ opacity: 0 }} 
          exitStyle={{ opacity: 0 }} 
        />
        <Sheet.Handle backgroundColor="$gray8" />
        <Sheet.Frame backgroundColor="$background" padding="$4" borderTopLeftRadius="$6" borderTopRightRadius="$6">
          <YStack gap="$4">
            <XStack alignItems="center" justifyContent="space-between" marginBottom="$2">
              <H2 size="$7" color="white">Control Panel</H2>
              <Button
                size="$3"
                circular
                backgroundColor="rgba(239, 68, 68, 0.8)"
                onPress={() => setSheetOpen(false)}
                pressStyle={{ scale: 0.9 }}
              >
                <Text color="white" fontSize="$3">✕</Text>
              </Button>
            </XStack>

            {/* User Profile Section */}
            <Card backgroundColor="rgba(255,255,255,0.05)" borderColor="rgba(255,255,255,0.1)" padding="$4">
              <XStack alignItems="center" gap="$3" marginBottom="$3">
                <Avatar circular size="$6" backgroundColor="$purple10">
                  <Avatar.Image src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2" />
                  <Avatar.Fallback backgroundColor="$purple10">
                    <Text color="white" fontSize="$5">👤</Text>
                  </Avatar.Fallback>
                </Avatar>
                <YStack flex={1}>
                  <Text color="white" fontSize="$5" fontWeight="600">Alex Developer</Text>
                  <Text color="$gray10" fontSize="$3">Premium User</Text>
                </YStack>
              </XStack>
            </Card>

            {/* Settings Section */}
            <Card backgroundColor="rgba(255,255,255,0.05)" borderColor="rgba(255,255,255,0.1)" padding="$4">
              <H2 size="$5" color="white" marginBottom="$4">Settings</H2>
              
              <XStack alignItems="center" justifyContent="space-between" marginBottom="$4">
                <YStack>
                  <Text color="white" fontSize="$4" fontWeight="500">Dark Mode</Text>
                  <Text color="$gray10" fontSize="$2">Toggle theme appearance</Text>
                </YStack>
                <Switch
                  size="$4"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  backgroundColor={darkMode ? "$purple10" : "$gray8"}
                >
                  <Switch.Thumb animation="quick" backgroundColor="white" />
                </Switch>
              </XStack>

              <YStack gap="$2">
                <XStack alignItems="center" justifyContent="space-between">
                  <Text color="white" fontSize="$4" fontWeight="500">Volume</Text>
                  <Text color="$purple10" fontSize="$3" fontWeight="600">{Math.round(volume)}%</Text>
                </XStack>
                <Slider
                  value={[volume]}
                  onValueChange={(value) => setVolume(value[0])}
                  max={100}
                  step={1}
                  backgroundColor="rgba(255,255,255,0.1)"
                >
                  <Slider.Track backgroundColor="rgba(255,255,255,0.2)">
                    <Slider.TrackActive backgroundColor="$purple10" />
                  </Slider.Track>
                  <Slider.Thumb size="$1" index={0} backgroundColor="white" borderColor="$purple10" borderWidth={2} />
                </Slider>
              </YStack>
            </Card>

            {/* Action Buttons */}
            <XStack gap="$3" justifyContent="center" marginTop="$4">
              <Button
                flex={1}
                backgroundColor="rgba(34, 197, 94, 0.8)"
                pressStyle={{ scale: 0.95, backgroundColor: "rgba(22, 163, 74, 0.9)" }}
                hoverStyle={{ backgroundColor: "rgba(22, 163, 74, 0.9)" }}
              >
                <Text color="white" fontWeight="600">Save</Text>
              </Button>
              <Button
                flex={1}
                backgroundColor="rgba(168, 85, 247, 0.8)"
                pressStyle={{ scale: 0.95, backgroundColor: "rgba(147, 51, 234, 0.9)" }}
                hoverStyle={{ backgroundColor: "rgba(147, 51, 234, 0.9)" }}
              >
                <Text color="white" fontWeight="600">Share</Text>
              </Button>
            </XStack>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </YStack>
  );
}