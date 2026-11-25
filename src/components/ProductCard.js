import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { colors, radius, formatBRL, webGlow } from '../theme';
import Text from './Text';
import Button from './Button';
import ProductImage from './ProductImage';

export default function ProductCard({ product, onPress, onAdd, width }) {
  const [hover, setHover] = useState(false);
  const imgHeight = width ? Math.round(width * 1.15) : 260;

  return (
    <Pressable
      onPress={() => onPress(product)}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      style={[styles.card, width ? { width } : null, hover && styles.hover]}
    >
      <ProductImage product={product} height={imgHeight} style={{ borderRadius: 0 }}>
        {product.discount ? (
          <View style={styles.badge}>
            <Text mono style={styles.badgeText}>{product.discount}% OFF</Text>
          </View>
        ) : null}
        <View style={styles.cat}>
          <Text mono style={styles.catText}>{product.category}</Text>
        </View>
      </ProductImage>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text mono style={styles.rating}>★ {product.rating.toFixed(1)}</Text>
        <View style={styles.priceRow}>
          <Text display style={styles.price}>{formatBRL(product.price)}</Text>
          {product.oldPrice ? <Text style={styles.old}>{formatBRL(product.oldPrice)}</Text> : null}
        </View>
        <Text mono style={styles.installment}>6x de {formatBRL(product.price / 6)}</Text>
      </View>

      <Button title="Adicionar +" small onPress={() => onAdd(product)} style={styles.btn} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  hover: { borderColor: colors.primary, ...webGlow },
  badge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#000',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  badgeText: { color: '#fff', fontSize: 11 },
  cat: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#000000bb',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderLeftWidth: 2,
    borderLeftColor: colors.primary,
  },
  catText: { color: '#fff', fontSize: 10 },
  info: { padding: 14, paddingBottom: 10 },
  name: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    minHeight: 38,
  },
  rating: { color: colors.muted, fontSize: 12, marginTop: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 8 },
  price: { color: colors.text, fontSize: 26 },
  old: { color: colors.muted, fontSize: 13, textDecorationLine: 'line-through', marginLeft: 8 },
  installment: { color: colors.primary, fontSize: 11, marginTop: 4 },
  btn: { marginHorizontal: 14, marginBottom: 14 },
});
