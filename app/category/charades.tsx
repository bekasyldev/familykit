import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

export default function CharadesScreen() {
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
        <ThemedText style={styles.title}>Шарады</ThemedText>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
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
          <TouchableOpacity style={styles.card}>
            <Image source={require('@/assets/images/ball.png')} style={styles.cardImage} />
            <ThemedText style={styles.cardText}>Игры</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Image source={require('@/assets/images/toy.png')} style={styles.cardImage} />
            <ThemedText style={styles.cardText}>Игрушки</ThemedText>
          </TouchableOpacity>
        </View>

        <ThemedText style={styles.sectionTitle}>Природа</ThemedText>
        <View style={styles.cardWrap}>
          <TouchableOpacity style={styles.card}>
            <Image source={require('@/assets/images/animals.png')} style={styles.cardImage} />
            <ThemedText style={styles.cardText}>Животное</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Image source={require('@/assets/images/birds.png')} style={styles.cardImage} />
            <ThemedText style={styles.cardText}>Птицы</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Image source={require('@/assets/images/fishes.png')} style={styles.cardImage} />
            <ThemedText style={styles.cardText}>Рыбы</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Image source={require('@/assets/images/nature.png')} style={styles.cardImage} />
            <ThemedText style={styles.cardText}>Природа</ThemedText>
          </TouchableOpacity>
        </View>

        <ThemedText style={styles.sectionTitle}>Люди</ThemedText>
        <View style={styles.cardRow}>
          <TouchableOpacity style={styles.card}>
            <Image source={require('@/assets/images/profesions.png')} style={styles.cardImage} />
            <ThemedText style={styles.cardText}>Профессии</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Image source={require('@/assets/images/characters.png')} style={styles.cardImage} />
            <ThemedText style={styles.cardText}>Персонажи</ThemedText>
          </TouchableOpacity>
        </View>

        <ThemedText style={styles.sectionTitle}>Окружающие предметы</ThemedText>
          <View style={styles.cardWrap}>
            <TouchableOpacity style={styles.card}>
              <Image source={require('@/assets/images/house.png')} style={styles.cardImage} />
              <ThemedText style={styles.cardText}>Дом</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
              <Image source={require('@/assets/images/car.png')} style={styles.cardImage} />
              <ThemedText style={styles.cardText}>Машины</ThemedText>
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
    paddingVertical: 10
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    borderWidth: 1,
    borderColor: Colors.grayscale.lightGray1,
    borderRadius: 17,
    padding: 12,
    alignItems: 'center',
    backgroundColor: Colors.grayscale.white,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Manrope',
    color: Colors.primary.blue,
  },
  cardImage: {
    width: 100, // increased
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  cardWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
    marginBottom: 16,
  },
  fullWidthRowCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.grayscale.lightGray1,
    borderRadius: 17,
    padding: 16,
    backgroundColor: Colors.grayscale.white,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sideCardImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  leftCardText: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Manrope',
    color: Colors.primary.blue,
  },
});