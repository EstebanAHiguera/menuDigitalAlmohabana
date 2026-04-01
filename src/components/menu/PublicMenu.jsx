import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import MapSection from '../MapSection';
import ProductCard from './ProductCard';
import CartSheet from './CartSheet';
import Footer from './Footer';
import { CATEGORY_LABELS, TABS } from './constants';

export default function PublicMenu({ onAdmin }) {
  const { products, cartCount } = useApp();
  const [activeTab, setActiveTab] = useState('productos');
  const [cartOpen, setCartOpen] = useState(false);
  const [view, setView] = useState('menu');

  const tabProducts = products.filter(p => p.category === activeTab && p.available);

  return (
    <div className="bg-amber-100  min-h-dvh">
      <header className="bg-amber-100 border-b-1   px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="font-display text-amber-900 text-4xl tracking-widest leading-none">LA GARULLA</h1>
          <p className="text-amber-900 text-[10px] tracking-[3px] uppercase mt-1">Panadería & Pastelería</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onAdmin} className="text-amber-100 text-[10px] font-bold bg-[#6F7F4F] border border-[#2A2A2A] rounded-xl px-2.5 py-1.5 cursor-pointer">
            ⚙️ Admin
          </button>
        </div>
      </header>

      <nav className="relative flex px-4 pt-5 py-3 pb-5 bg-[#85965F]  border-b border-[#2A2A2A] sticky top-0 z-50">
        <div className="flex items-center gap-3 overflow-x-auto pr-16 w-full">
          {view === 'menu' && TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-3 rounded-full text-sm font-bold cursor-pointer border transition-all
                ${activeTab === tab ? 'bg-[#48581b98]  text-[#0D0D0D] border-[#2A2A2A]' : 'bg-[#6F7F4F] text-amber-100 border-[#2A2A2A]'}`}>
              {CATEGORY_LABELS[tab]}
            </button>
          ))}
          <button onClick={() => setView(view === 'menu' ? 'map' : 'menu')} className="flex-shrink-0 text-amber-100 text-sm rounded-full font-bold bg-[#6F7F4F] border border-[#2A2A2A]  px-4 py-3 cursor-pointer">
            {view === 'menu' ? '📍 Cómo llegar' : '🍞 Menú' }
          </button>
        </div>
        <button onClick={() => setCartOpen(true)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#6F7F4F] border border-[#2A2A2A] rounded-xl w-11 h-11 flex items-center justify-center text-xl cursor-pointer ">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#2a2a2a] text-amber-100 text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </nav>

      {view === 'menu' ? (
        <>
          <div className="px-4 pt-5">
            <h2 className="font-display text-amber-900 text-3xl tracking-wide mb-1">{CATEGORY_LABELS[activeTab]}</h2>
            <div className="w-full h-1 bg-[#e9c38a] rounded mb-4" />
            {tabProducts.length === 0 ? (
              <div className="text-center py-10 text-amber-900">
                <p className="text-3xl mb-2">😴</p>
                <p className="text-sm">No hay productos disponibles en esta categoría</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {tabProducts.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>

          <CartSheet isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </>
      ) : (
        <MapSection />
      )}
      <Footer />
    </div>
  );
}
