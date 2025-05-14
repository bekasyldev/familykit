import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { scale, verticalScale, fontScale, moderateScale, listenOrientationChange } from '@/constants/Layout';

export default function QuestionsScreen() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  
  // Handle orientation changes
  useEffect(() => {
    const subscription = listenOrientationChange(() => {
      setDimensions(Dimensions.get('window'));
    });
    
    return () => subscription.remove();
  }, []);
  
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={scale(24)} color={Colors.grayscale.white} />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Вопросы и ответы</ThemedText>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <ThemedText style={styles.sectionTitle}>Популярные вопросы</ThemedText>
          
          {/* Question cards will go here */}
          
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.blue,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(70),
    paddingBottom: verticalScale(20),
    marginTop: verticalScale(10),
  },
  title: {
    fontSize: fontScale(25),
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
    fontWeight: '600',
    paddingVertical: verticalScale(10)
  },
  placeholder: {
    width: scale(40),
  },
  scrollView: {
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(60),
    paddingHorizontal: scale(20),
  },
  content: {
    backgroundColor: Colors.grayscale.white,
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