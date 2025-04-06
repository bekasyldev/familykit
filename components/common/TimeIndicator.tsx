import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';
import { Colors } from '@/constants/Colors';

interface TimeIndicatorProps {
  duration: number;
}

export function TimeIndicator({ duration }: TimeIndicatorProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="time-outline" size={16} color={Colors.primary.blue} />
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
    marginLeft: 4,
    fontSize: 14,
    color: Colors.primary.blue,
  },
}); 