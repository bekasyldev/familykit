import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { scale, verticalScale, fontScale, listenOrientationChange } from '@/constants/Layout';

export default function OutdoorScreen() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  
  useEffect(() => {
    const subscription = listenOrientationChange(() => {
      setDimensions(Dimensions.get('window'));
    });
    
    return () => subscription.remove();
  }, []);
  
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={scale(24)} color={Colors.grayscale.white} />
              </TouchableOpacity>
              <ThemedText style={styles.title}>На улице</ThemedText>
        </View>

      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <ThemedText style={styles.sectionTitle}>Популярные активности</ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.blue,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(70),
    paddingBottom: verticalScale(20),
    gap: scale(12),
  },
  title: {
    fontSize: fontScale(25),
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
    fontWeight: '600',
    paddingVertical: verticalScale(10)
  },
  scrollView: {
    backgroundColor: Colors.grayscale.white,
    height: '100%',
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    flex: 1,
  },
  content: {
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(100),
  },
  sectionTitle: {
    fontSize: fontScale(18),
    fontWeight: '600',
    color: Colors.grayscale.black,
    marginBottom: verticalScale(16),
    fontFamily: 'Manrope',
  },
});