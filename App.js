import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, ScrollView, StatusBar, Platform, StyleSheet } from 'react-native';
import { colors } from './src/theme';
import { loadWebFonts } from './src/fonts';
import { CartProvider } from './src/context/CartContext';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import Toast from './src/components/Toast';
import Ticker from './src/components/Ticker';
import HomeScreen from './src/screens/HomeScreen';
import CatalogScreen from './src/screens/CatalogScreen';
import CartScreen from './src/screens/CartScreen';
import ContactScreen from './src/screens/ContactScreen';

loadWebFonts();

const SCREENS = {
  home: HomeScreen,
  catalogo: CatalogScreen,
  carrinho: CartScreen,
  contato: ContactScreen,
};

const TOP_TICKER = [
  'BLACK WEEK IRONFIT',
  'FRETE GRÁTIS ACIMA DE R$ 199',
  'CUPOM FORCA10 = 10% OFF',
  'ATÉ 6X SEM JUROS',
  'ATÉ DURAR O ESTOQUE',
];

// Lê a rota inicial da URL (#/catalogo) quando roda no navegador
function routeFromHash() {
  if (Platform.OS !== 'web') return 'home';
  const key = window.location.hash.replace('#/', '').replace('#', '');
  return SCREENS[key] ? key : 'home';
}

function Shell() {
  const [route, setRoute] = useState(routeFromHash);
  const [params, setParams] = useState(null);
  const scrollRef = useRef(null);

  // Navegação SPA: troca o estado, atualiza a URL e volta ao topo — sem recarregar a página
  const navigate = useCallback((key, navParams = null) => {
    setRoute(key);
    setParams(navParams ? { ...navParams, ts: Date.now() } : null);
    if (Platform.OS === 'web') window.location.hash = `/${key}`;
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, []);

  // Botão voltar/avançar do navegador
  useEffect(() => {
    if (Platform.OS !== 'web') return undefined;
    const onHash = () => setRoute(routeFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Título da aba muda conforme a página
  useEffect(() => {
    if (Platform.OS === 'web') document.title = `IronFit — ${route}`;
  }, [route]);

  const Screen = SCREENS[route] || HomeScreen;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
      <Ticker items={TOP_TICKER} bg={colors.primary} height={26} fontSize={11} speed={50} />
      <Header route={route} navigate={navigate} />
      <ScrollView ref={scrollRef} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <Screen navigate={navigate} params={params} />
        </View>
        <Footer />
      </ScrollView>
      <Toast />
    </View>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Shell />
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
});
