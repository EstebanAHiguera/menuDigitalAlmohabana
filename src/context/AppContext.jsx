import { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_PRODUCTS } from '../Data/Products';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [products, setProducts] = useLocalStorage('lg_products', INITIAL_PRODUCTS);

  const addProduct = useCallback((product) => {
    const newProduct = { ...product, id: `p_${Date.now()}`, available: true };
    setProducts(prev => [...prev, newProduct]);
  }, [setProducts]);

  const updateProduct = useCallback((id, data) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  }, [setProducts]);

  const deleteProduct = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, [setProducts]);

  const toggleAvailable = useCallback((id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, available: !p.available } : p));
  }, [setProducts]);

  const [orders, setOrders] = useLocalStorage('lg_orders', []);

  const addOrder = useCallback((cartLines, total, customerNote = '') => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      number: Date.now().toString().slice(-4),
      items: cartLines,
      total,
      customerNote,
      status: 'pendiente',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder.id;
  }, [setOrders]);

  const updateOrderStatus = useCallback((id, status) => {
    setOrders(prev => prev.map(o =>
      o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o
    ));
    if (status === 'entregado') {
      setOrders(prev => {
        const order = prev.find(o => o.id === id);
        if (order) addToHistory({ ...order, status: 'entregado' });
        return prev;
      });
    }
  }, [setOrders]);

  const deleteOrder = useCallback((id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  }, [setOrders]);

  const [history, setHistory] = useLocalStorage('lg_history', []);

  const addToHistory = useCallback((order) => {
    setHistory(prev => {
      const exists = prev.find(h => h.id === order.id);
      if (exists) return prev.map(h => h.id === order.id ? { ...order, completedAt: new Date().toISOString() } : h);
      return [{ ...order, completedAt: new Date().toISOString() }, ...prev];
    });
  }, [setHistory]);

  const clearHistory = useCallback(() => setHistory([]), [setHistory]);

  const [cart, setCart] = useLocalStorage('lg_cart', {});

  const addToCart = useCallback((id) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }, [setCart]);

  const removeFromCart = useCallback((id) => {
    setCart(prev => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      if (next[id] === 1) delete next[id];
      else next[id]--;
      return next;
    });
  }, [setCart]);

  const clearCart = useCallback(() => setCart({}), [setCart]);

  // Redefine deleteProduct to include cart cleaning after setCart is available
  const deleteProductWithCart = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setCart(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, [setProducts, setCart]);

  const cartLines = Object.entries(cart).map(([id, qty]) => {
    const product = products.find(p => p.id === id);
    if (!product) return null;
    return { ...product, qty, subtotal: product.price * qty };
  }).filter(Boolean);

  const cartTotal = cartLines.reduce((sum, l) => sum + l.subtotal, 0);
  const cartCount = cartLines.reduce((sum, line) => sum + line.qty, 0);

  const stats = {
    totalOrders: history.length,
    totalRevenue: history.reduce((sum, o) => sum + o.total, 0),
    pendingOrders: orders.filter(o => o.status === 'pendiente').length,
    activeOrders: orders.filter(o => ['pendiente','preparacion','listo'].includes(o.status)).length,
  };

  return (
    <AppContext.Provider value={{
      products, addProduct, updateProduct, deleteProduct: deleteProductWithCart, toggleAvailable,
      orders, addOrder, updateOrderStatus, deleteOrder,
      history, clearHistory,
      cart, cartLines, cartTotal, cartCount, addToCart, removeFromCart, clearCart,
      stats,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}