import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { FlagCard } from '@/components/cards/FlagCard';

export default function FlagsScreen() {
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary.blue} />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Угадай флаг</ThemedText>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.instructionsBox}>
          <ThemedText style={styles.instructionsTitle}>Как играть?</ThemedText>
          <ThemedText style={styles.instruction}>
            1. Ребенок или родитель берет телефон и ставит его на лоб, не заглядывая в экран.На экране появляется флаг страны, а задача — угадать его, задавая вопросы с ответами «да» или «нет».
          </ThemedText>
          <ThemedText style={styles.instruction}>
            2. Играйте вместе! Подсказывайте друг другу, обсуждайте цвета, формы и символы на флаге, чтобы быстрее отгадать страну.
          </ThemedText>
          <ThemedText style={styles.instruction}>
            3. Веселый способ изучать флаги мира и проводить время с семьей! 🌎✨
          </ThemedText>
        </View>
        <View style={[
            styles.cardsContainer, styles.gridContainer
          ]}>
            <FlagCard 
              duration={20}
              onPress={() => {}}
              onLike={() => {}}
            />
            <FlagCard
              duration={20}
              onPress={() => {}}
              onLike={() => {}}
            />
          </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grayscale.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 70,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Manrope',
    color: Colors.primary.blue,
  },
  scrollContent: {
    paddingHorizontal: 40,
    paddingBottom: 100,
  },
  instructionsBox: {
    backgroundColor: Colors.primary.blue,
    borderRadius: 24,
    padding: 20,
    marginBottom: 32,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.grayscale.white,
    marginBottom: 10,
    fontFamily: 'Manrope',
  },
  instruction: {
    fontSize: 15,
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.grayscale.black,
    marginBottom: 16,
    fontFamily: 'Manrope',
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
});