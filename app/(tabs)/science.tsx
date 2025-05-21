import { StyleSheet, View, FlatList, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { scale, verticalScale, fontScale } from '@/constants/Layout';
import { ActivityCard } from '@/components/cards/ActivityCard';
import { useState, useEffect } from 'react';

export default function ScienceScreen() {
  const { width } = useWindowDimensions();
  const [cardSize, setCardSize] = useState((width - scale(64)) / 2);

  useEffect(() => {
    // Update card size on window dimension changes
    setCardSize((width - scale(64)) / 2);
  }, [width]);

const activities = [
    { 
        title: 'Вулкан из соды и уксуса', 
        description: 'Создайте мини-вулкан с помощью простых ингредиентов', 
        duration: 30,
        imageUrl: require('@/assets/images/1.jpg')
    },
    { 
        title: 'Лавовая лампа своими руками', 
        description: 'Сделайте красивую лавовую лампу из подручных материалов', 
        duration: 25,
        imageUrl: require('@/assets/images/1.jpg')
    },
    { 
        title: 'Растущий кристалл из соли', 
        description: 'Вырастите собственные кристаллы из обычной соли', 
        duration: 180,
        imageUrl: require('@/assets/images/1.jpg')
    },
    { 
        title: 'Опыты с магнитами', 
        description: 'Узнайте о магнитных полях с помощью простых опытов', 
        duration: 40,
        imageUrl: require('@/assets/images/1.jpg')
    },
    { 
        title: 'Радуга в стакане', 
        description: 'Создайте красочную радугу в стакане воды', 
        duration: 15,
        imageUrl: require('@/assets/images/1.jpg')
    },
    { 
        title: 'Измерение кислотности (pH) с помощью капусты', 
        description: 'Узнайте о химии с помощью натурального индикатора', 
        duration: 45,
        imageUrl: require('@/assets/images/1.jpg')
    },
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
        <ThemedText style={styles.title}>Наука</ThemedText>
      </View>

      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.gridContainer}>
            {activities.map((item, index) => (
              <View key={index} style={styles.cardWrapper}>
                <ActivityCard 
                  title={item.title}
                  duration={item.duration}
                  imageUrl={item.imageUrl}
                  description={item.description}
                  isGridView={true}
                  onPress={() => {}}
                  onLike={() => console.log(`Добавлено в избранное: ${item.title}`)}
                />
              </View>
            ))}
          </View>
        </ScrollView>
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
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
  },
  scrollContent: {
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(30),
    paddingHorizontal: scale(20),
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
    marginBottom: verticalScale(16),
  },
  separator: {
    height: verticalScale(16),
  }
});
