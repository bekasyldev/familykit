import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';

const { width } = Dimensions.get('window');

export default function CategoriesScreen() {
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      <View style={styles.header}>
        <ThemedText style={styles.title}>Категории</ThemedText>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="options-outline" size={24} color={Colors.grayscale.white} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Активности</ThemedText>
            
            <View style={styles.cardRow}>
              <TouchableOpacity 
                style={styles.card}
                onPress={() => router.push('/category/indoor' as any)}
              >
                <ThemedText style={styles.cardText}>В помещении</ThemedText>
                <Image source={require('../../assets/images/indoor.png')} style={styles.cardImage} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.card}
                onPress={() => router.push('/category/outdoor' as any)}
              >
                <ThemedText style={styles.cardText}>На улице</ThemedText>
                <Image source={require('../../assets/images/outdoor.png')} style={styles.cardImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.cardRow}>
            <TouchableOpacity 
                style={styles.card}
                onPress={() => router.push('/category/holiday' as any)}
              >
                <ThemedText style={styles.cardText}>Праздничные</ThemedText>
                <Image source={require('../../assets/images/holiday.png')} style={styles.cardImage} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Разговоры</ThemedText>
            <View style={styles.cardRow}>
              <TouchableOpacity 
                style={styles.card}
                onPress={() => router.push('/category/word-games' as any)}
              >
                <ThemedText style={styles.cardText}>Словесные игры</ThemedText>
                <Image source={require('../../assets/images/word-games.png')} style={styles.cardImage} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.card}
                onPress={() => router.push('/category/questions' as any)}
              >
                <ThemedText style={styles.cardText}>Вопросы и ответы</ThemedText>
                <Image source={require('../../assets/images/questions.png')} style={styles.cardImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.cardRow}>
              <TouchableOpacity 
                style={styles.card}
                onPress={() => router.push('/category/story' as any)}
              >
                <ThemedText style={styles.cardText}>Расскажи историю</ThemedText>
                <Image source={require('../../assets/images/story.png')} style={styles.cardImage} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Игры онлайн</ThemedText>
            <View style={styles.cardRow}>
              <TouchableOpacity 
                style={styles.card}
                onPress={() => router.push('/category/charades' as any)}
              >
                <ThemedText style={styles.cardText}>Шарады</ThemedText>
                <Image source={require('../../assets/images/charades.png')} style={styles.cardImage} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.card}
                onPress={() => router.push('/category/flags' as any)}
              >
                <ThemedText style={styles.cardText}>Угадай флаг</ThemedText>
                <Image source={require('../../assets/images/flags.png')} style={styles.cardImage} />
              </TouchableOpacity>
            </View>
          </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    color: Colors.grayscale.white,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    paddingVertical: 10
  },
  menuButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.grayscale.black,
    marginBottom: 16,
    fontFamily: 'Manrope',
  },
  divider: {
    width: width - 40,
    height: 1,
    backgroundColor: Colors.grayscale.black,
    opacity: 0.1,
    marginVertical: 16,
    alignSelf: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: (width - 56) / 2,
    aspectRatio: 167/181,
    backgroundColor: Colors.grayscale.white,
    borderRadius: 17,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.grayscale.lightGray1,
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary.blue,
    fontFamily: 'Manrope',
  },
  cardImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    alignSelf: 'center',
  },
});