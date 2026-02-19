import { createContext, useContext, useReducer, useState } from 'react';

// ─── CART REDUCER ─────────────────────────────────────────────────────────────
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(i => i.id === action.product.id);
      if (exists)
        return state.map(i =>
          i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
        );
      return [...state, { ...action.product, qty: 1 }];
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.id);
    case 'UPDATE_QTY':
      return state.map(i =>
        i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i
      );
    case 'CLEAR':
      return [];
    default:
      return state;
  }
};

// ─── CONTEXT ──────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [cart, dispatch]       = useReducer(cartReducer, []);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser]         = useState(null);
  const [dosha, setDosha]       = useState(null);
  const [toast, setToast]       = useState(null);
  const [currentPage, setCurrentPage]           = useState('home');
  const [selectedProduct, setSelectedProduct]   = useState(null);

  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const addToCart = product => {
    dispatch({ type: 'ADD', product });
    showToast(`${product.name} added to cart ✓`);
  };

  const toggleWishlist = id =>
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <AppContext.Provider
      value={{
        cart, dispatch,
        wishlist, toggleWishlist,
        user, setUser,
        dosha, setDosha,
        toast, showToast,
        currentPage, setCurrentPage,
        selectedProduct, setSelectedProduct,
        addToCart, cartTotal, cartCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
