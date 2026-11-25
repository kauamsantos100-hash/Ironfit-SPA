import React, { useEffect, useRef } from 'react';
import {
  View,
  Pressable,
  ImageBackground,
  Animated,
  Easing,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { colors, MAX_WIDTH, formatBRL, webGlow, webHeroBg } from '../theme';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';
import Text from '../components/Text';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import ProductCard from '../components/ProductCard';
import ProductImage from '../components/ProductImage';
import Ticker from '../components/Ticker';
import DealBar from '../components/DealBar';

const TAPE_ITEMS = [
  'IRONFIT · BLACK WEEK',
  'CUPOM FORCA10 = 10% OFF',
  'FRETE GRÁTIS ACIMA DE R$ 199',
  'ATÉ 6X SEM JUROS',
  'ATÉ DURAR O ESTOQUE',
];

const BENEFITS = [
  { code: '01', title: 'Frete grátis', text: 'Acima de R$ 199,00' },
  { code: '02', title: 'Até 6x sem juros', text: 'No cartão de crédito' },
  { code: '03', title: 'Compra segura', text: 'Dados protegidos' },
  { code: '04', title: 'Qualidade', text: 'Marcas selecionadas' },
];

// Foto de capa de cada categoria (id de um produto da categoria)
const CATEGORY_COVERS = { Suplementos: 1, Equipamentos: 4, Vestuário: 9, Acessórios: 12 };
const nativeDriver = Platform.OS !== 'web';

// Cantos estilo "mira" ao redor do card de destaque
function Corners() {
  return (
    <>
      <View style={[styles.corner, { top: 8, left: 8, borderTopWidth: 2, borderLeftWidth: 2 }]} />
      <View style={[styles.corner, { top: 8, right: 8, borderTopWidth: 2, borderRightWidth: 2 }]} />
      <View style={[styles.corner, { bottom: 8, left: 8, borderBottomWidth: 2, borderLeftWidth: 2 }]} />
      <View style={[styles.corner, { bottom: 8, right: 8, borderBottomWidth: 2, borderRightWidth: 2 }]} />
    </>
  );
}

// Card "HUD" com linha de scanner animada
function HeroHud({ product, onPress, width }) {
  const scan = useRef(new Animated.Value(0)).current;
  const H = 320;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scan, { toValue: 1, duration: 2600, easing: Easing.linear, useNativeDriver: nativeDriver }),
        Animated.timing(scan, { toValue: 0, duration: 0, useNativeDriver: nativeDriver }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [scan]);

  const translateY = scan.interpolate({ inputRange: [0, 1], outputRange: [0, H - 2] });

  return (
    <Pressable onPress={onPress} style={[styles.hud, { width }, webGlow]}>
      <View style={{ height: H }}>
        <ProductImage product={product} height={H} style={{ borderRadius: 0 }} />
        <View style={styles.hudTint} pointerEvents="none" />
        <Animated.View style={[styles.scanLine, { transform: [{ translateY }] }]} pointerEvents="none" />
        <Corners />
        <View style={styles.hudLabel}>
          <Text mono style={styles.hudLabelText}>● scan ativo</Text>
        </View>
      </View>
      <View style={styles.hudInfo}>
        <Text mono style={styles.hudCode}>Produto em destaque // 001</Text>
        <Text display style={styles.hudName} numberOfLines={1}>{product.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text display style={styles.hudPrice}>{formatBRL(product.price)}</Text>
          {product.oldPrice ? (
            <Text style={styles.hudOld}>{formatBRL(product.oldPrice)}</Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

export default function HomeScreen({ navigate }) {
  const { width } = useWindowDimensions();
  const { addItem } = useCart();
  const isMobile = width < 860;
  const contentWidth = Math.min(width, MAX_WIDTH) - 40;
  const gap = 16;
  const cols = width < 560 ? 1 : width < 900 ? 2 : 4;
  const cardWidth = (contentWidth - gap * (cols - 1)) / cols;
  const catCols = isMobile ? 2 : 4;
  const catWidth = (contentWidth - gap * (catCols - 1)) / catCols;
  const bestSellers = [...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const heroProduct = PRODUCTS[0];
  const hudWidth = isMobile ? Math.min(contentWidth, 420) : 380;

  return (
    <View>
      {/* HERO */}
      <View style={[styles.hero, webHeroBg]}>
        {/* tarjas diagonais */}
        <View style={[styles.tapeWrap, styles.tapeRed]} pointerEvents="none">
          <Ticker items={TAPE_ITEMS} bg={colors.primary} height={30} fontSize={13} speed={70} />
        </View>
        <View style={[styles.tapeWrap, styles.tapeDark]} pointerEvents="none">
          <Ticker items={TAPE_ITEMS} bg="#14141a" color="#3b3b46" height={26} fontSize={12} speed={45} />
        </View>

        <View style={[styles.heroInner, isMobile && { flexDirection: 'column', alignItems: 'flex-start' }]}>
          <View style={{ flex: 1 }}>
            <Text mono style={styles.heroEyebrow}>● Black Week · Coleção 2026</Text>
            <Text display style={[styles.heroTitle, isMobile && { fontSize: 58, lineHeight: 62 }]}>
              Treino{'\n'}nível <Text display style={{ color: colors.primary }}>superior</Text>
            </Text>
            <Text display style={[styles.heroFrom, isMobile && { fontSize: 22 }]}>
              Produtos a partir de <Text display style={{ color: colors.primary }}>R$ 44,90</Text>
            </Text>
            <Text style={styles.heroText}>
              Suplementos, equipamentos e roupas de treino com os menores preços do ano.
            </Text>
            <View style={styles.heroActions}>
              <Button title="Ver ofertas →" onPress={() => navigate('catalogo')} />
              <Button
                title="Fale com a gente"
                variant="outline"
                onPress={() => navigate('contato')}
                style={{ marginLeft: 12 }}
              />
            </View>
          </View>

          <View style={isMobile ? { marginTop: 32 } : { marginLeft: 40 }}>
            <HeroHud
              product={heroProduct}
              width={hudWidth}
              onPress={() => navigate('catalogo', { productId: heroProduct.id })}
            />
          </View>
        </View>
      </View>

      <DealBar onPress={() => navigate('catalogo')} />

      <View style={styles.page}>
        {/* MAIS VENDIDOS */}
        <View style={styles.section}>
          <SectionTitle
            eyebrow="Destaques"
            title="Mais vendidos"
            action={{ label: 'Ver todos →', onPress: () => navigate('catalogo') }}
          />
          <View style={[styles.row, { gap }]}>
            {bestSellers.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                width={cardWidth}
                onPress={() => navigate('catalogo', { productId: p.id })}
                onAdd={addItem}
              />
            ))}
          </View>
        </View>

        {/* CATEGORIAS */}
        <View style={styles.section}>
          <SectionTitle eyebrow="Categorias" title="Explore por categoria" />
          <View style={[styles.row, { gap }]}>
            {CATEGORIES.filter((c) => c !== 'Todos').map((cat, i) => {
              const cover = PRODUCTS.find((p) => p.id === CATEGORY_COVERS[cat]);
              return (
                <Pressable
                  key={cat}
                  onPress={() => navigate('catalogo', { category: cat })}
                  style={({ hovered }) => [
                    styles.catCard,
                    { width: catWidth },
                    hovered && { borderColor: colors.primary },
                  ]}
                >
                  <ImageBackground
                    source={{ uri: cover.image }}
                    style={styles.catImage}
                    imageStyle={{ resizeMode: 'cover' }}
                  >
                    <View style={styles.catOverlay} pointerEvents="none" />
                    <Text mono style={styles.catIndex}>{`0${i + 1}`}</Text>
                    <View>
                      <Text display style={styles.catName}>{cat}</Text>
                      <Text mono style={styles.catGo}>Acessar →</Text>
                    </View>
                  </ImageBackground>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* BENEFÍCIOS */}
        <View style={[styles.section, styles.benefits]}>
          {BENEFITS.map((b) => (
            <View key={b.code} style={[styles.benefit, { width: isMobile ? '100%' : '25%' }]}>
              <Text mono style={styles.benefitCode}>{b.code}</Text>
              <View style={{ flex: 1 }}>
                <Text display style={styles.benefitTitle}>{b.title}</Text>
                <Text style={styles.benefitText}>{b.text}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center', paddingHorizontal: 20 },
  hero: {
    backgroundColor: '#000',
    overflow: 'hidden',
    paddingTop: 90,
    paddingBottom: 90,
    paddingHorizontal: 20,
  },
  tapeWrap: { position: 'absolute', width: '140%', left: '-20%' },
  tapeRed: { top: 28, transform: [{ rotate: '-5deg' }] },
  tapeDark: { bottom: 40, transform: [{ rotate: '3deg' }] },
  heroInner: {
    width: '100%',
    maxWidth: MAX_WIDTH,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroEyebrow: { color: colors.primary, fontSize: 12, letterSpacing: 3 },
  heroTitle: { color: '#fff', fontSize: 104, lineHeight: 104, marginTop: 10 },
  heroFrom: { color: '#fff', fontSize: 30, marginTop: 14 },
  heroText: { color: colors.muted, fontSize: 16, lineHeight: 24, marginTop: 14, maxWidth: 480 },
  heroActions: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 26 },

  hud: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: '#FF1E3C88',
    overflow: 'hidden',
  },
  hudTint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,30,60,0.10)' },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.primary,
    ...Platform.select({ web: { boxShadow: '0 0 14px 3px rgba(255,30,60,0.8)' }, default: {} }),
  },
  corner: { position: 'absolute', width: 18, height: 18, borderColor: '#fff' },
  hudLabel: {
    position: 'absolute',
    top: 14,
    left: 30,
    backgroundColor: '#000000aa',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  hudLabelText: { color: colors.primary, fontSize: 10 },
  hudInfo: { padding: 14 },
  hudCode: { color: colors.muted, fontSize: 10 },
  hudName: { color: '#fff', fontSize: 22, marginTop: 4 },
  hudPrice: { color: '#fff', fontSize: 30, marginTop: 4 },
  hudOld: { color: colors.muted, textDecorationLine: 'line-through', marginLeft: 10 },

  section: { marginTop: 56 },
  row: { flexDirection: 'row', flexWrap: 'wrap' },

  catCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  catImage: {
    height: 210,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: colors.card,
  },
  catOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(5,5,7,0.55)' },
  catIndex: { color: colors.primary, fontSize: 12 },
  catName: { color: '#fff', fontSize: 28 },
  catGo: { color: '#fff', fontSize: 11, marginTop: 6 },

  benefits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: 20,
  },
  benefit: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingRight: 12 },
  benefitCode: { color: colors.primary, fontSize: 22, marginRight: 12 },
  benefitTitle: { color: '#fff', fontSize: 17 },
  benefitText: { color: colors.muted, fontSize: 13, marginTop: 2 },
});
