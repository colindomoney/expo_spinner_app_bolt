import { Dimensions, Animated, TouchableOpacity, Text as RNText } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { YStack, XStack, H1, H2, Text, Paragraph, Card, Button, Progress, Stack } from 'tamagui';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [fabPressed, setFabPressed] = useState(false);
  const [isBlue, setIsBlue] = useState(true);
  
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
    </YStack>
  );
}