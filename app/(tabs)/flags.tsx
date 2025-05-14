import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Dimensions, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { FlagCard } from '@/components/cards/FlagCard';
import { scale, verticalScale, fontScale, moderateScale, listenOrientationChange } from '@/constants/Layout';
import { useState, useEffect } from 'react';

export default function FlagsScreen() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  
  // Handle orientation changes
  useEffect(() => {
    const subscription = listenOrientationChange(() => {
      setDimensions(Dimensions.get('window'));
    });
    
    return () => subscription.remove();
  }, []);
  
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={scale(24)} color={Colors.primary.blue} />
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
    gap: scale(12),
    paddingTop: verticalScale(70),
    paddingBottom: verticalScale(20),
    paddingHorizontal: scale(20),
  },
  title: {
    fontSize: fontScale(24),
    fontWeight: '600',
    fontFamily: 'Manrope',
    color: Colors.primary.darkBlue,
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(100),
  },
  instructionsBox: {
    backgroundColor: Colors.primary.darkBlue,
    borderRadius: scale(24),
    padding: scale(30),
    marginHorizontal: scale(20),
    marginBottom: verticalScale(32),
  },
  instructionsTitle: {
    fontSize: fontScale(18),
    fontWeight: '700',
    color: Colors.grayscale.white,
    marginBottom: verticalScale(10),
    fontFamily: 'Manrope',
  },
  instruction: {
    fontSize: fontScale(15),
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
    marginLeft: scale(10),
    marginBottom: verticalScale(8),
  },
  sectionTitle: {
    fontSize: fontScale(18),
    fontWeight: '600',
    color: Colors.grayscale.black,
    marginBottom: verticalScale(16),
    fontFamily: 'Manrope',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: scale(12),
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