import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ActivityCard } from '@/components/cards/ActivityCard';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FilterModal } from '@/components/modals/FilterModal';
import { scale, verticalScale, fontScale, moderateScale, listenOrientationChange } from '@/constants/Layout';

export default function CategoryDetailScreen() {
  const { id } = useLocalSearchParams();
  const [isGridView, setIsGridView] = useState(true);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  
  // Handle orientation changes
  useEffect(() => {
    const subscription = listenOrientationChange(() => {
      setDimensions(Dimensions.get('window'));
    });
    
    return () => subscription.remove();
  }, []);
  
  const toggleFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

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
          <TouchableOpacity style={styles.menuButton} onPress={toggleFilterModal}>
            <Ionicons name="options-outline" size={scale(24)} color={Colors.grayscale.white} />
          </TouchableOpacity>
        </View>
      </View>
      
      <FilterModal 
        visible={filterModalVisible}
        onClose={toggleFilterModal}
      />
      
      <View style={styles.mainContent}>
        <View style={styles.viewToggle}>
          <TouchableOpacity 
            style={[styles.toggleButton, isGridView && styles.activeToggle]}
            onPress={() => setIsGridView(true)}
          >
            <Ionicons 
              name="grid-outline" 
              size={scale(20)} 
              color={isGridView ? Colors.primary.blue : Colors.grayscale.gray} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleButton, !isGridView && styles.activeToggle]}
            onPress={() => setIsGridView(false)}
          >
            <Ionicons 
              name="menu-outline" 
              size={scale(20)} 
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
    paddingTop: verticalScale(80),
    paddingBottom: verticalScale(20),
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  title: {
    fontSize: fontScale(22),
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
    fontWeight: '600',
    paddingVertical: verticalScale(10)
  },
  menuButton: {
    padding: scale(8),
  },
  mainContent: {
    flex: 1,
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.grayscale.lightGray1,
    borderRadius: scale(8),
    padding: scale(4),
    margin: scale(20),
    alignSelf: 'flex-start',
  },
  toggleButton: {
    padding: scale(8),
    borderRadius: scale(4),
  },
  activeToggle: {
    backgroundColor: Colors.grayscale.white,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: scale(12),
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