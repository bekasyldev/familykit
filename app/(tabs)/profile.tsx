import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Switch, Modal } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Русский');

  const handleLogout = () => {
    router.push('/(auth)/signup');
  }

  const openLanguageModal = () => {
    setLanguageModalVisible(true);
  }

  const closeLanguageModal = () => {
    setLanguageModalVisible(false);
  }

  const selectLanguage = (language: string) => {
    setSelectedLanguage(language);
    closeLanguageModal();
  }

  const navigateToSupport = () => {
    router.push('/support-chat');
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Профиль</ThemedText>
      </View>
      <View style={styles.content}>
        <ThemedText style={styles.sectionTitle}>
          Настройки приложения
        </ThemedText>
        
        <TouchableOpacity style={styles.setting} onPress={openLanguageModal}>
          <ThemedText style={styles.settingText}>Язык</ThemedText>
          <View style={styles.settingValue}>
            <ThemedText style={styles.valueText}>{selectedLanguage}</ThemedText>
            <MaterialIcons name="keyboard-arrow-down" size={24} color={Colors.primary.blue} />
          </View>
        </TouchableOpacity>

        <View style={styles.setting}>
          <ThemedText style={styles.settingText}>Уведомления</ThemedText>
          <View style={styles.switchContainer}>
            <ThemedText style={styles.switchLabel}>Вкл</ThemedText>
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ 
                false: Colors.grayscale.lightGray1, 
                true: Colors.primary.blue 
              }}
              thumbColor={Colors.grayscale.white}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.setting} onPress={navigateToSupport}>
          <ThemedText style={styles.settingText}>Поддержка</ThemedText>
          <MaterialIcons name="headset" size={24} color={Colors.primary.blue} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.setting}
        >
          <ThemedText style={styles.settingText}>Оставить отзыв</ThemedText>
          <MaterialIcons name="arrow-forward-ios" size={20} color={Colors.primary.blue} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}>
          <ThemedText style={styles.logoutText} onPress={handleLogout}>
            Выйти с аккаунта
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Language Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={languageModalVisible}
        onRequestClose={closeLanguageModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.languageModal}>
            <View style={styles.languageHeader}>
              <ThemedText style={styles.languageTitle}>Выбор языка</ThemedText>
              <TouchableOpacity onPress={closeLanguageModal}>
                <MaterialIcons name="close" size={24} color={Colors.primary.blue} />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={[
                styles.languageOption,
                selectedLanguage === 'Русский' && styles.selectedLanguage
              ]} 
              onPress={() => selectLanguage('Русский')}
            >
              <ThemedText style={[
                styles.languageText,
                selectedLanguage === 'Русский' && styles.selectedLanguageText
              ]}>
                Русский
              </ThemedText>
              {selectedLanguage === 'Русский' && (
                <MaterialIcons name="check" size={24} color={Colors.accent.orange} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.languageOption,
                selectedLanguage === 'English' && styles.selectedLanguage
              ]}
              onPress={() => selectLanguage('English')}
            >
              <ThemedText style={[
                styles.languageText,
                selectedLanguage === 'English' && styles.selectedLanguageText
              ]}>
                English
              </ThemedText>
              {selectedLanguage === 'English' && (
                <MaterialIcons name="check" size={24} color={Colors.accent.orange} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.confirmButton} onPress={closeLanguageModal}>
              <ThemedText style={styles.confirmButtonText}>Подтвердить</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.blue,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
    fontWeight: '600',
    paddingVertical: 10
  },
  content: {
    flex: 1,
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.grayscale.black,
    marginBottom: 24,
    marginTop: 10,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayscale.lightGray1,
  },
  settingText: {
    fontSize: 16,
    color: Colors.primary.blue,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 16,
    color: Colors.grayscale.gray,
    marginRight: 4,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabel: {
    fontSize: 14,
    color: Colors.grayscale.gray,
  },
  logoutButton: {
    marginTop: 32,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: Colors.grayscale.lightGray2,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    color: Colors.accent.orange,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageModal: {
    width: '88%',
    backgroundColor: Colors.grayscale.white,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  languageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  languageTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.grayscale.black,
    fontFamily: 'Manrope',
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedLanguage: {
    backgroundColor: Colors.grayscale.lightGray2,
  },
  languageText: {
    fontSize: 16,
    color: Colors.grayscale.black,
    fontFamily: 'Manrope',
  },
  selectedLanguageText: {
    fontWeight: '500',
    color: Colors.accent.orange,
  },
  confirmButton: {
    backgroundColor: Colors.primary.blue,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  confirmButtonText: {
    color: Colors.grayscale.white,
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
    fontWeight: '600',
  },
});