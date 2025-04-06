import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Colors } from '@/constants/Colors';

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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  activeButton: {
    backgroundColor: Colors.primary.blue,
  },
  text: {
    fontSize: 16,
    color: Colors.grayscale.lightGray1,
    opacity: 0.6,
  },
  activeText: {
    color: Colors.primary.blue,
    opacity: 1,
    fontWeight: '600',
  },
}); 