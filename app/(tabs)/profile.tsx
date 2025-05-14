import { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Switch, Modal, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { scale, verticalScale, fontScale, listenOrientationChange } from '@/constants/Layout';

export default function ProfileScreen() {
  const router = useRouter();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Русский');
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = listenOrientationChange(() => {
      setDimensions(Dimensions.get('window'));
    });
    
    return () => subscription.remove();
  }, []);

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
            <MaterialIcons name="keyboard-arrow-down" size={scale(24)} color={Colors.primary.blue} />
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
          <MaterialIcons name="headset" size={scale(24)} color={Colors.primary.blue} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.setting}
        >
          <ThemedText style={styles.settingText}>Оставить отзыв</ThemedText>
          <MaterialIcons name="arrow-forward-ios" size={scale(20)} color={Colors.primary.blue} />
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
                <MaterialIcons name="close" size={scale(24)} color={Colors.primary.blue} />
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
                <MaterialIcons name="check" size={scale(24)} color={Colors.accent.orange} />
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
                <MaterialIcons name="check" size={scale(24)} color={Colors.accent.orange} />
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
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(80),
    paddingBottom: verticalScale(20),
  },
  title: {
    fontSize: fontScale(24),
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
    fontWeight: '600',
    paddingVertical: verticalScale(10)
  },
  content: {
    flex: 1,
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    padding: scale(20),
  },
  sectionTitle: {
    fontSize: fontScale(18),
    fontWeight: '600',
    color: Colors.grayscale.black,
    marginBottom: verticalScale(24),
    marginTop: verticalScale(10),
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayscale.lightGray1,
  },
  settingText: {
    fontSize: fontScale(16),
    color: Colors.primary.blue,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    fontSize: fontScale(16),
    color: Colors.grayscale.gray,
    marginRight: scale(4),
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  switchLabel: {
    fontSize: fontScale(14),
    color: Colors.grayscale.gray,
  },
  logoutButton: {
    marginTop: verticalScale(32),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    backgroundColor: Colors.grayscale.lightGray2,
    borderRadius: scale(12),
  },
  logoutText: {
    fontSize: fontScale(16),
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
    borderRadius: scale(24),
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(24),
  },
  languageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  languageTitle: {
    fontSize: fontScale(20),
    fontWeight: '600',
    color: Colors.grayscale.black,
    fontFamily: 'Manrope',
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(16),
    borderRadius: scale(12),
    marginBottom: verticalScale(12),
  },
  selectedLanguage: {
    backgroundColor: Colors.grayscale.lightGray2,
  },
  languageText: {
    fontSize: fontScale(16),
    color: Colors.grayscale.black,
    fontFamily: 'Manrope',
  },
  selectedLanguageText: {
    fontWeight: '500',
    color: Colors.accent.orange,
  },
  confirmButton: {
    backgroundColor: Colors.primary.blue,
    borderRadius: scale(16),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    marginTop: verticalScale(16),
  },
  confirmButtonText: {
    color: Colors.grayscale.white,
    fontSize: fontScale(16),
    fontFamily: 'Manrope-SemiBold',
    fontWeight: '600',
  },
});