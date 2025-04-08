import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Dimensions } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
// Grid view dimensions
const GRID_CARD_WIDTH = (width - 56) / 2; // Two cards with margins
const GRID_CARD_HEIGHT = GRID_CARD_WIDTH;
// List view dimensions (from design)
const LIST_CARD_WIDTH = width - 24;
const LIST_CARD_HEIGHT = (LIST_CARD_WIDTH * 607) / 367;
const LIST_IMAGE_HEIGHT = (LIST_CARD_WIDTH * 353) / 367;

interface ActivityCardProps {
  title: string;
  duration: number;
  imageUrl: string;
  onPress: () => void;
  onLike?: () => void;
  description?: string;
  isGridView?: boolean;
}

export function ActivityCard({ 
  title, 
  duration, 
  imageUrl, 
  onPress,
  onLike,
  description,
  isGridView = true
}: ActivityCardProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.card,
        isGridView ? styles.gridCard : styles.listCard
      ]} 
      onPress={onPress}
    >
      <View style={[
        styles.imageContainer,
        isGridView ? styles.gridImageContainer : styles.listImageContainer
      ]}>
        <Image 
          source={require('@/assets/images/image.png')} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={[
          styles.timeContainer,
          isGridView ? styles.gridTimeContainer : styles.listTimeContainer
        ]}>
          <ThemedText style={[
            styles.timeText,
            isGridView ? styles.gridTimeText : styles.listTimeText
          ]}>{duration} мин</ThemedText>
          <Ionicons 
            name="time-outline" 
            size={isGridView ? 12 : 14} 
            color={Colors.primary.blue} 
            style={styles.timeIcon} 
          />
        </View>
        {isGridView && (
          <TouchableOpacity 
            style={[styles.likeButton, styles.gridLikeButton]} 
            onPress={onLike}
          >
            <Ionicons 
              name="heart-outline" 
              size={20} 
              color={Colors.accent.orange}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={[
        styles.contentContainer,
        isGridView ? styles.gridContentContainer : styles.listContentContainer
      ]}>
        {isGridView ? (
          <>
            <ThemedText 
              style={[styles.title, styles.gridTitle]} 
              numberOfLines={2}
            >
              {title}
            </ThemedText>
          </>
        ) : (
          <>
            <View style={styles.listTitleContainer}>
              <ThemedText 
                style={[styles.title, styles.listTitle]} 
                numberOfLines={1}
              >
                {title}
              </ThemedText>
              <TouchableOpacity 
                style={styles.listLikeButton} 
                onPress={onLike}
              >
                <Ionicons 
                  name="heart-outline" 
                  size={32} 
                  color={Colors.primary.blue}
                />
              </TouchableOpacity>
            </View>
            {description && (
              <ThemedText style={styles.description} numberOfLines={2}>
                {description}
              </ThemedText>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.grayscale.white,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 16,
  },
  gridCard: {
    width: GRID_CARD_WIDTH,
    height: GRID_CARD_HEIGHT,
  },
  listCard: {
    width: LIST_CARD_WIDTH,
    height: LIST_CARD_HEIGHT,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  gridImageContainer: {
    height: GRID_CARD_WIDTH * 0.75, // Reduce image height to make room for title
  },
  listImageContainer: {
    height: LIST_IMAGE_HEIGHT,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  timeContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(247, 247, 247, 0.8)',
    backdropFilter: 'blur(6px)',
  },
  gridTimeContainer: {
    bottom: 8,
    left: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  listTimeContainer: {
    top: 24,
    right: 16,
    paddingVertical: 7,
    paddingHorizontal: 12,
    gap: 6,
    borderRadius: 11,
  },
  timeText: {
    fontFamily: 'Manrope',
    fontWeight: '500',
    color: Colors.primary.blue,
    opacity: 0.8,
  },
  gridTimeText: {
    fontSize: 12,
    marginRight: 4,
  },
  listTimeText: {
    fontSize: 18,
  },
  timeIcon: {
    opacity: 0.7,
  },
  likeButton: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 6,
  },
  gridLikeButton: {
    top: 8,
    right: 8,
  },
  listLikeButton: {
    padding: 0,
  },
  contentContainer: {
    flex: 1, // Take remaining space
  },
  gridContentContainer: {
    padding: 8,
    justifyContent: 'center',
  },
  listContentContainer: {
    padding: 16,
  },
  listTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 11,
  },
  title: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    color: Colors.primary.blue,
  },
  gridTitle: {
    fontSize: 14,
    lineHeight: 19,
  },
  listTitle: {
    flex: 1,
    fontSize: 22,
    marginRight: 16,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter',
    lineHeight: 19,
    color: Colors.grayscale.black,
    opacity: 0.4,
  },
}); 