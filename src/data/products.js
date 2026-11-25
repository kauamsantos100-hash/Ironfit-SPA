export const CATEGORIES = ['Todos', 'Suplementos', 'Equipamentos', 'Vestuário', 'Acessórios'];

export const PRODUCTS = [
  {
    id: 1,
    name: 'Whey Protein Isolado 900g',
    category: 'Suplementos',
    price: 189.9,
    rating: 4.8,
    emoji: '🥛',
    color: '#2B6CB0',
    description:
      'Proteína isolada de alta pureza, 27g de proteína por dose e baixo teor de lactose. Ideal para recuperação muscular pós-treino.',
  },
  {
    id: 2,
    name: 'Creatina Monohidratada 300g',
    category: 'Suplementos',
    price: 99.9,
    rating: 4.9,
    emoji: '⚡',
    color: '#B7791F',
    description:
      'Creatina pura para ganho de força e performance em treinos de alta intensidade. Sem sabor, fácil de misturar.',
  },
  {
    id: 3,
    name: 'Pré-Treino Explosion 300g',
    category: 'Suplementos',
    price: 129.9,
    rating: 4.5,
    emoji: '🔥',
    color: '#C53030',
    description:
      'Fórmula com cafeína, beta-alanina e citrulina para foco e energia durante o treino.',
  },
  {
    id: 4,
    name: 'Halter Ajustável 20kg (par)',
    category: 'Equipamentos',
    price: 349.0,
    rating: 4.7,
    emoji: '🏋️',
    color: '#4A5568',
    description:
      'Par de halteres com carga ajustável de 2 a 20kg cada. Pegada emborrachada e trava segura.',
  },
  {
    id: 5,
    name: 'Kit Elásticos de Resistência',
    category: 'Equipamentos',
    price: 79.9,
    rating: 4.6,
    emoji: '🎯',
    color: '#2F855A',
    description:
      'Conjunto com 5 níveis de resistência, alças, tornozeleiras e bolsa de transporte. Perfeito para treinar em casa.',
  },
  {
    id: 6,
    name: 'Corda de Pular Speed Pro',
    category: 'Equipamentos',
    price: 49.9,
    rating: 4.4,
    emoji: '🪢',
    color: '#6B46C1',
    description:
      'Corda com rolamentos de alta velocidade e cabo anatômico. Ajustável para qualquer altura.',
  },
  {
    id: 7,
    name: 'Camiseta Dry-Fit Performance',
    category: 'Vestuário',
    price: 69.9,
    rating: 4.5,
    emoji: '👕',
    color: '#2C7A7B',
    description:
      'Tecido leve que seca rápido e não retém suor. Corte moderno com costuras reforçadas.',
  },
  {
    id: 8,
    name: 'Shorts Treino Flex',
    category: 'Vestuário',
    price: 89.9,
    rating: 4.6,
    emoji: '🩳',
    color: '#744210',
    description: 'Shorts com elastano para total liberdade de movimento e bolso com zíper.',
  },
  {
    id: 9,
    name: 'Legging Compressão Feminina',
    category: 'Vestuário',
    price: 119.9,
    rating: 4.8,
    emoji: '🧘',
    color: '#97266D',
    description:
      'Legging de cintura alta com compressão graduada e tecido opaco que não marca.',
  },
  {
    id: 10,
    name: 'Garrafa Térmica 1L',
    category: 'Acessórios',
    price: 59.9,
    rating: 4.7,
    emoji: '🧴',
    color: '#2B6CB0',
    description: 'Aço inox, mantém a bebida gelada por 24h. Tampa com trava antivazamento.',
  },
  {
    id: 11,
    name: 'Luva de Treino com Munhequeira',
    category: 'Acessórios',
    price: 44.9,
    rating: 4.3,
    emoji: '🧤',
    color: '#4A5568',
    description: 'Proteção para as palmas e suporte para o punho em exercícios com carga.',
  },
  {
    id: 12,
    name: 'Mochila Gym 35L',
    category: 'Acessórios',
    price: 159.9,
    rating: 4.6,
    emoji: '🎒',
    color: '#1A202C',
    description:
      'Compartimento ventilado para tênis, bolso térmico e material resistente à água.',
  },
];

// Fotos reais — Unsplash (licença gratuita: https://unsplash.com/license)
const photo = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=70`;

const PHOTOS = {
  1: { image: photo('1693996045838-980674653385'), credit: 'Alex Saks' },
  2: { image: photo('1724160167551-2ffc3d7ca809'), credit: 'FitNish Media' },
  3: { image: photo('1693996047008-1b6210099be1'), credit: 'Alex Saks' },
  4: { image: photo('1493690283958-32df2c86326e'), credit: 'Cyril Saulnier' },
  5: { image: photo('1767404890803-228d5390fcd4'), credit: 'Russell Moore' },
  6: { image: photo('1535743686920-55e4145369b9'), credit: 'Chase Kinney' },
  7: { image: photo('1778671394516-8270eac13c42'), credit: 'khader bini' },
  8: { image: photo('1594381898411-846e7d193883'), credit: 'Hayley Kim Studios' },
  9: { image: photo('1626444231642-6bd985bca16a'), credit: 'Olivia Bauso' },
  10: { image: photo('1544003484-3cd181d17917'), credit: 'Karl Köhler' },
  11: { image: photo('1557127972-1c446ea89ea5'), credit: 'Alexander Mils' },
  12: { image: photo('1681334921874-5bafe8acf433'), credit: 'Erik Mclean' },
};

// Desconto da Black Week (%) por produto
const DISCOUNTS = { 1: 25, 2: 20, 3: 30, 4: 15, 5: 35, 6: 20, 7: 30, 8: 25, 9: 30, 10: 20, 11: 25, 12: 35 };

// Anexa foto, crédito e preço antigo (price já é o valor com desconto)
PRODUCTS.forEach((p) => {
  const discount = DISCOUNTS[p.id];
  const oldPrice = Math.ceil(p.price / (1 - discount / 100) / 10) * 10 - 0.1;
  Object.assign(p, PHOTOS[p.id], { discount, oldPrice });
});

export const COUPONS = {
  FORCA10: { type: 'percent', value: 10, label: '10% de desconto' },
  IRONFIT20: { type: 'percent', value: 20, label: '20% de desconto' },
  FRETEGRATIS: { type: 'shipping', value: 0, label: 'Frete grátis' },
};

export const FREE_SHIPPING_FROM = 199;
export const SHIPPING_FEE = 19.9;
