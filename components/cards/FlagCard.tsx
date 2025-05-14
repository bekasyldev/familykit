import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Dimensions, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { scale, verticalScale, fontScale, listenOrientationChange } from '@/constants/Layout';

const calculateDimensions = () => {
  const { width } = Dimensions.get('window');
  const GRID_CARD_WIDTH = (width - scale(56)) / 2 - scale(20);
  const GRID_CARD_HEIGHT = GRID_CARD_WIDTH + verticalScale(80);
  const LIST_CARD_WIDTH = width;
  const LIST_CARD_HEIGHT = (LIST_CARD_WIDTH * 700) / 367;
  const LIST_IMAGE_HEIGHT = (LIST_CARD_WIDTH * 420) / 367;
  
  return {
    GRID_CARD_WIDTH,
    GRID_CARD_HEIGHT,
    LIST_CARD_WIDTH,
    LIST_CARD_HEIGHT,
    LIST_IMAGE_HEIGHT
  };
};

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
  const [dimensions, setDimensions] = useState(calculateDimensions());
  
  useEffect(() => {
    const subscription = listenOrientationChange(() => {
      setDimensions(calculateDimensions());
    });
    
    return () => subscription.remove();
  }, []);
  
  return (
    <TouchableOpacity 
      style={[
        styles.card,
        { width: dimensions.GRID_CARD_WIDTH * 1.1, height: dimensions.GRID_CARD_HEIGHT }
      ]} 
      onPress={onPress}
    >
      <View style={[
        styles.imageContainer,
        { height: dimensions.GRID_CARD_WIDTH * 1.25 }
      ]}>
        <Image 
          source={require('@/assets/images/flag.png')} 
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{duration} мин</Text>
          <Image 
            source={require('@/assets/images/clock-icon.png')} 
            style={styles.timeIcon}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.playButtonContainer}>
          <Image 
            source={require('@/assets/images/icon-park-solid_play.png')} 
            style={styles.playButton}
            resizeMode="contain"
          />
        </View>
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
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: scale(15),
  },
  timeContainer: {
    position: 'absolute',
    top: verticalScale(10),
    right: scale(10),
    backgroundColor: 'rgba(247, 247, 247, 0.8)',
    backdropFilter: 'blur(6px)',
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(10),
    borderRadius: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(4),
  },
  timeText: {
    fontFamily: 'Manrope',
    fontSize: fontScale(12),
    fontWeight: '500',
    color: Colors.accent.orange,
    opacity: 0.8,
  },
  playButtonContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -scale(25) }, 
      { translateY: -scale(25) }
    ],
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: scale(30),
    height: scale(30),
  },
  gridTimeContainer: {
    bottom: verticalScale(8),
    left: scale(8),
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(8),
    borderRadius: scale(8),
  },
  listTimeContainer: {
    top: verticalScale(24),
    right: scale(16),
    paddingVertical: verticalScale(7),
    paddingHorizontal: scale(12),
    gap: scale(6),
    borderRadius: scale(11),
  },
  gridTimeText: {
    fontSize: fontScale(12),
    marginRight: scale(4),
  },
  listTimeText: {
    fontSize: fontScale(18),
  },
  timeIcon: {
    width: scale(12),
    height: scale(12),
    opacity: 0.7,
  },
  likeButton: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: scale(16),
    padding: scale(6),
  },
  gridLikeButton: {
    top: verticalScale(8),
    right: scale(8),
  },
  listLikeButton: {
    padding: 0,
  },
  contentContainer: {
    flex: 1,
  },
  gridContentContainer: {
    padding: scale(12),
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
    color: Colors.primary.blue,
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
    lineHeight: fontScale(19),
    color: Colors.grayscale.black,
    opacity: 0.4,
  },
});