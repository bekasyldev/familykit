import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Dimensions, Text } from 'react-native';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

// 🆕 Updated dimensions for taller cards
const GRID_CARD_WIDTH = (width - 56) / 2 - 20;
const GRID_CARD_HEIGHT = GRID_CARD_WIDTH + 80; // was +50
const LIST_CARD_WIDTH = width;
const LIST_CARD_HEIGHT = (LIST_CARD_WIDTH * 700) / 367; // was 607
const LIST_IMAGE_HEIGHT = (LIST_CARD_WIDTH * 420) / 367; // was 353

interface ActivityCardProps {
  duration: number;
  onPress: () => void;
  onLike?: () => void;
}

export function FlagCard({ 
  onPress,
  onLike,
  duration = 15,
}: ActivityCardProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.card,
        styles.gridCard
      ]} 
      onPress={onPress}
    >
      <View style={[
        styles.imageContainer,
        styles.gridImageContainer
      ]}>
        <Image 
          source={require('@/assets/images/flag.png')} 
          style={styles.image}
          resizeMode="cover"
        />
        
        {/* Time indicator */}
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{duration} мин</Text>
          <Image 
            source={require('@/assets/images/clock-icon.png')} 
            style={styles.timeIcon}
            resizeMode="contain"
          />
        </View>
        
        {/* Play button */}
        <View style={styles.playButtonContainer}>
          <Image 
            source={require('@/assets/images/icon-park-solid_play.png')} 
            style={styles.playButton}
            resizeMode="contain"
          />
        </View>
      </View>
      {/* Optional: Add title/description here if needed */}
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
    width: GRID_CARD_WIDTH * 1.1,
    height: GRID_CARD_HEIGHT, // 🆕 taller
  },
  listCard: {
    width: LIST_CARD_WIDTH * 1.25,
    height: LIST_CARD_HEIGHT, // 🆕 taller
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  gridImageContainer: {
    height: GRID_CARD_WIDTH * 1.25, // 🆕 was 0.75
  },
  listImageContainer: {
    height: LIST_IMAGE_HEIGHT, // 🆕 taller image
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  timeContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(247, 247, 247, 0.8)',
    backdropFilter: 'blur(6px)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  timeText: {
    fontFamily: 'Manrope',
    fontSize: 12,
    fontWeight: '500',
    color: Colors.accent.orange,
    opacity: 0.8,
  },
  playButtonContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 30,
    height: 30,
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
  gridTimeText: {
    fontSize: 12,
    marginRight: 4,
  },
  listTimeText: {
    fontSize: 18,
  },
  timeIcon: {
    width: 12,
    height: 12,
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
    flex: 1,
  },
  gridContentContainer: {
    padding: 12, // 🆕 was 8
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