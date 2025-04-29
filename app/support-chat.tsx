import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';

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
            <Ionicons name="arrow-back" size={24} color={Colors.grayscale.white} />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Поддержка</ThemedText>
          <View style={{ width: 24 }} />
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
                size={24} 
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
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    backgroundColor: Colors.grayscale.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messagesContent: {
    paddingBottom: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
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
    fontSize: 16,
    color: Colors.grayscale.white,
    fontFamily: 'Manrope',
  },
  timestamp: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.grayscale.lightGray1,
    backgroundColor: Colors.grayscale.white,
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.grayscale.lightGray2,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    fontSize: 16,
    maxHeight: 100,
    fontFamily: 'Manrope',
  },
  sendButton: {
    backgroundColor: Colors.primary.blue,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.grayscale.lightGray1,
  },
});
