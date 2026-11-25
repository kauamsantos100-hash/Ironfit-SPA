import React from 'react';
import { Pressable, Platform, StyleSheet } from 'react-native';
import { colors, radius } from '../theme';
import Text from './Text';

// Canto cortado (só na web) para um visual mais futurista
const cut = Platform.select({
  web: { clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)' },
  default: {},
});

// variant: 'primary' | 'outline' | 'ghost'
export default function Button({ title, onPress, variant = 'primary', style, disabled, small }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed, hovered }) => [
        styles.base,
        small && styles.small,
        variant === 'primary' && styles.primary,
        variant === 'primary' && hovered && { backgroundColor: '#FF4560' },
        variant === 'outline' && styles.outline,
        variant === 'outline' && hovered && { borderColor: colors.primary },
        variant === 'ghost' && styles.ghost,
        variant !== 'ghost' && cut,
        pressed && !disabled && { opacity: 0.8 },
        disabled && { opacity: 0.4 },
        style,
      ]}
    >
      <Text mono style={[styles.text, small && { fontSize: 12 }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: { paddingVertical: 10, paddingHorizontal: 14 },
  primary: { backgroundColor: colors.primary },
  outline: { borderWidth: 1, borderColor: '#3a3a44', backgroundColor: 'transparent' },
  ghost: { backgroundColor: 'transparent' },
  text: { color: '#fff', fontSize: 14, fontWeight: '700', letterSpacing: 1.5 },
});
