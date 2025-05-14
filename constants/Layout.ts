import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const baseWidth = 390;
const baseHeight = 844;

const widthRatio = SCREEN_WIDTH / baseWidth;
const heightRatio = SCREEN_HEIGHT / baseHeight;

export const scale = (size: number) => Math.round(size * widthRatio);

export const verticalScale = (size: number) => Math.round(size * heightRatio);

export const fontScale = (size: number) => {
    const newSize = size * widthRatio;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
};

export const moderateScale = (size: number, factor = 0.5) => {
    return size + (scale(size) - size) * factor;
};

export const isSmallDevice = SCREEN_WIDTH < 375;
export const isLargeDevice = SCREEN_WIDTH >= 768;

export const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
};

export const isLandscape = () => {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
};

export const listenOrientationChange = (callback: () => void) => {
    return Dimensions.addEventListener('change', callback);
};

export default {
    window: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    isSmallDevice,
    isLargeDevice
};