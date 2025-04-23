import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const { width } = Dimensions.get('window');

export default function IndoorScreen() {
  const items = [
    { title: 'Наука', icon: require('@/assets/images/science.png'), route: '/indoor/science' },
    { title: 'Игры', icon: require('@/assets/images/games.png'), route: '/indoor/games' },
    { title: 'Творчество', icon: require('@/assets/images/creativity.png'), route: '/indoor/creativity' },
    { title: 'Готовка', icon: require('@/assets/images/cooking.png'), route: '/indoor/cooking' },
    { title: 'Рисование', icon: require('@/assets/images/drawing.png'), route: '/indoor/drawing' },
  ];

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.grayscale.white} />
        </TouchableOpacity>
        <ThemedText style={styles.title}>В помещении</ThemedText>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.grid}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => router.push(item.route as any)}
            >
              <Image source={item.icon} style={styles.icon} />
              <ThemedText style={styles.cardText}>{item.title}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const CARD_SIZE = (width - 64) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.blue,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 20,
    gap: 12,
  },
  title: {
    fontSize: 25,
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
    fontWeight: '600',
    paddingVertical: 10
  },
  scroll: {
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: Colors.grayscale.white,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: Colors.grayscale.lightGray1,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  icon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
    color: Colors.primary.darkBlue,
    fontFamily: 'Manrope',
    textAlign: 'center',
  },
});