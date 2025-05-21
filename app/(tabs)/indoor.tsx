import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Dimensions, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { scale, verticalScale, fontScale, moderateScale, listenOrientationChange } from '@/constants/Layout';
import { useState, useEffect } from 'react';

export default function IndoorScreen() {
  const { width } = useWindowDimensions();
  const [cardSize, setCardSize] = useState((width - scale(64)) / 2);
  
  // Handle orientation changes
  useEffect(() => {
    const subscription = listenOrientationChange(() => {
      const newWidth = Dimensions.get('window').width;
      setCardSize((newWidth - scale(64)) / 2);
    });
    
    return () => subscription.remove();
  }, []);

  const items = [
    { title: 'Наука', icon: require('@/assets/images/science.png'), route: '/(tabs)/science' },
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
          <Ionicons name="arrow-back" size={scale(24)} color={Colors.grayscale.white} />
        </TouchableOpacity>
        <ThemedText style={styles.title}>В помещении</ThemedText>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.grid}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, { width: cardSize, height: cardSize }]}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.blue,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(70),
    paddingBottom: verticalScale(20),
    gap: scale(12),
  },
  title: {
    fontSize: fontScale(25),
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
    fontWeight: '600',
    paddingVertical: verticalScale(10)
  },
  scroll: {
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(60),
    paddingHorizontal: scale(20),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: Colors.grayscale.white,
    borderRadius: scale(17),
    borderWidth: 1,
    borderColor: Colors.grayscale.lightGray1,
    marginBottom: verticalScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(10),
  },
  icon: {
    width: scale(48),
    height: scale(48),
    resizeMode: 'contain',
  },
  cardText: {
    fontSize: fontScale(16),
    fontWeight: '500',
    marginTop: verticalScale(16),
    color: Colors.primary.darkBlue,
    fontFamily: 'Manrope',
    textAlign: 'center',
  },
});