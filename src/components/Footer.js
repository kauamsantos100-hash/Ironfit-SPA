import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, MAX_WIDTH } from '../theme';
import Text from './Text';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.inner}>
        <Text display style={styles.logo}>
          IRON<Text display style={{ color: colors.primary }}>FIT</Text>
        </Text>
        <Text style={styles.text}>
          Suplementos, equipamentos e vestuário para quem leva o treino a sério.
        </Text>
        <Text mono style={styles.copy}>© 2026 IronFit — projeto acadêmico (SPA com React Native)</Text>
        <Text mono style={styles.copy}>Fotos dos produtos: Unsplash</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#FF1E3C55',
    backgroundColor: '#000',
    marginTop: 70,
  },
  inner: { width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center', padding: 28 },
  logo: { color: '#fff', fontSize: 28, letterSpacing: 2 },
  text: { color: colors.muted, marginTop: 8, lineHeight: 20 },
  copy: { color: '#5d5d6a', marginTop: 12, fontSize: 11 },
});
