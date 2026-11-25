import React, { useEffect, useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { colors, MAX_WIDTH } from '../theme';
import Text from './Text';
import Button from './Button';

// Fim da Black Week: sexta, 27/11/2026, às 23h59 (horário de Brasília)
const DEADLINE = new Date('2026-11-27T23:59:00-03:00').getTime();

function useCountdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, DEADLINE - now);
  return {
    over: diff === 0,
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

const pad = (n) => String(n).padStart(2, '0');

function Box({ value, label }) {
  return (
    <View style={styles.box}>
      <Text display style={styles.boxValue}>{pad(value)}</Text>
      <Text mono style={styles.boxLabel}>{label}</Text>
    </View>
  );
}

export default function DealBar({ onPress }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 760;
  const t = useCountdown();

  return (
    <View style={styles.bar}>
      <View style={[styles.inner, isMobile && { flexDirection: 'column', alignItems: 'flex-start' }]}>
        <View style={{ flex: 1 }}>
          <Text mono style={styles.eyebrow}>Black Week · Última semana</Text>
          <Text display style={[styles.title, isMobile && { fontSize: 18 }]}>
            {t.over ? 'A Black Week terminou — novidades em breve' : 'Os preços da Black acabam sexta, 27/11, às 23h59'}
          </Text>
        </View>
        <View style={[styles.right, isMobile && { marginTop: 12 }]}>
          {!t.over && (
            <View style={styles.boxes}>
              <Box value={t.d} label="dias" />
              <Box value={t.h} label="h" />
              <Box value={t.m} label="min" />
              <Box value={t.s} label="s" />
            </View>
          )}
          <Button title="Ver ofertas" small onPress={onPress} style={{ marginLeft: 14 }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#000',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  inner: {
    width: '100%',
    maxWidth: MAX_WIDTH,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  eyebrow: { color: colors.primary, fontSize: 11, letterSpacing: 2 },
  title: { color: '#fff', fontSize: 22, marginTop: 2 },
  right: { flexDirection: 'row', alignItems: 'center' },
  boxes: { flexDirection: 'row' },
  box: {
    backgroundColor: '#fff',
    width: 44,
    paddingVertical: 4,
    marginLeft: 4,
    alignItems: 'center',
  },
  boxValue: { color: '#000', fontSize: 20 },
  boxLabel: { color: '#555', fontSize: 9 },
});
