import React, { useState } from 'react';
import { View, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { colors, radius, MAX_WIDTH } from '../theme';
import { useCart } from '../context/CartContext';
import Text from './Text';

export const ROUTES = [
  { key: 'home', label: 'Início' },
  { key: 'catalogo', label: 'Produtos' },
  { key: 'contato', label: 'Contato' },
];

export default function Header({ route, navigate }) {
  const { width } = useWindowDimensions();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const isMobile = width < 760;

  const go = (key) => {
    setOpen(false);
    navigate(key);
  };

  return (
    <View style={styles.bar}>
      <View style={styles.inner}>
        <Pressable onPress={() => go('home')} style={styles.logoWrap}>
          <Text display style={styles.logo}>
            IRON<Text display style={{ color: colors.primary }}>FIT</Text>
          </Text>
          <Text mono style={styles.logoTag}>// gym store</Text>
        </Pressable>

        {!isMobile && (
          <View style={styles.nav}>
            {ROUTES.map((r) => (
              <Pressable key={r.key} onPress={() => go(r.key)} style={styles.navItem}>
                <Text mono style={[styles.navText, route === r.key && styles.navTextActive]}>
                  {r.label}
                </Text>
                <View style={[styles.underline, route === r.key && { backgroundColor: colors.primary }]} />
              </Pressable>
            ))}
          </View>
        )}

        <View style={styles.right}>
          <Pressable
            onPress={() => go('carrinho')}
            style={[styles.cartBtn, route === 'carrinho' && { borderColor: colors.primary }]}
            accessibilityLabel="Abrir carrinho"
          >
            <Text style={{ fontSize: 18 }}>🛒</Text>
            {count > 0 && (
              <View style={styles.badge}>
                <Text mono style={styles.badgeText}>{count}</Text>
              </View>
            )}
          </Pressable>
          {isMobile && (
            <Pressable onPress={() => setOpen((o) => !o)} style={styles.burger}>
              <Text style={styles.burgerText}>{open ? '✕' : '☰'}</Text>
            </Pressable>
          )}
        </View>
      </View>

      {isMobile && open && (
        <View style={styles.menu}>
          {ROUTES.map((r) => (
            <Pressable key={r.key} onPress={() => go(r.key)} style={styles.menuItem}>
              <Text mono style={[styles.menuText, route === r.key && { color: colors.primary }]}>
                {route === r.key ? '> ' : ''}
                {r.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.bg,
    borderBottomWidth: 1,
    borderBottomColor: '#FF1E3C55',
    zIndex: 10,
  },
  inner: {
    width: '100%',
    maxWidth: MAX_WIDTH,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 66,
  },
  logoWrap: { flexDirection: 'row', alignItems: 'flex-end' },
  logo: { color: '#fff', fontSize: 30, letterSpacing: 2 },
  logoTag: { color: colors.muted, fontSize: 10, marginLeft: 8, marginBottom: 5 },
  nav: { flexDirection: 'row', alignItems: 'center' },
  navItem: { paddingHorizontal: 18, paddingVertical: 10, alignItems: 'center' },
  navText: { color: colors.muted, fontSize: 13, letterSpacing: 2 },
  navTextActive: { color: '#fff' },
  underline: { height: 2, width: '100%', marginTop: 6, backgroundColor: 'transparent' },
  right: { flexDirection: 'row', alignItems: 'center' },
  cartBtn: {
    width: 42,
    height: 42,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -7,
    right: -7,
    minWidth: 19,
    height: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: { color: '#fff', fontSize: 11 },
  burger: { marginLeft: 10, width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
  burgerText: { color: '#fff', fontSize: 24 },
  menu: { borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: 6 },
  menuItem: { paddingVertical: 14, paddingHorizontal: 24 },
  menuText: { color: '#fff', fontSize: 15, letterSpacing: 2 },
});
