import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router, Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import { Colors } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // TODO: Implement sign up logic
    router.push('/selection/unified-selection');
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google sign up
  };

  const handleAppleSignUp = () => {
    // TODO: Implement Apple sign up
  };

  const handleSignIn = () => {
    router.push('/(auth)/signin');
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
          <ThemedText style={styles.title}>Регистрация</ThemedText>

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

          <TextInput
            style={styles.input}
            placeholder="Подтвердите пароль"
            placeholderTextColor={Colors.grayscale.gray}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <ThemedText style={styles.signUpButtonText}>Зарегистрироваться</ThemedText>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <ThemedText style={styles.dividerText}>Или</ThemedText>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignUp}>
            <ThemedText style={styles.socialButtonText}>Войти с Google</ThemedText>
            <Image source={require('./../../assets/images/google.png')} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignUp}>
            <ThemedText style={styles.socialButtonText}>Войти с Apple</ThemedText>
            <AntDesign name="apple1" size={24} color="#000000" />
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
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  logoText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.grayscale.white,
    paddingVertical: 10,
    textAlign: "center"
  },
  logoSpan: {
    fontSize: 24,
    fontFamily: 'Poppins',
    color: Colors.grayscale.white,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  formContainer: {
    padding: 42,
  },
  title: {
    fontSize: 25,
    fontFamily: 'Manrope',
    color: Colors.grayscale.black,
    fontWeight: 600,
    marginBottom: 32,
    paddingVertical: 10
  },
  input: {
    backgroundColor: Colors.grayscale.lightGray1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Manrope',
    color: Colors.grayscale.black,
  },
  signUpButton: {
    backgroundColor: Colors.accent.lightOrange,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 80,
  },
  signUpButtonText: {
    color: Colors.grayscale.white,
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.grayscale.lightGray1,
  },
  dividerText: {
    marginHorizontal: 16,
    color: Colors.grayscale.gray,
    fontSize: 14,
    fontFamily: 'Manrope',
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: Colors.grayscale.lightGray1,
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  socialButtonText: {
    color: Colors.grayscale.black,
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
    marginRight: 8,
  },
  switchAuthButton: {
    marginTop: 8,
    alignItems: 'center',
  },
  switchAuthText: {
    color: Colors.primary.blue,
    fontSize: 14,
    fontFamily: 'Manrope',
  },
}); 