import React from 'react';
import { ScrollView } from 'react-native';
import { 
  YStack, 
  XStack, 
  Text, 
  Card,
  LinearGradient,
  Circle
} from '@tamagui/core';
import { InteractiveCard } from '@/components/InteractiveCard';
import { StatsWidget } from '@/components/StatsWidget';
import { AnimatedButton } from '@/components/AnimatedButton';
import { Sparkles, Palette, Smartphone } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={['$blue2', '$purple2', '$pink2']}
      style={{ flex: 1 }}
    >
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 40, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <YStack space="$4" alignItems="center">
          {/* Header */}
          <YStack alignItems="center" space="$3" marginBottom="$4">
            <Circle size="$8" backgroundColor="$blue9" padding="$3">
              <Sparkles size={32} color="white" />
            </Circle>
            
            <Text 
              fontSize="$9" 
              fontWeight="bold" 
              color="$gray12"
              textAlign="center"
              letterSpacing={-1}
            >
              Tamagui Showcase
            </Text>
            
            <Text 
              fontSize="$4" 
              color="$gray10" 
              textAlign="center"
              maxWidth={300}
              lineHeight="$2"
            >
              Beautiful, performant React Native components with amazing animations
            </Text>
          </YStack>

          {/* Feature highlights */}
          <XStack space="$3" marginBottom="$4">
            <Card flex={1} padding="$3" backgroundColor="$background" borderRadius="$4">
              <YStack alignItems="center" space="$2">
                <Palette size={24} color="$purple10" />
                <Text fontSize="$3" fontWeight="600" color="$gray11" textAlign="center">
                  Themeable
                </Text>
              </YStack>
            </Card>
            
            <Card flex={1} padding="$3" backgroundColor="$background" borderRadius="$4">
              <YStack alignItems="center" space="$2">
                <Zap size={24} color="$yellow10" />
                <Text fontSize="$3" fontWeight="600" color="$gray11" textAlign="center">
                  Fast
                </Text>
              </YStack>
            </Card>
            
            <Card flex={1} padding="$3" backgroundColor="$background" borderRadius="$4">
              <YStack alignItems="center" space="$2">
                <Smartphone size={24} color="$green10" />
                <Text fontSize="$3" fontWeight="600" color="$gray11" textAlign="center">
                  Native
                </Text>
              </YStack>
            </Card>
          </XStack>

          {/* Interactive widgets */}
          <InteractiveCard />
          <StatsWidget />
          <AnimatedButton />
          
          {/* Footer */}
          <YStack alignItems="center" space="$2" marginTop="$6">
            <Text fontSize="$3" color="$gray9" textAlign="center">
              Built with ❤️ using Tamagui
            </Text>
            <Text fontSize="$2" color="$gray8" textAlign="center">
              Swipe, tap, and interact with the widgets above
            </Text>
          </YStack>
        </YStack>
      </ScrollView>
    </LinearGradient>
  );
}