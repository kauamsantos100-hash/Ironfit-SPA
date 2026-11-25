import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { colors, radius } from '../theme';
import Text from './Text';

export default function Chip({ label, active, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ hovered }) => [styles.chip, hovered && !active && { borderColor: colors.primary }, active && styles.active]}
    >
      <Text mono style={[styles.text, active && styles.textActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginRight: 8,
    marginBottom: 8,
  },
  active: { backgroundColor: colors.primary, borderColor: colors.primary },
  text: { color: colors.muted, fontSize: 13 },
  textActive: { color: '#fff' },
});
