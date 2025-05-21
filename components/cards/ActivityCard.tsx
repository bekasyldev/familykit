import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Dimensions } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { scale, verticalScale, fontScale, listenOrientationChange } from '@/constants/Layout';

// These will be recalculated when orientation changes
const calculateDimensions = () => {
  const { width } = Dimensions.get('window');
  const GRID_CARD_WIDTH = (width - scale(56)) / 1.9; // Two cards with margins
  const GRID_CARD_HEIGHT = GRID_CARD_WIDTH;
  const LIST_CARD_WIDTH = width - scale(24);
  const LIST_CARD_HEIGHT = (LIST_CARD_WIDTH * 607) / 367;
  const LIST_IMAGE_HEIGHT = (LIST_CARD_WIDTH * 353) / 367;
  
  return {
    GRID_CARD_WIDTH,
    GRID_CARD_HEIGHT,
    LIST_CARD_WIDTH,
    LIST_CARD_HEIGHT,
    LIST_IMAGE_HEIGHT
  };
};

interface ActivityCardProps {
  title: string;
  duration: number;
  imageUrl?: string;
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
  const [dimensions, setDimensions] = useState(calculateDimensions());
  const image = imageUrl || require('@/assets/images/image.png');
  
  // Handle orientation changes
  useEffect(() => {
    const subscription = listenOrientationChange(() => {
      setDimensions(calculateDimensions());
    });
    
    return () => subscription.remove();
  }, []);
  
  // Navigate to product page with activity data
  const handlePress = () => {
    router.push({
      pathname: '/product',
      params: {
        title,
        description,
        duration: duration.toString(),
        imageUrl
      }
    });
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.card,
        isGridView ? 
          [styles.gridCard, { width: dimensions.GRID_CARD_WIDTH, height: dimensions.GRID_CARD_HEIGHT * 1.25 }] : 
          [styles.listCard, { width: dimensions.LIST_CARD_WIDTH, height: dimensions.LIST_CARD_HEIGHT }]
      ]} 
      onPress={handlePress}
    >
      <View style={[
        styles.imageContainer,
        isGridView ? 
          [styles.gridImageContainer, { height: dimensions.GRID_CARD_WIDTH }] : 
          [styles.listImageContainer, { height: dimensions.LIST_IMAGE_HEIGHT * 1.25 }]
      ]}>
        <Image 
          source={image} 
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
            size={isGridView ? scale(12) : scale(14)} 
            color={Colors.primary.darkBlue} 
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
              size={scale(18)} 
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
                  size={scale(32)} 
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
    borderRadius: scale(15),
    overflow: 'hidden',
    marginBottom: verticalScale(16),
  },
  gridCard: {
    // Width and height applied dynamically
  },
  listCard: {
    // Width and height applied dynamically
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  gridImageContainer: {
    // Height applied dynamically
  },
  listImageContainer: {
    // Height applied dynamically
  },
  image: {
    width: '90%',
    height: '100%',
    borderRadius: scale(15),
    position: 'absolute',
    top: 0,
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
    bottom: verticalScale(8),
    left: scale(16),
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(8),
    borderRadius: scale(8),
  },
  listTimeContainer: {
    top: verticalScale(24),
    right: scale(28),
    paddingVertical: verticalScale(7),
    paddingHorizontal: scale(12),
    gap: scale(6),
    borderRadius: scale(11),
  },
  timeText: {
    fontFamily: 'Manrope',
    fontWeight: '500',
    color: Colors.primary.darkBlue,
    opacity: 0.8,
  },
  gridTimeText: {
    fontSize: fontScale(12),
    marginRight: scale(4),
  },
  listTimeText: {
    fontSize: fontScale(18),
  },
  timeIcon: {
    opacity: 0.7,
  },
  likeButton: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: scale(7),
    padding: scale(6),
  },
  gridLikeButton: {
    top: verticalScale(8),
    right: scale(24),
  },
  listLikeButton: {
    padding: 0,
  },
  contentContainer: {
    flex: 1, // Take remaining space
  },
  gridContentContainer: {
    padding: scale(8),
    justifyContent: 'center',
  },
  listContentContainer: {
    padding: scale(16),
  },
  listTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(11),
  },
  title: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    marginLeft: scale(10),
    color: Colors.primary.darkBlue,
  },
  gridTitle: {
    fontSize: fontScale(14),
    lineHeight: fontScale(19),
  },
  listTitle: {
    flex: 1,
    fontSize: fontScale(22),
    marginRight: scale(16),
  },
  description: {
    fontSize: fontScale(16),
    fontFamily: 'Inter',
    marginLeft: scale(10),
    lineHeight: fontScale(19),
    color: Colors.grayscale.black,
    opacity: 0.4,
  },
});