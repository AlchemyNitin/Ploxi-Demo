'use client';

import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { CartItem, CartItemType } from '@/lib/demo-data/types';

// ─── State ────────────────────────────────────────────────────────────────────
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalCost: number;
}

const initialState: CartState = { items: [], totalItems: 0, totalCost: 0 };

// ─── Actions ──────────────────────────────────────────────────────────────────
type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'addedAt'> & { addedAt?: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_ITEM'; payload: { id: string; updates: Partial<CartItem> } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

function recalc(items: CartItem[]): CartState {
  return {
    items,
    totalItems: items.reduce((s, i) => s + i.quantity, 0),
    totalCost: items.reduce((s, i) => s + i.price * i.quantity, 0),
  };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const idx = state.items.findIndex((i) => i.id === action.payload.id && i.type === action.payload.type);
      let next: CartItem[];
      if (idx >= 0) {
        next = state.items.map((item, i) =>
          i === idx ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) } : item,
        );
      } else {
        next = [...state.items, { ...action.payload, quantity: action.payload.quantity || 1, addedAt: action.payload.addedAt || new Date().toISOString() } as CartItem];
      }
      return recalc(next);
    }
    case 'REMOVE_ITEM':
      return recalc(state.items.filter((i) => i.id !== action.payload));
    case 'UPDATE_ITEM':
      return recalc(state.items.map((i) => (i.id === action.payload.id ? { ...i, ...action.payload.updates } : i)));
    case 'CLEAR_CART':
      return initialState;
    case 'LOAD_CART':
      return recalc(action.payload);
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
interface CartContextValue extends CartState {
  addItem: (item: Omit<CartItem, 'addedAt'>) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  getItemsByType: (type: CartItemType) => CartItem[];
  getTotalByType: (type: CartItemType) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ploxi-cart');
      if (saved) dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) });
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    localStorage.setItem('ploxi-cart', JSON.stringify(state.items));
  }, [state.items]);

  const ctx: CartContextValue = {
    ...state,
    addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
    removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
    updateItem: (id, updates) => dispatch({ type: 'UPDATE_ITEM', payload: { id, updates } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    getItemsByType: (type) => state.items.filter((i) => i.type === type),
    getTotalByType: (type) => state.items.filter((i) => i.type === type).reduce((s, i) => s + i.price * i.quantity, 0),
  };

  return <CartContext.Provider value={ctx}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
