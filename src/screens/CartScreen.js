import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import Text from '../components/Text';
import { colors, radius, MAX_WIDTH, formatBRL } from '../theme';
import { FREE_SHIPPING_FROM } from '../data/products';
import { useCart } from '../context/CartContext';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import ProductImage from '../components/ProductImage';

export default function CartScreen({ navigate }) {
  const { width } = useWindowDimensions();
  const cart = useCart();
  const [code, setCode] = useState('');
  const [couponMsg, setCouponMsg] = useState(null); // { ok, message }
  const [order, setOrder] = useState(null); // pedido finalizado
  const isMobile = width < 860;

  const handleCoupon = () => {
    setCouponMsg(cart.applyCoupon(code));
    setCode('');
  };

  const handleCheckout = () => {
    const number = String(Math.floor(100000 + Math.random() * 900000));
    setOrder({ number, total: cart.total, count: cart.count });
    cart.clear();
    setCouponMsg(null);
  };

  // Tela de pedido concluído
  if (order) {
    return (
      <View style={styles.page}>
        <View style={styles.success}>
          <Text style={{ fontSize: 56 }}>🎉</Text>
          <Text style={styles.successTitle}>Pedido realizado!</Text>
          <Text style={styles.successText}>
            Pedido #{order.number} — {order.count} item(ns) — {formatBRL(order.total)}
          </Text>
          <Text style={styles.successText}>Enviaremos os detalhes para o seu e-mail.</Text>
          <Button
            title="Continuar comprando"
            onPress={() => {
              setOrder(null);
              navigate('catalogo');
            }}
            style={{ marginTop: 24 }}
          />
        </View>
      </View>
    );
  }

  // Carrinho vazio
  if (cart.lines.length === 0) {
    return (
      <View style={styles.page}>
        <View style={styles.success}>
          <Text style={{ fontSize: 56 }}>🛒</Text>
          <Text style={styles.successTitle}>Seu carrinho está vazio</Text>
          <Text style={styles.successText}>Que tal adicionar alguns produtos?</Text>
          <Button title="Ver produtos" onPress={() => navigate('catalogo')} style={{ marginTop: 24 }} />
        </View>
      </View>
    );
  }

  const missing = Math.max(0, FREE_SHIPPING_FROM - (cart.subtotal - cart.discount));
  const progress = Math.min(1, (cart.subtotal - cart.discount) / FREE_SHIPPING_FROM);

  return (
    <View style={styles.page}>
      <View style={{ marginTop: 28 }}>
        <SectionTitle eyebrow="Carrinho" title="Seu carrinho" subtitle={`${cart.count} item(ns)`} />
      </View>

      <View style={[styles.layout, isMobile && { flexDirection: 'column' }]}>
        {/* Lista de itens */}
        <View style={{ flex: 1 }}>
          {cart.lines.map(({ product, qty }) => (
            <View key={product.id} style={styles.line}>
              <ProductImage product={product} height={64} emojiSize={30} style={styles.lineThumb} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.lineName} numberOfLines={2}>
                  {product.name}
                </Text>
                <Text style={styles.linePrice}>{formatBRL(product.price)}</Text>
                <View style={styles.stepper}>
                  <Pressable style={styles.stepBtn} onPress={() => cart.setQty(product.id, qty - 1)}>
                    <Text style={styles.stepText}>−</Text>
                  </Pressable>
                  <Text style={styles.qty}>{qty}</Text>
                  <Pressable style={styles.stepBtn} onPress={() => cart.setQty(product.id, qty + 1)}>
                    <Text style={styles.stepText}>+</Text>
                  </Pressable>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.lineTotal}>{formatBRL(product.price * qty)}</Text>
                <Pressable onPress={() => cart.removeItem(product.id)} style={{ marginTop: 10 }}>
                  <Text style={styles.remove}>Remover</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        {/* Resumo */}
        <View style={[styles.summary, isMobile && { width: '100%', marginLeft: 0, marginTop: 16 }]}>
          <Text style={styles.summaryTitle}>Resumo do pedido</Text>

          {/* Barra de frete grátis */}
          <Text style={styles.shipMsg}>
            {missing > 0
              ? `Faltam ${formatBRL(missing)} para frete grátis`
              : '🚚 Você ganhou frete grátis!'}
          </Text>
          <View style={styles.barBg}>
            <View style={[styles.barFill, { width: `${progress * 100}%` }]} />
          </View>

          {/* Cupom */}
          <View style={styles.couponRow}>
            <TextInput
              value={code}
              onChangeText={setCode}
              placeholder="Cupom (ex.: FORCA10)"
              placeholderTextColor={colors.muted}
              autoCapitalize="characters"
              style={styles.couponInput}
              onSubmitEditing={handleCoupon}
            />
            <Button title="Aplicar" small onPress={handleCoupon} style={{ marginLeft: 8 }} />
          </View>
          {couponMsg && (
            <Text style={{ color: couponMsg.ok ? colors.success : colors.danger, marginTop: 6 }}>
              {couponMsg.message}
            </Text>
          )}
          {cart.coupon && (
            <Pressable onPress={cart.removeCoupon}>
              <Text style={styles.remove}>Remover cupom {cart.coupon.code}</Text>
            </Pressable>
          )}

          <View style={styles.divider} />
          <Row label="Subtotal" value={formatBRL(cart.subtotal)} />
          {cart.discount > 0 && (
            <Row label="Desconto" value={`− ${formatBRL(cart.discount)}`} color={colors.success} />
          )}
          <Row label="Frete" value={cart.shipping === 0 ? 'Grátis' : formatBRL(cart.shipping)} />
          <View style={styles.divider} />
          <Row label="Total" value={formatBRL(cart.total)} big />

          <Button title="Finalizar compra" onPress={handleCheckout} style={{ marginTop: 18 }} />
          <Button
            title="Esvaziar carrinho"
            variant="ghost"
            onPress={cart.clear}
            style={{ marginTop: 6 }}
          />
        </View>
      </View>
    </View>
  );
}

function Row({ label, value, big, color }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, big && { color: colors.text, fontWeight: '800', fontSize: 18 }]}>
        {label}
      </Text>
      <Text
        style={[
          styles.rowValue,
          big && { color: colors.accent, fontSize: 22, fontWeight: '900' },
          color && { color },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center', paddingHorizontal: 20 },
  layout: { flexDirection: 'row', alignItems: 'flex-start' },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
  },
  lineThumb: { width: 64, height: 64, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  lineName: { color: colors.text, fontWeight: '700', fontSize: 15 },
  linePrice: { color: colors.muted, marginTop: 2 },
  lineTotal: { color: colors.accent, fontWeight: '800', fontSize: 16 },
  remove: { color: colors.danger, fontSize: 13, fontWeight: '600', marginTop: 8 },
  stepper: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  stepBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: { color: colors.text, fontSize: 18, fontWeight: '700' },
  qty: { color: colors.text, fontWeight: '700', width: 36, textAlign: 'center' },
  summary: {
    width: 360,
    marginLeft: 20,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },
  summaryTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: 12 },
  shipMsg: { color: colors.muted, fontSize: 13, marginBottom: 6 },
  barBg: { height: 8, borderRadius: 4, backgroundColor: colors.surface, overflow: 'hidden', marginBottom: 16 },
  barFill: { height: 8, backgroundColor: colors.primary },
  couponRow: { flexDirection: 'row', alignItems: 'center' },
  couponInput: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    color: colors.text,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  rowLabel: { color: colors.muted, fontSize: 15 },
  rowValue: { color: colors.text, fontSize: 15, fontWeight: '600' },
  success: { alignItems: 'center', paddingVertical: 80 },
  successTitle: { color: colors.text, fontSize: 28, fontWeight: '800', marginTop: 12 },
  successText: { color: colors.muted, marginTop: 8, textAlign: 'center' },
});
