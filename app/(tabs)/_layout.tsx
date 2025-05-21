import { Tabs } from 'expo-router';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.accent.orange,
        tabBarInactiveTintColor: Colors.primary.blue,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.grayscale.white,
          borderTopWidth: 0,
          height: 82,
          paddingBottom: 20,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Главная',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Категории',
          tabBarIcon: ({ color }) => <MaterialIcons name="category" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Избранное',
          tabBarIcon: ({ color }) => <MaterialIcons name="favorite" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color }) => <MaterialIcons name="person" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="charades"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="flags"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="indoor"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="outdoor"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="word-games"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="questions"  
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="story"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="science"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
