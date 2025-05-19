import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { scale, verticalScale, fontScale, moderateScale, listenOrientationChange } from '@/constants/Layout';
import { useState, useEffect } from 'react';

export default function CharadesScreen() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [cardWidth, setCardWidth] = useState<'48%' | '31%'>('48%');
  
  // Handle orientation changes
  useEffect(() => {
    const updateLayout = () => {
      const { width } = Dimensions.get('window');
      // Use 3 columns in landscape mode on larger screens
      if (width > 600 && width > Dimensions.get('window').height) {
        setCardWidth('31%' as const);
      } else {
        setCardWidth('48%' as const);
      }
      setDimensions(Dimensions.get('window'));
    };
    
    const subscription = listenOrientationChange(updateLayout);
    updateLayout(); // Initialize on mount
    
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
        <ThemedText style={styles.title}>Шарады</ThemedText>
      </View>

      <ScrollView contentContainerStyle={[
        styles.scrollContent,
        { paddingHorizontal: dimensions.width > 600 ? scale(60) : scale(40) }
      ]}>
        <View style={styles.instructionsBox}>
          <ThemedText style={styles.instructionsTitle}>Как играть?</ThemedText>
          <ThemedText style={styles.instruction}>
            1. Ребенок или родитель берет телефон и ставит его на лоб, не заглядывая в экран
          </ThemedText>
          <ThemedText style={styles.instruction}>
            2. Слово появляется на экране, а задача — угадать его, задавая вопросы с ответами «да» или «нет».
          </ThemedText>
          <ThemedText style={styles.instruction}>
            3. Играйте вместе, задавая вопросы и получая подсказки, чтобы быстрее разгадать слово!
          </ThemedText>
        </View>

        <ThemedText style={styles.sectionTitle}>Игрушки</ThemedText>
        <View style={styles.cardRow}>
          <TouchableOpacity style={[styles.card, { width: cardWidth }]}>
            <ThemedText style={styles.cardText}>Игры</ThemedText>
            <Image source={require('@/assets/images/ball.png')} style={styles.cardImage} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card, { width: cardWidth }]}>
            <ThemedText style={styles.cardText}>Игрушки</ThemedText>
            <Image source={require('@/assets/images/toy.png')} style={styles.cardImage} />
          </TouchableOpacity>
        </View>

        <ThemedText style={styles.sectionTitle}>Природа</ThemedText>
        <View style={styles.cardWrap}>
          <TouchableOpacity style={[styles.card, { width: cardWidth }]}>
            <ThemedText style={styles.cardText}>Животное</ThemedText>
            <Image source={require('@/assets/images/animals.png')} style={styles.cardImage} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card, { width: cardWidth }]}>
            <ThemedText style={styles.cardText}>Птицы</ThemedText>
            <Image source={require('@/assets/images/birds.png')} style={styles.cardImage} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card, { width: cardWidth }]}>
            <ThemedText style={styles.cardText}>Рыбы</ThemedText>
            <Image source={require('@/assets/images/fishes.png')} style={styles.cardImage} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card, { width: cardWidth }]}>
            <ThemedText style={styles.cardText}>Природа</ThemedText>
            <Image source={require('@/assets/images/nature.png')} style={styles.cardImage} />
          </TouchableOpacity>
        </View>

        <ThemedText style={styles.sectionTitle}>Люди</ThemedText>
        <View style={styles.cardRow}>
          <TouchableOpacity style={[styles.card, { width: cardWidth }]}>
            <ThemedText style={styles.cardText}>Профессии</ThemedText>
            <Image source={require('@/assets/images/profesions.png')} style={styles.cardImage} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card, { width: cardWidth }]}>
            <ThemedText style={styles.cardText}>Персонажи</ThemedText>
            <Image source={require('@/assets/images/characters.png')} style={styles.cardImage} />
          </TouchableOpacity>
        </View>

        <ThemedText style={styles.sectionTitle}>Окружающие предметы</ThemedText>
        <View style={styles.cardWrap}>
          <TouchableOpacity style={[styles.card, { width: cardWidth }]}>
            <ThemedText style={styles.cardText}>Дом</ThemedText>
            <Image source={require('@/assets/images/house.png')} style={styles.cardImage} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card, { width: cardWidth }]}>
            <ThemedText style={styles.cardText}>Машины</ThemedText>
            <Image source={require('@/assets/images/car.png')} style={styles.cardImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.fullWidthRowCard}>
            <ThemedText style={styles.leftCardText}>Одежда</ThemedText>
            <Image source={require('@/assets/images/clothes.png')} style={styles.sideCardImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.fullWidthRowCard}>
            <ThemedText style={styles.leftCardText}>Цвета</ThemedText>
            <Image source={require('@/assets/images/colors.png')} style={styles.sideCardImage} />
          </TouchableOpacity>
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
    paddingTop: verticalScale(80),
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
    paddingBottom: verticalScale(100),
  },
  instructionsBox: {
    backgroundColor: Colors.primary.darkBlue,
    borderRadius: scale(24),
    padding: scale(20),
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
    marginBottom: verticalScale(8),
  },
  sectionTitle: {
    fontSize: fontScale(18),
    fontWeight: '600',
    color: Colors.grayscale.black,
    marginBottom: verticalScale(16),
    fontFamily: 'Manrope',
    paddingVertical: verticalScale(10)
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    borderWidth: 1,
    borderColor: Colors.grayscale.lightGray1,
    borderRadius: scale(17),
    padding: scale(12),
    alignItems: 'flex-start',
    backgroundColor: Colors.grayscale.white,
    marginBottom: verticalScale(16),
  },
  cardText: {
    fontSize: fontScale(16),
    marginLeft: scale(8),
    marginBottom: verticalScale(8),
    fontWeight: '500',
    fontFamily: 'Manrope',
    color: Colors.primary.darkBlue,
  },
  cardImage: {
    width: scale(100),
    height: scale(100),
    marginBottom: verticalScale(10),
    resizeMode: 'contain',
  },
  cardWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: verticalScale(16),
    marginBottom: verticalScale(16),
  },
  fullWidthRowCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.grayscale.lightGray1,
    borderRadius: scale(17),
    padding: scale(16),
    backgroundColor: Colors.grayscale.white,
    marginBottom: verticalScale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sideCardImage: {
    width: scale(100),
    height: scale(100),
    resizeMode: 'contain',
  },
  leftCardText: {
    fontSize: fontScale(18),
    fontWeight: '500',
    fontFamily: 'Manrope',
    color: Colors.primary.blue,
  },
});