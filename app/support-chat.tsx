import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { scale, verticalScale, fontScale, moderateScale, listenOrientationChange } from '@/constants/Layout';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function SupportChatScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: 'Здравствуйте! Чем могу помочь?', 
      isUser: false, 
      timestamp: new Date() 
    },
  ]);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  
  // Handle orientation changes
  useEffect(() => {
    const subscription = listenOrientationChange(() => {
      setDimensions(Dimensions.get('window'));
    });
    
    return () => subscription.remove();
  }, []);

  const handleSend = () => {
    if (message.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: message,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setMessage('');
    
    // Simulate support response
    setTimeout(() => {
      const supportMessage: Message = {
        id: messages.length + 2,
        text: 'Спасибо за ваше сообщение! Мы ответим вам в ближайшее время.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, supportMessage]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={scale(24)} color={Colors.grayscale.white} />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Поддержка</ThemedText>
          <View style={{ width: scale(24) }} />
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.content}>
          <ScrollView
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
          >
            {messages.map(msg => (
              <View 
                key={msg.id} 
                style={[
                  styles.messageBubble,
                  msg.isUser ? styles.userMessage : styles.supportMessage
                ]}
              >
                <ThemedText style={styles.messageText}>
                  {msg.text}
                </ThemedText>
                <ThemedText style={styles.timestamp}>
                  {formatTime(msg.timestamp)}
                </ThemedText>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Напишите сообщение..."
              placeholderTextColor={Colors.grayscale.gray}
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity 
              style={[
                styles.sendButton,
                message.trim() === '' ? styles.disabledButton : null
              ]} 
              onPress={handleSend}
              disabled={message.trim() === ''}
            >
              <MaterialIcons 
                name="send" 
                size={scale(24)} 
                color={message.trim() === '' ? Colors.grayscale.gray : Colors.grayscale.white} 
              />
            </TouchableOpacity>
          </View>
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
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    paddingTop: verticalScale(60),
    paddingBottom: verticalScale(20),
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  title: {
    fontSize: fontScale(18),
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    overflow: 'hidden',
  },
  messagesContainer: {
    flex: 1,
    padding: scale(16),
  },
  messagesContent: {
    paddingBottom: scale(16),
  },
  messageBubble: {
    maxWidth: '80%',
    padding: scale(12),
    borderRadius: scale(16),
    marginBottom: verticalScale(12),
  },
  userMessage: {
    backgroundColor: Colors.primary.blue,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  supportMessage: {
    backgroundColor: Colors.primary.lightBlue,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: fontScale(16),
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
  },
  timestamp: {
    fontSize: fontScale(12),
    color: 'rgba(255, 255, 255, 0.7)',
    alignSelf: 'flex-end',
    marginTop: verticalScale(4),
  },
  inputContainer: {
    flexDirection: 'row',
    padding: scale(12),
    borderTopWidth: 1,
    borderTopColor: Colors.grayscale.lightGray1,
    backgroundColor: Colors.grayscale.white,
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  input: {
    flex: 1,
    backgroundColor: Colors.grayscale.lightGray2,
    borderRadius: scale(20),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
    marginRight: scale(12),
    fontSize: fontScale(16),
    maxHeight: verticalScale(100),
    fontFamily: 'Manrope',
  },
  sendButton: {
    backgroundColor: Colors.primary.blue,
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.grayscale.lightGray1,
  },
});
