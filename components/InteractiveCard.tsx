import React, { useState } from 'react';
import { 
  Card, 
  XStack, 
  YStack, 
  Text, 
  Button, 
  Progress, 
  Switch,
  Slider,
  Avatar,
  Badge,
  Separator
} from '@tamagui/core';
import { Heart, Star, Zap, TrendingUp } from 'lucide-react-native';

export function InteractiveCard() {
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(65);
  const [darkMode, setDarkMode] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <Card
      elevate
      size="$4"
      bordered
      animation="bouncy"
      scale={0.9}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}
      backgroundColor={darkMode ? '$gray2' : '$background'}
      borderColor={darkMode ? '$gray6' : '$borderColor'}
      padding="$4"
      margin="$3"
      borderRadius="$6"
    >
      <Card.Header padded>
        <XStack alignItems="center" justifyContent="space-between">
          <XStack alignItems="center" space="$3">
            <Avatar circular size="$6">
              <Avatar.Image src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" />
              <Avatar.Fallback backgroundColor="$blue10" />
            </Avatar>
            <YStack>
              <Text fontSize="$6" fontWeight="bold" color={darkMode ? '$gray12' : '$gray12'}>
                Interactive Widget
              </Text>
              <Text fontSize="$3" color={darkMode ? '$gray10' : '$gray10'}>
                Powered by Tamagui
              </Text>
            </YStack>
          </XStack>
          <Badge size="$3" backgroundColor="$green9">
            <Text color="white" fontSize="$2" fontWeight="600">Active</Text>
          </Badge>
        </XStack>
      </Card.Header>

      <Separator marginVertical="$3" />

      <YStack space="$4" padding="$2">
        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize="$4" fontWeight="600" color={darkMode ? '$gray11' : '$gray11'}>
            Progress Tracker
          </Text>
          <Text fontSize="$3" color="$blue10" fontWeight="bold">
            {progress}%
          </Text>
        </XStack>
        
        <Progress size="$2" backgroundColor="$gray5">
          <Progress.Indicator 
            animation="bouncy" 
            backgroundColor="$blue10"
            width={`${progress}%`}
          />
        </Progress>

        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize="$4" color={darkMode ? '$gray11' : '$gray11'}>
            Dark Mode
          </Text>
          <Switch
            size="$3"
            checked={darkMode}
            onCheckedChange={setDarkMode}
            backgroundColor={darkMode ? '$blue10' : '$gray5'}
          >
            <Switch.Thumb 
              animation="quick" 
              backgroundColor="white"
            />
          </Switch>
        </XStack>

        <YStack space="$2">
          <XStack alignItems="center" justifyContent="space-between">
            <Text fontSize="$4" color={darkMode ? '$gray11' : '$gray11'}>
              Energy Level
            </Text>
            <Text fontSize="$3" color="$orange10" fontWeight="bold">
              {Math.round(sliderValue)}%
            </Text>
          </XStack>
          <Slider
            size="$3"
            width="100%"
            defaultValue={[sliderValue]}
            max={100}
            step={1}
            onValueChange={(value) => setSliderValue(value[0])}
          >
            <Slider.Track backgroundColor="$gray5">
              <Slider.TrackActive backgroundColor="$orange10" />
            </Slider.Track>
            <Slider.Thumb 
              size="$2" 
              index={0} 
              backgroundColor="$orange10"
              borderColor="$orange11"
              borderWidth={2}
            />
          </Slider>
        </YStack>

        <XStack space="$3" justifyContent="center" marginTop="$3">
          <Button
            size="$3"
            theme={liked ? "red" : "gray"}
            backgroundColor={liked ? "$red9" : "$gray5"}
            color={liked ? "white" : "$gray11"}
            icon={Heart}
            onPress={() => setLiked(!liked)}
            animation="bouncy"
            pressStyle={{ scale: 0.95 }}
          >
            {liked ? 'Loved' : 'Like'}
          </Button>
          
          <Button
            size="$3"
            backgroundColor="$blue9"
            color="white"
            icon={Star}
            animation="bouncy"
            pressStyle={{ scale: 0.95 }}
          >
            Rate
          </Button>
          
          <Button
            size="$3"
            backgroundColor="$purple9"
            color="white"
            icon={Zap}
            animation="bouncy"
            pressStyle={{ scale: 0.95 }}
          >
            Boost
          </Button>
        </XStack>
      </YStack>
    </Card>
  );
}