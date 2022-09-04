import {StyleSheet} from 'react-native';

export const Color = {
  black: 'rgba(0, 0, 0, 0.85);',

  gray: '#e0e0e0',

  primary: '#0891b2',
  primaryDark: '#155e75',

  error: '#dc2626',
};

const globalStyles = StyleSheet.create({
  baseText: {
    color: Color.black,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  boldText: {
    color: Color.black,
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Avenir',
  },
  underlinedText: {
    color: Color.black,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Avenir',
    textDecorationLine: 'underline',
  },
});

export default globalStyles;
