import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { FilterModal } from '@/components/modals/FilterModal';
import { scale, verticalScale, fontScale, moderateScale, listenOrientationChange } from '@/constants/Layout';

const calculateCardWidth = () => {
  const { width } = Dimensions.get('window');
  return (width - scale(56)) / 2;
};

export default function CategoriesScreen() {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [cardWidth, setCardWidth] = useState(calculateCardWidth());
  
  // Handle orientation changes
  useEffect(() => {
    const subscription = listenOrientationChange(() => {
      setCardWidth(calculateCardWidth());
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
        <ThemedText style={styles.title}>Категории</ThemedText>
        <TouchableOpacity style={styles.menuButton} onPress={toggleFilterModal}>
          <Ionicons name="options-outline" size={scale(24)} color={Colors.grayscale.white} />
        </TouchableOpacity>
      </View>
      
      <FilterModal 
        visible={filterModalVisible}
        onClose={toggleFilterModal}
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Активности</ThemedText>
            
            <View style={styles.cardRow}>
              <TouchableOpacity 
                style={[styles.card, { width: cardWidth }]}
                onPress={() => router.push('/indoor' as any)}
              >
                <ThemedText style={styles.cardText}>В помещении</ThemedText>
                <View style={styles.imageContainer}>
                  <Image source={require('../../assets/images/indoor.png')} style={styles.cardImage} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.card, { width: cardWidth }]}
                onPress={() => router.push('/outdoor' as any)}
              >
                <ThemedText style={styles.cardText}>На улице</ThemedText>
                <View style={styles.imageContainer}>
                  <Image source={require('../../assets/images/outdoor.png')} style={styles.cardImage} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.cardRow}>
            <TouchableOpacity 
                style={[styles.card, { width: cardWidth }]}
                onPress={() => router.push('/holiday' as any)}
              >
                <ThemedText style={styles.cardText}>Праздничные</ThemedText>
                <View style={styles.imageContainer}>
                  <Image source={require('../../assets/images/holiday.png')} style={styles.cardImage} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Разговоры</ThemedText>
            <View style={styles.cardRow}>
              <TouchableOpacity 
                style={[styles.card, { width: cardWidth }]}
                onPress={() => router.push('/word-games' as any)}
              >
                <ThemedText style={styles.cardText}>Словесные игры</ThemedText>
                <View style={styles.imageContainer}>
                  <Image source={require('../../assets/images/word-games.png')} style={styles.cardImage} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.card, { width: cardWidth }]}
                onPress={() => router.push('/questions' as any)}
              >
                <ThemedText style={styles.cardText}>Вопросы и ответы</ThemedText>
                <View style={styles.imageContainer}>
                  <Image source={require('../../assets/images/questions.png')} style={styles.cardImage} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.cardRow}>
              <TouchableOpacity 
                style={[styles.card, { width: cardWidth }]}
                onPress={() => router.push('/story' as any)}
              >
                <ThemedText style={styles.cardText}>Расскажи историю</ThemedText>
                <View style={styles.imageContainer}>
                  <Image source={require('../../assets/images/story.png')} style={styles.cardImage} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Игры онлайн</ThemedText>
            <View style={styles.cardRow}>
              <TouchableOpacity 
                style={[styles.card, { width: cardWidth }]}
                onPress={() => router.push('/charades' as any)}
              >
                <ThemedText style={styles.cardText}>Шарады</ThemedText>
                <View style={styles.imageContainer}>
                  <Image source={require('../../assets/images/charades.png')} style={styles.cardImage} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.card, { width: cardWidth }]}
                onPress={() => router.push('/flags' as any)}
              >
                <ThemedText style={styles.cardText}>Угадай флаг</ThemedText>
                <View style={styles.imageContainer}>
                  <Image source={require('../../assets/images/flags.png')} style={styles.cardImage} />
                </View>
              </TouchableOpacity>
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
    fontSize: fontScale(24),
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
    fontWeight: '600',
    paddingVertical: verticalScale(10)
  },
  menuButton: {
    padding: scale(8),
  },
  scrollView: {
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
  section: {
    marginBottom: verticalScale(24),
  },
  sectionTitle: {
    fontSize: fontScale(18),
    fontWeight: '600',
    color: Colors.grayscale.black,
    marginBottom: verticalScale(16),
    fontFamily: 'Manrope',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.grayscale.black,
    opacity: 0.1,
    marginVertical: verticalScale(16),
    alignSelf: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
  },
  card: {
    backgroundColor: Colors.grayscale.white,
    borderRadius: scale(17),
    padding: scale(16),
    borderWidth: 1,
    borderColor: Colors.grayscale.lightGray1,
    justifyContent: 'space-between',
    height: verticalScale(180),
    overflow: 'hidden',
  },
  cardText: {
    fontSize: fontScale(16),
    fontWeight: '500',
    color: Colors.primary.blue,
    fontFamily: 'Manrope',
    marginBottom: verticalScale(8),
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardImage: {
    width: '85%',
    height: '85%',
    resizeMode: 'contain',
  },
});