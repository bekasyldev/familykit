import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FilterModal } from '@/components/modals/FilterModal';

export default function FavoritesScreen() {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  
  const toggleFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Избранное</ThemedText>
        <TouchableOpacity style={styles.filterButton} onPress={toggleFilterModal}>
          <Ionicons name="options-outline" size={24} color={Colors.grayscale.white} />
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
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
    fontWeight: '600',
    paddingVertical: 10
  },
  filterButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 240,
    height: 240,
    marginBottom: 24,
  },
  message: {
    fontSize: 18,
    color: Colors.primary.blue,
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'Manrope',
  },
  addToFavorites: {
    fontSize: 16,
    color: Colors.accent.orange,
    textAlign: 'center',
    fontFamily: 'Manrope',
  },
});