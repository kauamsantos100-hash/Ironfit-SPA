import { Platform } from 'react-native';

export const colors = {
  bg: '#050507',
  surface: '#0B0B0F',
  card: '#101015',
  border: '#24242C',
  primary: '#FF1E3C',
  primaryDark: '#B3001B',
  accent: '#FFFFFF',
  text: '#F5F5F7',
  muted: '#8E8E9B',
  success: '#3DDC84',
  danger: '#FF5470',
  paper: '#E7E7E9',
};

// Visual mais "reto" e angular
export const radius = { sm: 2, md: 3, lg: 4, pill: 2 };

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 40 };

export const MAX_WIDTH = 1280;

// Fontes (carregadas do Google Fonts na versão web — ver src/fonts.js)
export const fonts = {
  display: Platform.select({
    web: "'Anton', 'Bebas Neue', Impact, 'Arial Narrow', sans-serif",
    default: undefined,
  }),
  body: Platform.select({
    web: "'Chakra Petch', 'Rajdhani', system-ui, sans-serif",
    default: undefined,
  }),
  mono: Platform.select({
    web: "'Share Tech Mono', 'Courier New', monospace",
    default: undefined,
  }),
};

// Efeitos exclusivos da web (ignorados no mobile)
export const webGlow = Platform.select({
  web: { boxShadow: '0 0 28px rgba(255, 30, 60, 0.35)' },
  default: {},
});

export const webHeroBg = Platform.select({
  web: {
    backgroundImage:
      'radial-gradient(circle at 72% 38%, rgba(255,30,60,0.30), transparent 42%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
    backgroundSize: 'auto, 44px 44px, 44px 44px',
  },
  default: {},
});

// Formata número para moeda brasileira (R$ 1.234,56)
export function formatBRL(value) {
  const [int, dec] = value.toFixed(2).split('.');
  return `R$ ${int.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${dec}`;
}
