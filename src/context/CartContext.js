import React, { createContext, useContext, useEffect, useMemo, useReducer, useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { PRODUCTS, COUPONS, FREE_SHIPPING_FROM, SHIPPING_FEE } from '../data/products';

const CartContext = createContext(null);
const STORAGE_KEY = 'ironfit_cart_v1';

// items: { [productId]: quantidade }
function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const qty = (state[action.id] || 0) + 1;
      return { ...state, [action.id]: Math.min(qty, 10) };
    }
    case 'SET_QTY': {
      if (action.qty <= 0) {
        const { [action.id]: _removed, ...rest } = state;
        return rest;
      }
      return { ...state, [action.id]: Math.min(action.qty, 10) };
    }
    case 'REMOVE': {
      const { [action.id]: _removed, ...rest } = state;
      return rest;
    }
    case 'CLEAR':
      return {};
    default:
      return state;
  }
}

function loadInitial() {
  if (Platform.OS !== 'web') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadInitial);
  const [coupon, setCoupon] = useState(null);
  const [toast, setToast] = useState(null);

  // Persiste o carrinho no navegador
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {}
  }, [items]);

  // Some com o aviso após 2s
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  const addItem = useCallback((product) => {
    dispatch({ type: 'ADD', id: product.id });
    setToast(`${product.name} adicionado ao carrinho`);
  }, []);

  const setQty = useCallback((id, qty) => dispatch({ type: 'SET_QTY', id, qty }), []);
  const removeItem = useCallback((id) => dispatch({ type: 'REMOVE', id }), []);
  const clear = useCallback(() => {
    dispatch({ type: 'CLEAR' });
    setCoupon(null);
  }, []);

  // Retorna { ok, message }
  const applyCoupon = useCallback((code) => {
    const key = code.trim().toUpperCase();
    if (!key) return { ok: false, message: 'Digite um cupom.' };
    const found = COUPONS[key];
    if (!found) return { ok: false, message: 'Cupom inválido.' };
    setCoupon({ code: key, ...found });
    return { ok: true, message: `Cupom aplicado: ${found.label}` };
  }, []);

  const removeCoupon = useCallback(() => setCoupon(null), []);

  const value = useMemo(() => {
    const lines = Object.keys(items)
      .map((id) => {
        const product = PRODUCTS.find((p) => p.id === Number(id));
        return product ? { product, qty: items[id] } : null;
      })
      .filter(Boolean);

    const count = lines.reduce((sum, l) => sum + l.qty, 0);
    const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
    const discount = coupon && coupon.type === 'percent' ? (subtotal * coupon.value) / 100 : 0;
    const afterDiscount = subtotal - discount;
    const freeShipping =
      (coupon && coupon.type === 'shipping') || afterDiscount >= FREE_SHIPPING_FROM;
    const shipping = lines.length === 0 || freeShipping ? 0 : SHIPPING_FEE;
    const total = afterDiscount + shipping;

    return {
      lines,
      count,
      subtotal,
      discount,
      shipping,
      total,
      coupon,
      toast,
      addItem,
      setQty,
      removeItem,
      clear,
      applyCoupon,
      removeCoupon,
    };
  }, [items, coupon, toast, addItem, setQty, removeItem, clear, applyCoupon, removeCoupon]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider');
  return ctx;
}
