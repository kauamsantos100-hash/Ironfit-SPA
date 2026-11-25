import React, { useState } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { radius } from '../theme';

// Foto do produto com fallback para o emoji (enquanto carrega ou se a imagem falhar).
// "children" é renderizado por cima da foto (ex.: etiqueta de categoria).
export default function ProductImage({ product, height = 160, emojiSize = 56, style, children }) {
  const [failed, setFailed] = useState(false);

  return (
    <View
      style={[
        styles.box,
        { height, backgroundColor: product.color + '33' },
        style,
      ]}
    >
      <Text style={{ fontSize: emojiSize }}>{product.emoji}</Text>
      {product.image && !failed ? (
        <Image
          source={{ uri: product.image }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          accessibilityLabel={product.name}
          onError={() => setFailed(true)}
        />
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: radius.sm,
  },
});
