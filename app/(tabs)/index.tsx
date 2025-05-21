import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ActivityCard } from '@/components/cards/ActivityCard';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FilterModal } from '@/components/modals/FilterModal';
import { scale, verticalScale, fontScale, moderateScale, listenOrientationChange } from '@/constants/Layout';


export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'recommended' | 'new'>('recommended');
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
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <ThemedText style={styles.logo}>Family<ThemedText style={styles.subLogo}>Kite</ThemedText></ThemedText>
          <TouchableOpacity style={styles.menuButton} onPress={toggleFilterModal}>
            <Ionicons name="options-outline" size={scale(24)} color={Colors.grayscale.white} />
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
              onPress={() => {}}
              onLike={() => {}}
              description="Собирание LEGO с детьми — это увлекательное и полезное занятие, которое развивает воображение, мелкую моторику и логическое мышление."
              isGridView={isGridView}
            />
            <ActivityCard 
              title="Конструкторы лего"
              duration={20}
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
    paddingTop: verticalScale(70),
    paddingBottom: verticalScale(15),
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  logo: {
    fontSize: fontScale(24),
    color: Colors.grayscale.white,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    paddingVertical: verticalScale(8)
  },
  subLogo: {
    fontSize: fontScale(24),
    color: Colors.grayscale.white,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  menuButton: {
    paddingBottom: verticalScale(10),
    padding: scale(5),
  },
  titleContainer: {
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(25),
  },
  title: {
    fontSize: fontScale(25),
    lineHeight: fontScale(35),
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
  },
  tabSection: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    gap: scale(8),
  },
  tab: {
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(8),
    borderRadius: scale(10),
    backgroundColor: '#F4F3F3'
  },
  activeTab: {
    backgroundColor: Colors.accent.lightOrange,
  },
  tabText: {
    fontSize: fontScale(14),
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
    borderRadius: scale(8),
    padding: moderateScale(4),
  },
  toggleButton: {
    padding: moderateScale(8),
    borderRadius: scale(4),
  },
  activeToggle: {
    backgroundColor: Colors.grayscale.white,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: moderateScale(12),
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
    borderRadius: scale(24),
    paddingHorizontal: scale(40),
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(30),
    marginTop: verticalScale(80), 
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(30),
  },
  filterTitle: {
    fontSize: fontScale(25),
    fontWeight: '500',
    fontFamily: 'Manrope-Medium',
    marginTop: verticalScale(15)
  },
  closeButton: {
    marginBottom: verticalScale(20),
  },
  closeIcon: {
    width: scale(20),
    height: scale(20),
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(17),
    backgroundColor: '#F5F5F5',
    borderRadius: scale(15),
    marginBottom: verticalScale(12),
  },
  filterOptionText: {
    fontSize: fontScale(16),
    opacity: 0.5,
    fontFamily: 'Manrope',
  },
  arrowBottom: {
    width: scale(16),
    height: scale(7.5),
  },
  applyButton: {
    backgroundColor: Colors.primary.blue,
    borderRadius: scale(16),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(12),
  },
  applyButtonText: {
    color: Colors.grayscale.white,
    fontSize: fontScale(16),
    fontFamily: 'Manrope-SemiBold',
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: scale(16),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
  },
  resetButtonText: {
    color: Colors.primary.blue,
    fontSize: fontScale(16),
    fontFamily: 'Manrope-SemiBold',
  },
  modalHeaderContainer: {
    backgroundColor: Colors.primary.blue,
  },
  titleContainerFaded: {
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(30),
    opacity: 0.5,
  },
  titleFaded: {
    fontSize: fontScale(25),
    lineHeight: fontScale(35),
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
    fontWeight: '500',
  },
});
