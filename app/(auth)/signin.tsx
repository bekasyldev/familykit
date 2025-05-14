import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { router, Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { scale, verticalScale, fontScale, moderateScale, listenOrientationChange } from '@/constants/Layout';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  
  useEffect(() => {
    const subscription = listenOrientationChange(() => {
      setDimensions(Dimensions.get('window'));
    });
    
    return () => subscription.remove();
  }, []);

  const handleSignIn = () => {
    // TODO: Implement sign in logic
    router.push('/selection/unified-selection');
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign in
  };

  const handleAppleSignIn = () => {
    // TODO: Implement Apple sign in
  };

  const handleSignUp = () => {
    router.push('/(auth)/signup');
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      <View style={styles.header}>
        <ThemedText style={styles.logoText}>Family<ThemedText style={styles.logoSpan}>Kite</ThemedText></ThemedText>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.formContainer}>
          <ThemedText style={styles.title}>Войти</ThemedText>

          <TextInput
            style={styles.input}
            placeholder="Введите почту"
            placeholderTextColor={Colors.grayscale.gray}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Пароль"
            placeholderTextColor={Colors.grayscale.gray}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <ThemedText style={styles.signInButtonText}>Войти</ThemedText>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <ThemedText style={styles.dividerText}>Или</ThemedText>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
            <ThemedText style={styles.socialButtonText}>Войти с Google</ThemedText>
            <Image source={require('./../../assets/images/google.png')} style={{ width: scale(25), height: scale(25) }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignIn}>
            <ThemedText style={styles.socialButtonText}>Войти с Apple</ThemedText>
            <AntDesign name="apple1" size={scale(24)} color="#000000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.switchAuthButton} onPress={handleSignUp}>
            <ThemedText style={styles.switchAuthText}>
              Нет аккаунта? Зарегистрироваться
            </ThemedText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.blue,
  },
  header: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(60),
  },
  logoText: {
    fontSize: fontScale(24),
    fontFamily: 'Poppins-Bold',
    color: Colors.grayscale.white,
    paddingVertical: verticalScale(10),
    textAlign: "center"
  },
  logoSpan: {
    fontSize: fontScale(24),
    fontFamily: 'Poppins',
    color: Colors.grayscale.white,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    marginTop: verticalScale(10),
  },
  formContainer: {
    padding: scale(32),
  },
  title: {
    fontSize: fontScale(25),
    fontFamily: 'Manrope',
    color: Colors.grayscale.black,
    fontWeight: '600',
    marginBottom: verticalScale(32),
    paddingVertical: verticalScale(10)
  },
  input: {
    backgroundColor: Colors.grayscale.lightGray1,
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: verticalScale(16),
    fontSize: fontScale(16),
    fontFamily: 'Manrope',
    color: Colors.grayscale.black,
  },
  signInButton: {
    backgroundColor: Colors.accent.lightOrange,
    borderRadius: scale(12),
    padding: scale(16),
    alignItems: 'center',
    marginTop: verticalScale(60),
  },
  signInButtonText: {
    color: Colors.grayscale.white,
    fontSize: fontScale(16),
    fontFamily: 'Manrope-SemiBold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(24),
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.grayscale.lightGray1,
  },
  dividerText: {
    marginHorizontal: scale(16),
    color: Colors.grayscale.gray,
    fontSize: fontScale(14),
    fontFamily: 'Manrope',
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: Colors.grayscale.lightGray1,
    borderRadius: scale(12),
    paddingHorizontal: scale(32),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    marginBottom: verticalScale(16),
    justifyContent: 'space-between',
  },
  socialButtonText: {
    color: Colors.grayscale.black,
    fontSize: fontScale(16),
    fontFamily: 'Manrope-SemiBold',
    marginRight: scale(8),
  },
  switchAuthButton: {
    marginTop: verticalScale(16),
    alignItems: 'center',
  },
  switchAuthText: {
    color: Colors.primary.blue,
    fontSize: fontScale(14),
    fontFamily: 'Manrope',
  },
});