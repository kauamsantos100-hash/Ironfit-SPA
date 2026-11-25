#  IronFit — Loja de Produtos para Academia (SPA)

Aplicação **Single Page Application** de uma loja virtual de suplementos, equipamentos, vestuário e acessórios para academia, desenvolvida com **React Native (Expo) rodando na web** via `react-native-web`.

> **Framework utilizado:** React Native (Expo) + React Native Web

##  Propósito da aplicação

Oferecer ao público fitness uma experiência de compra rápida e fluida: o usuário navega entre páginas, filtra produtos, monta o carrinho, aplica cupons e entra em contato **sem nenhum recarregamento de página**.

##  Por que React Native?

- **Um código, várias plataformas:** o mesmo projeto roda no navegador (SPA), no Android e no iOS.
- **Componentização:** a interface é construída com componentes reutilizáveis (`Button`, `Chip`, `ProductCard`, etc.).
- **Estado reativo:** `useState`, `useReducer`, `useMemo` e Context API atualizam a tela automaticamente.
- **Estilização organizada:** `StyleSheet` e um tema central (`theme.js`) mantêm o visual consistente e responsivo.
- **Ecossistema Expo:** facilita rodar, testar e publicar (`expo export --platform web`).

##  Funcionalidades

| Recurso | Descrição |
|---|---|
| **Navegação SPA** | 4 páginas (Início, Produtos, Carrinho, Contato) com troca dinâmica de tela e URL por hash (`#/catalogo`); botão voltar do navegador funciona |
| **Catálogo** | 12 produtos com busca por texto, filtro por categoria e ordenação (preço, avaliação, A–Z) |
| **Detalhe do produto** | Modal com descrição, preço e parcelamento |
| **Carrinho** | Adicionar, aumentar/diminuir quantidade, remover, esvaziar; persistido no `localStorage` |
| **Cupons** | `FORCA10` (10%), `IRONFIT20` (20%) e `FRETEGRATIS` |
| **Frete** | Grátis acima de R$ 199,00, com barra de progresso |
| **Checkout** | Finalização com número de pedido e tela de confirmação |
| **Contato** | Formulário com validação (nome, e-mail, mensagem) + FAQ em acordeão |
| **Responsivo** | Menu hambúrguer no mobile e grade de produtos que se adapta a 1–4 colunas |
| **Feedback** | Toast ao adicionar item, badge de quantidade no ícone do carrinho |

##  Identidade visual

Visual **streetwear futurista**, inspirado em lojas de moda urbana: preto, vermelho e branco, tipografia condensada em caixa alta (*Anton*), rótulos "tech" (*Share Tech Mono*) e texto em *Chakra Petch*.

- Tarjas diagonais com texto em movimento (componente `Ticker`) e faixa de avisos no topo
- Hero com grade de fundo, brilho vermelho e card "HUD" com linha de scanner animada
- Contagem regressiva ao vivo da Black Week (`DealBar`)
- Cards de produto em formato retrato com selo de desconto, preço antigo riscado e efeito de brilho ao passar o mouse
- Botões com canto cortado e visual angular

As fontes são carregadas do Google Fonts na versão web (`src/fonts.js`).

##  Estrutura do projeto

```
ironfit/
├── App.js                    # Roteamento SPA + layout principal
├── app.json
├── babel.config.js
├── package.json
└── src/
    ├── theme.js              # Cores, espaçamentos e formatação de moeda
    ├── data/
    │   └── products.js       # Produtos, categorias e cupons
    ├── context/
    │   └── CartContext.js    # Estado global do carrinho (useReducer + Context)
    ├── components/           # Componentes reutilizáveis
    │   ├── Button.js
    │   ├── Chip.js
    │   ├── Footer.js
    │   ├── Header.js
    │   ├── ProductCard.js
    │   ├── SectionTitle.js
    │   └── Toast.js
    └── screens/              # Páginas da SPA
        ├── HomeScreen.js
        ├── CatalogScreen.js
        ├── CartScreen.js
        └── ContactScreen.js
```

##  Como executar

Pré-requisito: [Node.js](https://nodejs.org) 18+.

```bash
# 1. Instalar dependências
npm install

# 2. Rodar no navegador
npm run web
```

O site abrirá em `http://localhost:8081`.

### Gerar versão para publicação

```bash
npm run build
```

Os arquivos estáticos são gerados na pasta `dist/` e podem ser publicados em Vercel, Netlify ou GitHub Pages.

##  Conceitos aplicados

- **Componentização** — componentes reutilizáveis com props
- **Estados e eventos** — `useState`, `useReducer`, `useEffect`, `onPress`, `onChangeText`
- **Estado global** — Context API (`CartProvider` / `useCart`)
- **Renderização condicional** — carrinho vazio, pedido concluído, erros de formulário
- **Listas dinâmicas** — `map` sobre os produtos filtrados
- **Responsividade** — `useWindowDimensions`

##  Créditos das imagens

As fotos dos produtos vêm do [Unsplash](https://unsplash.com) (licença gratuita) e são carregadas por URL. Se uma imagem não carregar, o app exibe o emoji do produto no lugar. Fotógrafos: Alex Saks, FitNish Media, Cyril Saulnier, Russell Moore, Chase Kinney, khader bini, Hayley Kim Studios, Olivia Bauso, Karl Köhler, Alexander Mils e Erik Mclean. As fotos ficam em `src/data/products.js`.