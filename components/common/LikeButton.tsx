import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface LikeButtonProps {
  onPress: () => void;
  isLiked?: boolean;
}

export function LikeButton({ onPress, isLiked = false }: LikeButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Ionicons 
        name={isLiked ? "heart" : "heart-outline"} 
        size={20} 
        color={Colors.primary.blue} 
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
  },
}); 