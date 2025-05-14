import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import { scale, verticalScale, fontScale, moderateScale, listenOrientationChange } from '@/constants/Layout';

const slides = [
  {
    id: 1,
    title: 'Моменты,',
    titleSpan: 'которые\nостаются навсегда',
    description: 'Ваш ребенок будет помнить не игрушки,\nа ваше внимание и время.',
    subDescription: 'Мы помогаем сделать эти моменты\nособенными!',
    image: require('@/assets/images/onboarding-1.png'),
  },
  {
    id: 2,
    title: 'Игры, разговоры',
    titleSpan: 'и общение',
    description: 'Мы собрали идеи для совместных\nактивностей на любой вкус: в помещении,\nна улице, с разговорами и играми',
    image: require('@/assets/images/onboarding-2.png'),
  },
  {
    id: 3,
    title: 'Инвестиции в',
    titleSpan: 'будущее',
    description: 'Каждый день, проведенный вместе,\nделает вашего ребенка увереннее,\nсчастливее и ближе к вам',
    image: require('@/assets/images/onboarding-3.png'),
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const { width } = dimensions;

  // Handle orientation changes
  useEffect(() => {
    const subscription = listenOrientationChange(() => {
      setDimensions(Dimensions.get('window'));
    });
    
    return () => subscription.remove();
  }, []);

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
  };

  useEffect(() => {
    // Auto-scroll timer
    timerRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(nextIndex);
      scrollToIndex(nextIndex);
    }, 3000); // Change slide every 3 seconds

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentIndex, width]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
      // Reset timer when manually scrolled
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      timerRef.current = setInterval(() => {
        const nextIndex = (index + 1) % slides.length;
        setCurrentIndex(nextIndex);
        scrollToIndex(nextIndex);
      }, 3000);
    }
  };

  const handleSignUp = () => {
    router.push('/(auth)/signup');
  };

  const handleSignIn = () => {
    router.push('/(auth)/signin');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide) => (
          <View key={slide.id} style={[styles.slide, { width }]}>
            <View style={styles.logoContainer}>
              <ThemedText style={styles.logoText}>Family<ThemedText style={styles.logoSpan}>Kite</ThemedText></ThemedText>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.textContainer}>
                <ThemedText style={styles.title}>
                  {slide.title}{' '}
                  <ThemedText style={styles.titleSpan}>{slide.titleSpan}</ThemedText>
                </ThemedText>
                <ThemedText style={styles.description}>{slide.description}</ThemedText>
                {slide.subDescription && (
                  <ThemedText style={styles.subDescription}>{slide.subDescription}</ThemedText>
                )}
              </View>
              <View style={[styles.imageContainer, {
                maxHeight: dimensions.height > 700 ? verticalScale(400) : verticalScale(300)
              }]}>
                <Image source={slide.image} style={styles.image} contentFit="contain" />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <ThemedText style={styles.signUpButtonText}>Зарегистрироваться</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <ThemedText style={styles.signInButtonText}>Войти</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.blue,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    flex: 1,
  },
  logoContainer: {
    paddingTop: verticalScale(60), 
    paddingHorizontal: scale(20),
    marginTop: verticalScale(20),
  },
  logoText: {
    fontSize: fontScale(24),
    fontFamily: 'Poppins-Bold',
    color: Colors.grayscale.white,
    paddingVertical: verticalScale(20),
    textAlign: "center"
  },
  logoSpan: {
    fontSize: fontScale(24),
    fontFamily: 'Poppins',
    color: Colors.grayscale.white,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: scale(20),
    marginTop: verticalScale(40),
  },
  textContainer: {
    marginBottom: verticalScale(40),
  },
  title: {
    fontSize: fontScale(30),
    lineHeight: fontScale(38),
    fontFamily: 'Manrope',
    color: Colors.grayscale.white,
    fontWeight: '600',
    marginBottom: verticalScale(24),
    textAlign: "center",
  },
  titleSpan: {
    fontSize: fontScale(30),
    fontFamily: 'Manrope',
    color: Colors.grayscale.white,
    fontWeight: '400'
  },
  description: {
    fontSize: fontScale(16),
    lineHeight: fontScale(24),
    fontFamily: 'Manrope',
    color: Colors.grayscale.white,
    fontWeight: '400',
    marginBottom: verticalScale(16),
    textAlign: "center"
  },
  subDescription: {
    fontSize: fontScale(16),
    lineHeight: fontScale(24),
    fontFamily: 'Manrope',
    color: Colors.grayscale.white,
    fontWeight: '400',
    textAlign: "center"
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    padding: scale(40),
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    marginTop: verticalScale(20)
  },
  signUpButton: {
    backgroundColor: Colors.accent.lightOrange,
    borderRadius: scale(12),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  signUpButtonText: {
    color: Colors.grayscale.white,
    fontSize: fontScale(16),
    fontFamily: 'Manrope-SemiBold',
  },
  signInButton: {
    backgroundColor: Colors.grayscale.lightGray2,
    borderRadius: scale(12),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
  },
  signInButtonText: {
    color: Colors.accent.orange,
    fontSize: fontScale(16),
    fontFamily: 'Manrope-SemiBold',
  },
});