import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ActivityCard } from '@/components/cards/ActivityCard';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FilterModal } from '@/components/modals/FilterModal';
import { router } from 'expo-router';


export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'recommended' | 'new'>('recommended');
  const [isGridView, setIsGridView] = useState(true);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  
  const toggleFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <ThemedText style={styles.logo}>Family<ThemedText style={styles.subLogo}>Kite</ThemedText></ThemedText>
          <TouchableOpacity style={styles.menuButton} onPress={toggleFilterModal}>
            <Ionicons name="options-outline" size={24} color={Colors.grayscale.white} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.titleContainer, filterModalVisible && styles.titleContainerFaded]}>
        <ThemedText style={styles.title}>
          Только 15 минут в день - большие перемены завтра
        </ThemedText>
      </View>
      
      <FilterModal 
        visible={filterModalVisible}
        onClose={toggleFilterModal}
      />
      
      <View style={styles.mainContent}>
        <View style={styles.tabSection}>
          <View style={styles.tabContainer}>
            <View style={styles.tabs}>
              <TouchableOpacity 
                style={[styles.tab, activeTab === 'recommended' && styles.activeTab]} 
                onPress={() => setActiveTab('recommended')}
              >
                <ThemedText style={[
                  styles.tabText, 
                  activeTab === 'recommended' && styles.activeTabText
                ]}>
                  Рекомендуемое
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tab, activeTab === 'new' && styles.activeTab]}
                onPress={() => setActiveTab('new')}
              >
                <ThemedText style={[
                  styles.tabText,
                  activeTab === 'new' && styles.activeTabText
                ]}>
                  Новое
                </ThemedText>
              </TouchableOpacity>
            </View>

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
          </View>
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
              onPress={() => {}}  // This will be handled inside ActivityCard now
              onLike={() => {}}
              description="Собирание LEGO с детьми — это увлекательное и полезное занятие, которое развивает воображение, мелкую моторику и логическое мышление."
              isGridView={isGridView}
            />
            <ActivityCard 
              title="Конструкторы лего"
              duration={20}
              imageUrl="your_image_url"
              onPress={() => {}}  // This will be handled inside ActivityCard now
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
  logo: {
    fontSize: 24,
    color: Colors.grayscale.white,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    paddingVertical: 10
  },
  subLogo: {
    fontSize: 24,
    color: Colors.grayscale.white,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  menuButton: {
    paddingBottom: 10,
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginBottom: 31,
  },
  title: {
    fontSize: 25,
    lineHeight: 35,
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  tabSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F4F3F3'
  },
  activeTab: {
    backgroundColor: Colors.accent.lightOrange,
  },
  tabText: {
    fontSize: 14,
    color: Colors.grayscale.gray,
    fontFamily: 'Manrope',
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.grayscale.white,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.grayscale.lightGray1,
    borderRadius: 8,
    padding: 4,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterModal: {
    width: '88%',
    backgroundColor: Colors.grayscale.white,
    borderRadius: 24,
    paddingHorizontal: 40,
    paddingTop: 30,
    paddingBottom: 30,
    marginTop: 80, 
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  filterTitle: {
    fontSize: 25,
    fontWeight: '500',
    fontFamily: 'Manrope-Medium',
    marginTop: 20
  },
  closeButton: {
    marginBottom: 20,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 17,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    marginBottom: 12,
  },
  filterOptionText: {
    fontSize: 16,
    opacity: 0.5,
    fontFamily: 'Manrope',
  },
  arrowBottom: {
    width: 16,
    height: 7.5,
  },
  applyButton: {
    backgroundColor: Colors.primary.blue,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  applyButtonText: {
    color: Colors.grayscale.white,
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    color: Colors.primary.blue,
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
  },
  modalHeaderContainer: {
    backgroundColor: Colors.primary.blue,
  },
  titleContainerFaded: {
    paddingHorizontal: 20,
    marginBottom: 31,
    opacity: 0.5,
  },
  titleFaded: {
    fontSize: 25,
    lineHeight: 35,
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
    fontWeight: '500',
  },
});
