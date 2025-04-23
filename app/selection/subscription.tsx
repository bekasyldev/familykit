import React from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const features = [
  'Доступ к более чем 500 уникальным активностям.',
  'Персональные рекомендации на основе возраста и предпочтений ребенка.',
  'Раздел "Избранное" для быстрого доступа к любимым играм и задачам.',
  'Подробные инструкции и видеоуроки к каждой активности.',
  'Новые активности каждую неделю.',
  'Возможность сохранять активности оффлайн',
];

const subscriptionPlans = [
  {
    id: 1,
    period: 'В год',
    price: '36 000₸',
    discount: '-30%',
    isRecommended: true,
  },
  {
    id: 2,
    period: 'В три месяца',
    price: '10 000₸',
    discount: '-20%',
    isRecommended: false,
  },
  {
    id: 3,
    period: 'В месяц',
    price: '4 000₸',
    discount: '',
    isRecommended: false,
  },
];

export default function SubscriptionScreen() {
  const params = useLocalSearchParams<{
    selectedAge: string;
    selectedActivities: string;
    selectedDuration: string;
  }>();

  const handleClose = () => {
    router.push('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        />
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Image 
          source={require('../../assets/images/close.svg')} 
          style={styles.closeIcon}
        />
      </TouchableOpacity>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText style={styles.title}>
          Откройте все{'\n'}
          <ThemedText style={styles.titleBold}>возможности</ThemedText> FamilyKite
        </ThemedText>

        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <ThemedText style={styles.featureIcon}>•</ThemedText>
              <ThemedText style={styles.featureText}>{feature}</ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.subscriptionContainer}>
          {subscriptionPlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planButton,
                plan.isRecommended && styles.recommendedPlanButton,
              ]}
            >
              {plan.isRecommended && (
                <View style={styles.recommendedBadge}>
                  <ThemedText style={styles.recommendedText}>Лучшее предложение</ThemedText>
                </View>
              )}
              
              <View style={styles.planInfo}>
                <ThemedText style={styles.planPeriod}>
                  {plan.period}
                </ThemedText>
                
                <View style={[
                  styles.priceContainer,
                  !plan.discount && styles.priceContainerCentered
                ]}>
                  <ThemedText style={styles.planPrice}>
                    {plan.price}
                  </ThemedText>
                  
                  {plan.discount && (
                    <ThemedText style={styles.planDiscount}>
                      {plan.discount}
                    </ThemedText>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View>
          {[
            'Вы можете отменить подписку в любое время через настройки.',
            'Оплата будет списана с вашего аккаунта при подтверждении покупки.',
            'Все подписки автоматически продлеваются, если не отключить автопродление."'
          ].map((text, index) => (
            <View key={index} style={styles.disclaimerItem}>
              <ThemedText style={styles.disclaimerIcon}>•</ThemedText>
              <ThemedText style={styles.disclaimerText}>{text}</ThemedText>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.blue,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 80,
    right: 30,
    zIndex: 1,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Manrope',
    color: Colors.grayscale.white,
    fontWeight: '400',
    textAlign: 'left',
    lineHeight: 42,
    marginBottom: 20,
  },
  titleBold: {
    fontSize: 28,
    fontFamily: 'Manrope',
    color: Colors.grayscale.white,
    textAlign: 'left',
    lineHeight: 42,
    fontWeight: '600',
  },
  featuresContainer: {
    marginBottom: 60,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  featureIcon: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Regular',
    color: Colors.grayscale.white,
    marginRight: 8,
    lineHeight: 24,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Regular',
    color: Colors.grayscale.white,
    flex: 1,
    lineHeight: 24,
  },
  subscriptionContainer: {
  },
  planButton: {
    backgroundColor: Colors.grayscale.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  recommendedPlanButton: {
    borderWidth: 2,
    borderColor: Colors.accent.orange,
  },
  planInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planPeriod: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Regular',
    color: Colors.primary.blue,
    fontWeight: '600',
  },
  priceContainer: {
    alignItems: 'flex-end',
    height: 40,
    justifyContent: 'flex-start', 
  },
  priceContainerCentered: {
    justifyContent: 'center',
  },
  planPrice: {
    fontSize: 18,
    fontFamily: 'Inter_18pt-Medium',
    fontWeight: '400',
    color: Colors.accent.orange,
  },
  planDiscount: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Regular',
    color: Colors.primary.blue,
    marginTop: 2,
  },
  recommendedPlanDiscount: {
    color: Colors.primary.blue,
  },
  recommendedBadge: {
    position: 'absolute',
    top: -34,
    alignSelf: 'flex-start',
    backgroundColor: Colors.accent.orange,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 13,
  },
  recommendedText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Regular',
    fontWeight: '400',
    color: Colors.grayscale.white,
  },
  disclaimerItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  disclaimerIcon: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Regular',
    color: Colors.grayscale.white,
    marginRight: 8,
  },
  disclaimerText: {
    fontSize: 14,
    fontFamily: 'Inter_18pt-Regular',
    color: Colors.grayscale.white,
    opacity: 0.8,
    lineHeight: 20,
    flex: 1,
  },
});