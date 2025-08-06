import React from 'react';
import { 
  Card, 
  XStack, 
  YStack, 
  Text, 
  Circle,
  LinearGradient
} from '@tamagui/core';
import { TrendingUp, Users, Zap, Target } from 'lucide-react-native';

interface StatItemProps {
  icon: React.ComponentType<any>;
  value: string;
  label: string;
  color: string;
  trend?: string;
}

function StatItem({ icon: Icon, value, label, color, trend }: StatItemProps) {
  return (
    <Card
      flex={1}
      padding="$3"
      margin="$1"
      backgroundColor="$background"
      borderColor="$borderColor"
      borderRadius="$4"
      animation="bouncy"
      hoverStyle={{ scale: 1.02 }}
      pressStyle={{ scale: 0.98 }}
    >
      <YStack alignItems="center" space="$2">
        <Circle size="$5" backgroundColor={color} padding="$2">
          <Icon size={20} color="white" />
        </Circle>
        
        <Text fontSize="$7" fontWeight="bold" color="$gray12">
          {value}
        </Text>
        
        <Text fontSize="$2" color="$gray10" textAlign="center">
          {label}
        </Text>
        
        {trend && (
          <XStack alignItems="center" space="$1">
            <TrendingUp size={12} color="$green10" />
            <Text fontSize="$1" color="$green10" fontWeight="600">
              {trend}
            </Text>
          </XStack>
        )}
      </YStack>
    </Card>
  );
}

export function StatsWidget() {
  return (
    <Card
      elevate
      size="$4"
      bordered
      backgroundColor="$background"
      borderColor="$borderColor"
      padding="$4"
      margin="$3"
      borderRadius="$6"
    >
      <YStack space="$3">
        <Text fontSize="$6" fontWeight="bold" color="$gray12" textAlign="center">
          Dashboard Stats
        </Text>
        
        <XStack space="$2">
          <StatItem
            icon={Users}
            value="2.4K"
            label="Active Users"
            color="$blue9"
            trend="+12%"
          />
          <StatItem
            icon={Zap}
            value="98.5%"
            label="Uptime"
            color="$green9"
            trend="+0.2%"
          />
        </XStack>
        
        <XStack space="$2">
          <StatItem
            icon={Target}
            value="156"
            label="Goals Met"
            color="$purple9"
            trend="+8%"
          />
          <StatItem
            icon={TrendingUp}
            value="$12.5K"
            label="Revenue"
            color="$orange9"
            trend="+24%"
          />
        </XStack>
      </YStack>
    </Card>
  );
}