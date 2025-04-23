import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Platform } from 'react-native';
import { router, Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

// Age ranges data
const ageRanges = [
  { id: 1, label: '1,5 - 3 года' },
  { id: 2, label: '3 - 4 года' },
  { id: 3, label: '4 - 6 лет' },
  { id: 4, label: '6 - 10 лет' },
];

// Activities data
const activities = [
  { id: 1, label: 'Двигаться' },
  { id: 2, label: 'Творить' },
  { id: 3, label: 'Играть в слова' },
  { id: 4, label: 'Общаться' },
  { id: 5, label: 'Узнавать новое' },
];

// Duration options data
const durations = [
  { id: 1, label: '5 - 15 минут' },
  { id: 2, label: '15 - 30 минут' },
  { id: 3, label: '30 минут и больше' },
];

export default function UnifiedSelectionScreen() {
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<number[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [currentSection, setCurrentSection] = useState<number>(0);
  
  const scrollViewRef = useRef<ScrollView>(null);

  const toggleActivity = (id: number) => {
    setSelectedActivities((prev) =>
      prev.includes(id)
        ? prev.filter((activityId) => activityId !== id)
        : [...prev, id]
    );
  };
  
  const handleContinue = (nextSection: number) => {
    if (nextSection < 3) {
      setCurrentSection(nextSection);
      scrollViewRef.current?.scrollTo({ 
        x: width * nextSection, 
        y: 0, 
        animated: true 
      });
    } else {
      // Navigate to the subscription screen with all selections
      router.push({
        pathname: '/selection/subscription' as any,
        params: { 
          selectedAge,
          selectedActivities: selectedActivities.join(','),
          selectedDuration
        }
      });
    }
  };

  const renderProgressIndicator = () => {
    return (
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar, 
            currentSection === 0 ? styles.activeProgressBar : styles.inactiveProgressBar
          ]} 
        />
        <View 
          style={[
            styles.progressBar, 
            currentSection === 1 ? styles.activeProgressBar : styles.inactiveProgressBar
          ]} 
        />
        <View 
          style={[
            styles.progressBar, 
            currentSection === 2 ? styles.activeProgressBar : styles.inactiveProgressBar
          ]} 
        />
      </View>
    );
  };

  const renderAgeSelection = () => {
    return (
      <View style={styles.sectionContainer}>
        <Stack.Screen 
                options={{
                  headerShown: false,
                }} 
              />
        <View style={styles.header}>
          {renderProgressIndicator()}
        </View>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <ThemedText style={styles.title}>
              Выберите возраст вашего <ThemedText style={styles.titleBold}>ребенка</ThemedText>,
              <ThemedText style={styles.title}>
              чтобы мы предложили <ThemedText style={styles.titleBold}>подходящие</ThemedText> идеи
            </ThemedText>
            </ThemedText>
            
          </View>

          <View style={styles.gridContainer}>
            {ageRanges.map((age, index) => (
              <View 
                key={age.id} 
                style={[
                  styles.gridItem,
                  // If it's the last item and the total is odd, center it
                  index === ageRanges.length - 1 && ageRanges.length % 2 === 1 && { marginHorizontal: 'auto', alignSelf: 'center' }
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    selectedAge === age.id && styles.selectedOptionButton,
                  ]}
                  onPress={() => setSelectedAge(age.id)}
                >
                  <ThemedText
                    style={[
                      styles.optionButtonText,
                      selectedAge === age.id && styles.selectedOptionButtonText,
                    ]}
                  >
                    {age.label}
                  </ThemedText>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedAge && styles.disabledButton,
            ]}
            onPress={() => selectedAge !== null && handleContinue(1)}
            disabled={selectedAge === null}
          >
            <ThemedText style={styles.continueButtonText}>Далее</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderActivityPreferences = () => {
    return (
      <View style={styles.sectionContainer}>
        <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
        <View style={styles.header}>
          {renderProgressIndicator()}
        </View>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <ThemedText style={styles.title}>
              Чем <ThemedText style={styles.titleBold}>любит</ThemedText> заниматься ваш ребенок?
            </ThemedText>
          </View>

          <View style={styles.gridContainer}>
            {activities.map((activity, index) => (
              <View 
                key={activity.id} 
                style={[
                  styles.gridItem,
                  // If it's the last item and the total is odd, center it
                  index === activities.length - 1 && activities.length % 2 === 1 && { marginHorizontal: 'auto', alignSelf: 'center' }
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    selectedActivities.includes(activity.id) && styles.selectedOptionButton,
                  ]}
                  onPress={() => toggleActivity(activity.id)}
                >
                  <ThemedText
                    style={[
                      styles.optionButtonText,
                      selectedActivities.includes(activity.id) && styles.selectedOptionButtonText,
                    ]}
                  >
                    {activity.label}
                  </ThemedText>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              selectedActivities.length === 0 && styles.disabledButton,
            ]}
            onPress={() => selectedActivities.length > 0 && handleContinue(2)}
            disabled={selectedActivities.length === 0}
          >
            <ThemedText style={styles.continueButtonText}>Далее</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderDurationSelection = () => {
    return (
      <View style={styles.sectionContainer}>
        <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
        <View style={styles.header}>
          {renderProgressIndicator()}
        </View>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <ThemedText style={styles.title}>
              Выберите продолжительность <ThemedText style={styles.titleBold}>занятия</ThemedText> <ThemedText style={styles.title}>
              чтобы мы предложили подходящие идеи
            </ThemedText>
            </ThemedText>
            
          </View>

          <View style={styles.gridContainer}>
            {durations.map((duration, index) => (
              <View 
                key={duration.id} 
                style={[
                  styles.gridItem,
                  // If it's the last item and the total is odd, center it
                  index === durations.length - 1 && durations.length % 2 === 1 && { marginHorizontal: 'auto', alignSelf: 'center' }
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    selectedDuration === duration.id && styles.selectedOptionButton,
                  ]}
                  onPress={() => setSelectedDuration(duration.id)}
                >
                  <ThemedText
                    style={[
                      styles.optionButtonText,
                      selectedDuration === duration.id && styles.selectedOptionButtonText,
                    ]}
                  >
                    {duration.label}
                  </ThemedText>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedDuration && styles.disabledButton,
            ]}
            onPress={() => selectedDuration !== null && handleContinue(3)}
            disabled={selectedDuration === null}
          >
            <ThemedText style={styles.continueButtonText}>Закончить</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {renderAgeSelection()}
        {renderActivityPreferences()}
        {renderDurationSelection()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.blue,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  sectionContainer: {
    width: width,
    flex: 1,
    backgroundColor: Colors.primary.blue,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 16,
    color: Colors.grayscale.white,
    opacity: 0.5,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  progressBar: {
    height: 2,
    borderRadius: 2,
    width: '25%',
  },
  activeProgressBar: {
    backgroundColor: Colors.grayscale.white,
  },
  inactiveProgressBar: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  content: {
    flex: 1,
    paddingHorizontal: width === 430 ? 44 : width * 0.1,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 19,
    fontFamily: 'Manrope',
    color: Colors.grayscale.white,
    fontWeight: '400',
    textAlign: 'center',
  },
  titleBold: {
    fontSize: 19,
    fontFamily: 'Monrope',
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.grayscale.white,
  },
  optionsContainer: {
    gap: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  gridItem: {
    width: '48%', 
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#084F73', 
    borderRadius: 30, 
    paddingVertical: 15,
    paddingHorizontal: 16,
    alignItems: 'center',
    width: '100%',
    minHeight: 56,
    justifyContent: 'center',
  },
  selectedOptionButton: {
    backgroundColor: Colors.grayscale.white,
  },
  optionButtonText: {
    color: Colors.grayscale.white,
    fontSize: 16,
    fontFamily: 'Manrope-Medium',
    textAlign: 'center',
    flexShrink: 1,
    flexWrap: 'nowrap',
  },
  selectedOptionButtonText: {
    color: Colors.primary.blue,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  continueButton: {
    backgroundColor: Colors.accent.lightOrange,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: Colors.grayscale.white,
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
  },
});