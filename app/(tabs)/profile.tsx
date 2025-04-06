import { StyleSheet, View, TouchableOpacity, Switch } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Профиль</ThemedText>
      </View>
      <View style={styles.content}>
        <ThemedText style={styles.sectionTitle}>
          Настройки приложения
        </ThemedText>
        
        <TouchableOpacity style={styles.setting}>
          <ThemedText style={styles.settingText}>Язык</ThemedText>
          <MaterialIcons name="keyboard-arrow-down" size={24} color={Colors.primary.blue} />
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

        <TouchableOpacity style={styles.setting}>
          <ThemedText style={styles.settingText}>Поддержка</ThemedText>
          <MaterialIcons name="headset" size={24} color={Colors.primary.blue} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.setting}>
          <ThemedText style={styles.settingText}>Оставить отзыв</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}>
          <ThemedText style={styles.logoutText}>
            Выйти с аккаунта
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
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
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
});