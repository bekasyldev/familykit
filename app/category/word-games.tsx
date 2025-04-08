import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ActivityCard } from '@/components/cards/ActivityCard';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function CategoryDetailScreen() {
  const { id } = useLocalSearchParams();
  const [isGridView, setIsGridView] = useState(true);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <ThemedText style={styles.title}>Словесные игры</ThemedText>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="options-outline" size={24} color={Colors.grayscale.white} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.mainContent}>
        <View style={styles.viewToggle}>
          <TouchableOpacity 
            style={[styles.toggleButton, isGridView && styles.activeToggle]}
            onPress={() => setIsGridView(true)}
          >
            <Ionicons 
              name="grid-outline" 
              size={20} 
              color={isGridView ? Colors.primary.blue : Colors.grayscale.gray} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleButton, !isGridView && styles.activeToggle]}
            onPress={() => setIsGridView(false)}
          >
            <Ionicons 
              name="menu-outline" 
              size={20} 
              color={!isGridView ? Colors.primary.blue : Colors.grayscale.gray} 
            />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={[
            styles.cardsContainer,
            isGridView ? styles.gridContainer : styles.listContainer
          ]}>
            <ActivityCard 
              title="Конструкторы лего"
              duration={20}
              imageUrl="your_image_url"
              onPress={() => {}}
              onLike={() => {}}
              description="Собирание LEGO с детьми — это увлекательное и полезное занятие, которое развивает воображение, мелкую моторику и логическое мышление."
              isGridView={isGridView}
            />
            <ActivityCard 
              title="Конструкторы лего"
              duration={20}
              imageUrl="your_image_url"
              onPress={() => {}}
              onLike={() => {}}
              description="Собирание LEGO с детьми — это увлекательное и полезное занятие, которое развивает воображение, мелкую моторику и логическое мышление."
              isGridView={isGridView}
            />
          </View>
        </ScrollView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.blue,
  },
  header: {
    paddingTop: 80,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
    fontWeight: '600',
    paddingVertical: 10
  },
  menuButton: {
    padding: 8,
  },
  mainContent: {
    flex: 1,
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.grayscale.lightGray1,
    borderRadius: 8,
    padding: 4,
    margin: 20,
    alignSelf: 'flex-start',
  },
  toggleButton: {
    padding: 8,
    borderRadius: 4,
  },
  activeToggle: {
    backgroundColor: Colors.grayscale.white,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 12,
  },
  cardsContainer: {
    width: '100%',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  listContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}); 