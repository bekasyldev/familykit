import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';
import { Colors } from '@/constants/Colors';
import { scale, fontScale } from '@/constants/Layout';

interface TimeIndicatorProps {
  duration: number;
}

export function TimeIndicator({ duration }: TimeIndicatorProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="time-outline" size={scale(16)} color={Colors.primary.blue} />
      <ThemedText style={styles.text}>{duration} мин</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: scale(4),
    fontSize: fontScale(14),
    color: Colors.primary.blue,
  },
});