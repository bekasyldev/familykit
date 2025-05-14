import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FilterModal } from '@/components/modals/FilterModal';
import { scale, verticalScale, fontScale, moderateScale, listenOrientationChange } from '@/constants/Layout';

export default function FavoritesScreen() {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  
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
      <View style={styles.header}>
        <ThemedText style={styles.title}>Избранное</ThemedText>
        <TouchableOpacity style={styles.filterButton} onPress={toggleFilterModal}>
          <Ionicons name="options-outline" size={scale(24)} color={Colors.grayscale.white} />
        </TouchableOpacity>
      </View>
      
      <FilterModal 
        visible={filterModalVisible}
        onClose={toggleFilterModal}
      />
      
      <View style={styles.content}>
        <Image 
          source={require('../../assets/images/favorites-empty.png')} 
          style={styles.image}
          resizeMode="contain"
        />
        <ThemedText style={styles.message}>
          В избранном пока ничего нет
        </ThemedText>
        <TouchableOpacity>
          <ThemedText style={styles.addToFavorites}>
            Добавить в избранное
          </ThemedText>
        </TouchableOpacity>
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
  filterButton: {
    padding: scale(8),
  },
  content: {
    flex: 1,
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(20),
  },
  image: {
    width: scale(240),
    height: scale(240),
    marginBottom: verticalScale(24),
  },
  message: {
    fontSize: fontScale(18),
    color: Colors.primary.blue,
    marginBottom: verticalScale(12),
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'Manrope',
  },
  addToFavorites: {
    fontSize: fontScale(16),
    color: Colors.accent.orange,
    textAlign: 'center',
    fontFamily: 'Manrope',
  },
});