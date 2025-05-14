import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, Dimensions, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { scale, verticalScale, fontScale, moderateScale, listenOrientationChange } from '@/constants/Layout';

interface FilterOption {
  title: string;
  options: string[];
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

const filterOptions: FilterOption[] = [
  {
    title: 'Возраст ребенка',
    options: ['0-2 года', '3-5 лет', '6-9 лет', '10-12 лет', '13+ лет']
  },
  {
    title: 'Место',
    options: ['Дома', 'На улице', 'В путешествии', 'В машине']
  },
  {
    title: 'Цель',
    options: ['Развитие навыков', 'Отдых', 'Обучение', 'Физическая активность']
  },
  {
    title: 'Время',
    options: ['5-10 минут', '10-15 минут', '15-30 минут', '30+ минут']
  },
  {
    title: 'Уровень энергии',
    options: ['Низкий', 'Средний', 'Высокий']
  }
];

export const FilterModal = ({ visible, onClose }: FilterModalProps) => {
  const [expandedOption, setExpandedOption] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  
  // Handle orientation changes
  useEffect(() => {
    const subscription = listenOrientationChange(() => {
      setDimensions(Dimensions.get('window'));
    });
    
    return () => subscription.remove();
  }, []);

  const toggleOption = (index: number) => {
    if (expandedOption === index) {
      setExpandedOption(null);
    } else {
      setExpandedOption(index);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.filterModal, { width: dimensions.width > 600 ? '70%' : '88%' }]}>
          <View style={styles.filterHeader}>
            <ThemedText style={styles.filterTitle}>Фильтры</ThemedText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Image 
                source={require('../../assets/images/close-blue.svg')} 
                style={styles.closeIcon}
              />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            {filterOptions.map((option, index) => (
              <View key={index} style={styles.filterOptionContainer}>
                <TouchableOpacity 
                  style={styles.filterOption} 
                  onPress={() => toggleOption(index)}
                >
                  <ThemedText style={styles.filterOptionText}>{option.title}</ThemedText>
                  <Image 
                    source={require('../../assets/images/menu-outline.svg')}
                    style={[
                      styles.arrowIcon, 
                      expandedOption === index && styles.arrowIconRotated
                    ]} 
                  />
                </TouchableOpacity>
                
                {expandedOption === index && (
                  <View style={styles.dropdownContainer}>
                    {option.options.map((item, idx) => (
                      <TouchableOpacity 
                        key={idx}
                        style={styles.dropdownItem}
                      >
                        <ThemedText style={styles.dropdownItemText}>{item}</ThemedText>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.applyButton} onPress={onClose}>
              <ThemedText style={styles.applyButtonText}>Применить</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.resetButton} onPress={onClose}>
              <ThemedText style={styles.resetButtonText}>Сбросить</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: verticalScale(50),
    paddingBottom: verticalScale(20),
  },
  filterModal: {
    backgroundColor: Colors.grayscale.white,
    borderRadius: scale(24),
    paddingHorizontal: scale(30),
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(30),
    maxHeight: '90%',
    flexDirection: 'column',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  filterTitle: {
    fontSize: fontScale(25),
    fontWeight: '500',
    fontFamily: 'Manrope-Medium',
  },
  closeButton: {
    padding: scale(5),
  },
  closeIcon: {
    width: scale(20),
    height: scale(20),
  },
  scrollView: {
    flexGrow: 0,
    maxHeight: '70%',
  },
  scrollViewContent: {
    paddingVertical: verticalScale(10),
  },
  filterOptionContainer: {
    marginBottom: verticalScale(12),
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(17),
    backgroundColor: '#F5F5F5',
    borderRadius: scale(15),
  },
  filterOptionText: {
    fontSize: fontScale(16),
    opacity: 0.5,
    fontFamily: 'Manrope',
  },
  arrowIcon: {
    width: scale(16),
    height: scale(7.5),
  },
  arrowIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  dropdownContainer: {
    backgroundColor: '#F0F0F0',
    borderBottomLeftRadius: scale(15),
    borderBottomRightRadius: scale(15),
    marginTop: verticalScale(2),
    paddingHorizontal: scale(17),
    paddingTop: verticalScale(6),
    paddingBottom: verticalScale(10),
  },
  dropdownItem: {
    paddingVertical: verticalScale(10),
  },
  dropdownItemText: {
    fontSize: fontScale(14),
    fontFamily: 'Manrope',
    opacity: 0.7,
  },
  buttonContainer: {
    marginTop: verticalScale(20),
  },
  applyButton: {
    backgroundColor: Colors.primary.blue,
    borderRadius: scale(16),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
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
});
