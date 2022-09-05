import {StyleSheet} from 'react-native';

export const Color = {
  gray: '#e0e0e0',

  primary: '#0891b2',
  primaryDark: '#155e75',
  light: '#d6d3d1',
  medium: '#a8a29e',

  error: '#dc2626',
};

const baseText = {
  fontSize: 16,
  fontWeight: '400',
  fontFamily: 'Avenir',
};

const globalStyles = StyleSheet.create({
  baseText,

  boldText: {
    ...baseText,
    fontWeight: '800',
  },
  underlinedText: {
    ...baseText,
    textDecorationLine: 'underline',
  },

  imageContain: {resizeMode: 'contain', height: '100%', width: '100%'},
});

export default globalStyles;
