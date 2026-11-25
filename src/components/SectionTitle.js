import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme';
import Text from './Text';

// action: { label, onPress } → link "VER TODOS →" à direita
export default function SectionTitle({ eyebrow, title, subtitle, action }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          {eyebrow ? <Text mono style={styles.eyebrow}>{`// ${eyebrow}`}</Text> : null}
          <View style={styles.titleRow}>
            <View style={styles.bar} />
            <Text display style={styles.title}>{title}</Text>
          </View>
        </View>
        {action ? (
          <Pressable onPress={action.onPress}>
            <Text mono style={styles.action}>{action.label}</Text>
          </Pressable>
        ) : null}
      </View>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 22 },
  row: { flexDirection: 'row', alignItems: 'flex-end' },
  eyebrow: { color: colors.primary, fontSize: 12, letterSpacing: 2, marginBottom: 6 },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  bar: { width: 4, height: 30, backgroundColor: colors.primary, marginRight: 12 },
  title: { color: colors.text, fontSize: 34, letterSpacing: 1 },
  subtitle: { color: colors.muted, fontSize: 15, marginTop: 8, lineHeight: 22 },
  action: {
    color: colors.text,
    fontSize: 12,
    textDecorationLine: 'underline',
    paddingBottom: 6,
  },
});
