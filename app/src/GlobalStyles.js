import {StyleSheet} from 'react-native';

export const Color = {
  gray: '#e0e0e0',

  primary: '#0891b2',
  primaryDark: '#155e75',

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
});

export default globalStyles;
