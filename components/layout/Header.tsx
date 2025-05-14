import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { scale, verticalScale, fontScale, listenOrientationChange } from '@/constants/Layout';

interface HeaderProps {
  onFilterPress: () => void;
}

export function Header({ onFilterPress }: HeaderProps) {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  
  // Handle orientation changes
  useEffect(() => {
    const subscription = listenOrientationChange(() => {
      setDimensions(Dimensions.get('window'));
    });
    
    return () => subscription.remove();
  }, []);
  
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>FamilyKit</ThemedText>
      <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
        <Ionicons name="filter" size={scale(24)} color={Colors.light.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(33),
    paddingTop: verticalScale(60),
  },
  title: {
    fontSize: fontScale(32),
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  filterButton: {
    padding: scale(8),
  },
});