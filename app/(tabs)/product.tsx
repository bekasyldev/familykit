import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { scale, verticalScale, fontScale, moderateScale, listenOrientationChange } from '@/constants/Layout';

export default function ProductScreen() {
  const params = useLocalSearchParams();
  const { title, description, duration, imageUrl } = params;
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  
  // Handle orientation changes
  useEffect(() => {
    const subscription = listenOrientationChange(() => {
      setDimensions(Dimensions.get('window'));
    });
    
    return () => subscription.remove();
  }, []);
  
  // Default values if params are not provided
  const activityTitle = title as string || "Конструкторы лего";
  const activityDescription = description as string || 
    "Собирание LEGO с детьми — это увлекательное и полезное занятие, которое развивает воображение, мелкую моторику и логическое мышление.";
  const activityDuration = duration as string || "20";
  
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={scale(24)} color={Colors.grayscale.white} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Активность</ThemedText>
      </View>
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Image 
          source={require('../../assets/images/image.png')} 
          style={[styles.mainImage, {
            height: dimensions.width > 600 ? verticalScale(400) : verticalScale(500)
          }]}
          resizeMode="cover"
        />
        
        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <ThemedText style={styles.title}>{activityTitle}</ThemedText>
            <TouchableOpacity style={styles.likeButton}>
              <Ionicons name="heart-outline" size={scale(24)} color={Colors.primary.darkBlue} />
            </TouchableOpacity>
          </View>
          
          <ThemedText style={styles.description}>
            {activityDescription}
          </ThemedText>
          
          <View style={styles.timeContainer}>
            <ThemedText style={styles.timeLabel}>Время активности</ThemedText>
            <View style={styles.timeValue}>
              <ThemedText style={styles.timeText}>{activityDuration} мин</ThemedText>
              <Ionicons name="time-outline" size={scale(18)} color={Colors.primary.darkBlue} />
            </View>
          </View>
          
          <View style={styles.instructionContainer}>
            <ThemedText style={styles.instructionTitle}>Инструкция</ThemedText>
            
            <View style={styles.instructionStep}>
              <ThemedText style={styles.stepNumber}>1.</ThemedText>
              <ThemedText style={styles.stepText}>
                Выберите вместе с ребенком, что хотите построить (дом, машину, животное и т. д.).
              </ThemedText>
            </View>
            
            <View style={styles.instructionStep}>
              <ThemedText style={styles.stepNumber}>2.</ThemedText>
              <ThemedText style={styles.stepText}>
                Разделите детали по цветам и размерам, чтобы удобнее собирать.
              </ThemedText>
            </View>
            
            <View style={styles.instructionStep}>
              <ThemedText style={styles.stepNumber}>3.</ThemedText>
              <ThemedText style={styles.stepText}>
                Постепенно стройте, добавляя новые элементы и обсуждая, как они соединяются.
              </ThemedText>
            </View>
            
            <View style={styles.instructionStep}>
              <ThemedText style={styles.stepNumber}>4.</ThemedText>
              <ThemedText style={styles.stepText}>
                По окончании постройки придумайте историю о своем создании!
              </ThemedText>
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.darkBlue,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(60),
    paddingBottom: verticalScale(20),
  },
  backButton: {
    padding: scale(8),
  },
  headerTitle: {
    fontSize: fontScale(22),
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
    fontWeight: '600',
    marginLeft: scale(8),
  },
  content: {
    flex: 1,
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingHorizontal: scale(20),
  },
  contentContainer: {
    paddingBottom: verticalScale(40),
  },
  mainImage: {
    width: '100%',
    marginTop: verticalScale(20),
    borderRadius: scale(30),
  },
  infoContainer: {
    padding: scale(20),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  title: {
    fontSize: fontScale(24),
    fontWeight: '600',
    color: Colors.primary.darkBlue,
    fontFamily: 'Manrope',
    flex: 1,
  },
  likeButton: {
    padding: scale(8),
  },
  description: {
    fontSize: fontScale(16),
    color: Colors.grayscale.black,
    fontFamily: 'Inter',
    fontWeight: '400',
    opacity: 0.4,
    marginBottom: verticalScale(20),
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(20),
  },
  timeLabel: {
    fontSize: fontScale(20),
    fontWeight: '500',
    color: Colors.primary.darkBlue,
    fontFamily: 'Manrope',
  },
  timeValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    backgroundColor: Colors.grayscale.lightGray3,
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(12),
    borderRadius: scale(8),
  },
  timeText: {
    fontSize: fontScale(18),
    color: Colors.primary.darkBlue,
    fontFamily: 'Manrope',
  },
  instructionContainer: {
    marginTop: verticalScale(10),
  },
  instructionTitle: {
    fontSize: fontScale(20),
    fontWeight: '500',
    color: Colors.primary.darkBlue,
    fontFamily: 'Manrope',
    marginBottom: verticalScale(16),
  },
  instructionStep: {
    flexDirection: 'row',
    marginBottom: verticalScale(8),
  },
  stepNumber: {
    fontSize: fontScale(16),
    fontWeight: '500',
    width: scale(20),
  },
  stepText: {
    fontSize: fontScale(16),
    lineHeight: fontScale(22),
    color: Colors.grayscale.black,
    fontFamily: 'Inter',
    flex: 1,
  },
});