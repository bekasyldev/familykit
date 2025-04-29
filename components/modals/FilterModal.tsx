import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, Dimensions, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

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
        <View style={styles.filterModal}>
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
    paddingTop: 50,
    paddingBottom: 20,
  },
  filterModal: {
    width: '88%',
    backgroundColor: Colors.grayscale.white,
    borderRadius: 24,
    paddingHorizontal: 40,
    paddingTop: 30,
    paddingBottom: 30,
    maxHeight: '90%',
    flexDirection: 'column',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 25,
    fontWeight: '500',
    fontFamily: 'Manrope-Medium',
  },
  closeButton: {
    padding: 5,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  scrollView: {
    flexGrow: 0,
    maxHeight: '70%',
  },
  scrollViewContent: {
    paddingVertical: 10,
  },
  filterOptionContainer: {
    marginBottom: 12,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 17,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
  },
  filterOptionText: {
    fontSize: 16,
    opacity: 0.5,
    fontFamily: 'Manrope',
  },
  arrowIcon: {
    width: 16,
    height: 7.5,
  },
  arrowIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  dropdownContainer: {
    backgroundColor: '#F0F0F0',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginTop: 2,
    paddingHorizontal: 17,
    paddingTop: 6,
    paddingBottom: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
  },
  dropdownItemText: {
    fontSize: 14,
    fontFamily: 'Manrope',
    opacity: 0.7,
  },
  buttonContainer: {
    marginTop: 20,
  },
  applyButton: {
    backgroundColor: Colors.primary.blue,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
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
});
