import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface HeaderProps {
  onFilterPress: () => void;
}

export function Header({ onFilterPress }: HeaderProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>FamilyKit</ThemedText>
      <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
        <Ionicons name="filter" size={24} color={Colors.light.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 33,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  filterButton: {
    padding: 8,
  },
}); 