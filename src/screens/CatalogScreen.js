import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  TextInput,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { colors, radius, MAX_WIDTH, formatBRL } from '../theme';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';
import SectionTitle from '../components/SectionTitle';
import ProductCard from '../components/ProductCard';
import Chip from '../components/Chip';
import Button from '../components/Button';
import Text from '../components/Text';
import ProductImage from '../components/ProductImage';

const SORTS = [
  { key: 'rating', label: 'Mais avaliados' },
  { key: 'asc', label: 'Menor preço' },
  { key: 'desc', label: 'Maior preço' },
  { key: 'name', label: 'A–Z' },
];

export default function CatalogScreen({ params, navigate }) {
  const { width } = useWindowDimensions();
  const { addItem } = useCart();

  const [category, setCategory] = useState(params?.category || 'Todos');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('rating');
  const [selected, setSelected] = useState(null);

  // Reage a parâmetros vindos da navegação (ex.: clique em categoria na Home)
  useEffect(() => {
    if (params?.category) setCategory(params.category);
    if (params?.productId) {
      const p = PRODUCTS.find((x) => x.id === params.productId);
      if (p) setSelected(p);
    }
  }, [params]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter(
      (p) =>
        (category === 'Todos' || p.category === category) &&
        (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    );
    list = [...list];
    if (sort === 'asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [category, query, sort]);

  const contentWidth = Math.min(width, MAX_WIDTH) - 40;
  const cols = width < 560 ? 1 : width < 900 ? 2 : width < 1100 ? 3 : 4;
  const gap = 16;
  const cardWidth = (contentWidth - gap * (cols - 1)) / cols;

  return (
    <View style={styles.page}>
      <View style={{ marginTop: 28 }}>
        <SectionTitle
          eyebrow="Loja"
          title="Todos os produtos"
          subtitle={`${results.length} produto(s) encontrado(s)`}
        />
      </View>

      {/* Busca */}
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="🔍  Buscar produto..."
        placeholderTextColor={colors.muted}
        style={styles.search}
      />

      {/* Categorias */}
      <View style={styles.chips}>
        {CATEGORIES.map((c) => (
          <Chip key={c} label={c} active={category === c} onPress={() => setCategory(c)} />
        ))}
      </View>

      {/* Ordenação */}
      <View style={styles.chips}>
        <Text style={styles.sortLabel}>Ordenar:</Text>
        {SORTS.map((s) => (
          <Chip key={s.key} label={s.label} active={sort === s.key} onPress={() => setSort(s.key)} />
        ))}
      </View>

      {/* Grade */}
      {results.length === 0 ? (
        <View style={styles.empty}>
          <Text style={{ fontSize: 40 }}>😕</Text>
          <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
          <Button
            title="Limpar filtros"
            variant="outline"
            small
            onPress={() => {
              setQuery('');
              setCategory('Todos');
            }}
            style={{ marginTop: 12 }}
          />
        </View>
      ) : (
        <View style={[styles.grid, { gap }]}>
          {results.map((p) => (
            <ProductCard key={p.id} product={p} width={cardWidth} onPress={setSelected} onAdd={addItem} />
          ))}
        </View>
      )}

      {/* Detalhe do produto */}
      <Modal visible={!!selected} transparent animationType="fade" onRequestClose={() => setSelected(null)}>
        <Pressable style={styles.overlay} onPress={() => setSelected(null)}>
          <Pressable style={styles.modal} onPress={() => {}}>
            {selected && (
              <ScrollView>
                <ProductImage
                  product={selected}
                  height={240}
                  emojiSize={80}
                  style={{ borderRadius: radius.md, marginBottom: 16 }}
                />
                <Text style={styles.modalCat}>{selected.category.toUpperCase()}</Text>
                <Text style={styles.modalName}>{selected.name}</Text>
                <Text style={styles.modalRating}>⭐ {selected.rating.toFixed(1)} / 5</Text>
                <Text style={styles.modalDesc}>{selected.description}</Text>
                <Text style={styles.modalPrice}>{formatBRL(selected.price)}</Text>
                <Text style={styles.modalInstallment}>
                  ou 6x de {formatBRL(selected.price / 6)} sem juros
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  <Button
                    title="Adicionar ao carrinho"
                    onPress={() => addItem(selected)}
                    style={{ flex: 1 }}
                  />
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Button
                    title="Ir para o carrinho"
                    variant="outline"
                    onPress={() => {
                      setSelected(null);
                      navigate('carrinho');
                    }}
                    style={{ flex: 1, marginRight: 8 }}
                  />
                  <Button title="Fechar" variant="ghost" onPress={() => setSelected(null)} />
                </View>
              </ScrollView>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center', paddingHorizontal: 20 },
  search: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    color: colors.text,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    marginBottom: 16,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 4 },
  sortLabel: { color: colors.muted, marginRight: 10, marginBottom: 8, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 16 },
  empty: { alignItems: 'center', paddingVertical: 60 },
  emptyText: { color: colors.muted, marginTop: 10, fontSize: 16 },
  overlay: {
    flex: 1,
    backgroundColor: '#000000bb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    width: '100%',
    maxWidth: 480,
    maxHeight: '90%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 22,
  },
  modalThumb: {
    height: 170,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalCat: { color: colors.accent, fontWeight: '800', fontSize: 11, letterSpacing: 2 },
  modalName: { color: colors.text, fontSize: 24, fontWeight: '800', marginTop: 4 },
  modalRating: { color: colors.muted, marginTop: 6 },
  modalDesc: { color: colors.muted, lineHeight: 22, marginTop: 12 },
  modalPrice: { color: colors.accent, fontSize: 30, fontWeight: '900', marginTop: 16 },
  modalInstallment: { color: colors.muted, marginTop: 2 },
});
