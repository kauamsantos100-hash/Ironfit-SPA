import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Easing, Platform, StyleSheet } from 'react-native';
import Text from './Text';

const COPIES = 8;

// Faixa de texto em movimento contínuo (marquee)
export default function Ticker({ items, speed = 55, height = 28, bg, color = '#fff', fontSize = 12, style }) {
  const [segmentWidth, setSegmentWidth] = useState(0);
  const x = useRef(new Animated.Value(0)).current;
  const segment = `${items.join('   ●   ')}   ●   `;

  useEffect(() => {
    if (!segmentWidth) return undefined;
    x.setValue(0);
    const loop = Animated.loop(
      Animated.timing(x, {
        toValue: -segmentWidth,
        duration: (segmentWidth / speed) * 1000,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web',
      })
    );
    loop.start();
    return () => loop.stop();
  }, [segmentWidth, speed, x]);

  return (
    <View style={[styles.wrap, { height, backgroundColor: bg }, style]}>
      <Animated.View style={[styles.track, { transform: [{ translateX: x }] }]}>
        {Array.from({ length: COPIES }).map((_, i) => (
          <Text
            key={i}
            mono
            numberOfLines={1}
            onLayout={i === 0 ? (e) => setSegmentWidth(e.nativeEvent.layout.width) : undefined}
            style={[styles.text, { color, fontSize }]}
          >
            {segment}
          </Text>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { overflow: 'hidden', justifyContent: 'center' },
  track: { flexDirection: 'row', alignSelf: 'flex-start' },
  text: { flexShrink: 0, letterSpacing: 2, fontWeight: '700' },
});
