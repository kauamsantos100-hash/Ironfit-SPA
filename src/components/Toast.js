import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, webGlow } from '../theme';
import { useCart } from '../context/CartContext';
import Text from './Text';

// Aviso flutuante exibido quando um item é adicionado ao carrinho
export default function Toast() {
  const { toast } = useCart();
  if (!toast) return null;
  return (
    <View style={styles.wrap} pointerEvents="none">
      <View style={styles.toast}>
        <Text mono style={styles.text}>+ {toast}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', bottom: 24, left: 0, right: 0, alignItems: 'center', zIndex: 100 },
  toast: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    maxWidth: '90%',
    ...webGlow,
  },
  text: { color: '#fff', fontSize: 12 },
});
