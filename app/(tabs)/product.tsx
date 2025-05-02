import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';

export default function ProductScreen() {
  const params = useLocalSearchParams();
  const { title, description, duration, imageUrl } = params;
  
  // Default values if params are not provided
  const activityTitle = title as string || "Конструкторы лего";
  const activityDescription = description as string || 
    "Собирание LEGO с детьми — это увлекательное и полезное занятие, которое развивает воображение, мелкую моторику и логическое мышление.";
  const activityDuration = duration as string || "20";
  
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.grayscale.white} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Активность</ThemedText>
      </View>
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Image 
          source={require('../../assets/images/image.png')} 
          style={styles.mainImage}
          resizeMode="cover"
        />
        
        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <ThemedText style={styles.title}>{activityTitle}</ThemedText>
            <TouchableOpacity style={styles.likeButton}>
              <Ionicons name="heart-outline" size={24} color={Colors.primary.darkBlue} />
            </TouchableOpacity>
          </View>
          
          <ThemedText style={styles.description}>
            {activityDescription}
          </ThemedText>
          
          <View style={styles.timeContainer}>
            <ThemedText style={styles.timeLabel}>Время активности</ThemedText>
            <View style={styles.timeValue}>
              <ThemedText style={styles.timeText}>{activityDuration} мин</ThemedText>
              <Ionicons name="time-outline" size={18} color={Colors.primary.darkBlue} />
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  mainImage: {
    width: '100%',
    marginTop: 20,
    height: 500,
    borderRadius: 30,
  },
  infoContainer: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.primary.darkBlue,
    fontFamily: 'Manrope',
    flex: 1,
  },
  likeButton: {
    padding: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.grayscale.black,
    fontFamily: 'Inter',
    fontWeight: '400',
    opacity: 0.4,
    marginBottom: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 20,
  },
  timeLabel: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.primary.darkBlue,
    fontFamily: 'Manrope',
  },
  timeValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.grayscale.lightGray3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  timeText: {
    fontSize: 18,
    color: Colors.primary.darkBlue,
    fontFamily: 'Manrope',
  },
  instructionContainer: {
    marginTop: 10,
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.primary.darkBlue,
    fontFamily: 'Manrope',
    marginBottom: 16,
  },
  instructionStep: {
    flexDirection: 'row',
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: '500',
    width: 20,
  },
  stepText: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.grayscale.black,
    fontFamily: 'Inter',
    flex: 1,
  },
});