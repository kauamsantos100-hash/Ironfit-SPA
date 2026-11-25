import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { fonts } from '../theme';

// Text com a fonte do tema.
//   <Text display> → títulos condensados em caixa alta
//   <Text mono>    → rótulos "tech" em caixa alta
export default function Text({ display, mono, style, ...props }) {
  return (
    <RNText
      {...props}
      style={[styles.base, display && styles.display, mono && styles.mono, style]}
    />
  );
}

const styles = StyleSheet.create({
  base: { fontFamily: fonts.body },
  display: {
    fontFamily: fonts.display,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '400',
  },
  mono: {
    fontFamily: fonts.mono,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
