import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Colors } from '@/constants/Colors';
import { scale, verticalScale, fontScale } from '@/constants/Layout';

interface TabButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

export function TabButton({ title, isActive, onPress }: TabButtonProps) {
  return (
    <TouchableOpacity 
      style={[styles.button, isActive && styles.activeButton]} 
      onPress={onPress}
    >
      <ThemedText style={[styles.text, isActive && styles.activeText]}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: scale(20),
    marginRight: scale(10),
    backgroundColor: 'transparent',
  },
  activeButton: {
    backgroundColor: Colors.primary.blue,
  },
  text: {
    fontSize: fontScale(16),
    color: Colors.grayscale.lightGray1,
    opacity: 0.6,
  },
  activeText: {
    color: Colors.primary.blue,
    opacity: 1,
    fontWeight: '600',
  },
});