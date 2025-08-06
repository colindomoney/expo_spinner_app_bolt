import React, { useState } from 'react';
import { 
  Button, 
  XStack, 
  YStack, 
  Text,
  AnimatePresence
} from '@tamagui/core';
import { Sparkles, Rocket, Gift, Crown } from 'lucide-react-native';

export function AnimatedButton() {
  const [currentButton, setCurrentButton] = useState(0);
  
  const buttons = [
    { icon: Sparkles, text: 'Sparkle', color: '$purple9', hoverColor: '$purple10' },
    { icon: Rocket, text: 'Launch', color: '$blue9', hoverColor: '$blue10' },
    { icon: Gift, text: 'Surprise', color: '$pink9', hoverColor: '$pink10' },
    { icon: Crown, text: 'Premium', color: '$yellow9', hoverColor: '$yellow10' },
  ];

  const handlePress = () => {
    setCurrentButton((prev) => (prev + 1) % buttons.length);
  };

  const current = buttons[currentButton];

  return (
    <YStack alignItems="center" space="$4" padding="$4">
      <Text fontSize="$5" fontWeight="600" color="$gray11" textAlign="center">
        Morphing Button Demo
      </Text>
      
      <AnimatePresence>
        <Button
          key={currentButton}
          size="$5"
          backgroundColor={current.color}
          color="white"
          icon={current.icon}
          onPress={handlePress}
          animation="bouncy"
          enterStyle={{
            scale: 0.5,
            opacity: 0,
            rotateZ: '180deg',
          }}
          exitStyle={{
            scale: 0.5,
            opacity: 0,
            rotateZ: '-180deg',
          }}
          hoverStyle={{ 
            backgroundColor: current.hoverColor,
            scale: 1.05,
          }}
          pressStyle={{ 
            scale: 0.95,
          }}
          borderRadius="$10"
          paddingHorizontal="$6"
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.3}
          shadowRadius={8}
        >
          <Text fontSize="$4" fontWeight="600" color="white">
            {current.text}
          </Text>
        </Button>
      </AnimatePresence>
      
      <XStack space="$2" alignItems="center">
        {buttons.map((_, index) => (
          <Button
            key={index}
            size="$2"
            circular
            backgroundColor={index === currentButton ? current.color : '$gray5'}
            onPress={() => setCurrentButton(index)}
            animation="quick"
            pressStyle={{ scale: 0.9 }}
          />
        ))}
      </XStack>
    </YStack>
  );
}