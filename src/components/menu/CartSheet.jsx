import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { fmt } from '../../utils/fmt';

export default function CartSheet({ isOpen, onClose }) {
  const { cartLines, cartTotal, cartCount, addToCart, removeFromCart, clearCart, addOrder } = useApp();
  const [note, setNote] = useState('');
  const [ordered, setOrdered] = useState(false);
  const DELIVERY = 3000;

  const handleOrder = () => {
    if (!cartLines.length) return;
    addOrder(cartLines, cartTotal + DELIVERY, note);
    clearCart();
    setNote('');
    setOrdered(true);
    setTimeout(() => { setOrdered(false); onClose(); }, 2500);
  };

  if (!isOpen) return null;
  
  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/75 z-[200]" />
      
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-[#1A1A1A] rounded-t-3xl z-[201] max-h-[85dvh] overflow-y-auto pb-8">
        <div className="w-9 h-1 bg-[#2A2A2A] rounded mx-auto mt-3" />
        
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A2A]">
          <h2 className="font-display text-amber-100 text-2xl tracking-widest">Mi Pedido</h2>
          {cartLines.length > 0 && (
            <button onClick={clearCart} className="text-white/30 text-xs bg-transparent border-none cursor-pointer font-semibold">
              Vaciar
            </button>
          )}
        </div>

        {ordered ? (
          <div className="text-center py-12 px-4">
            <p className="text-5xl mb-3">✅</p>
            <p className="font-black text-white text-xl">¡Pedido enviado!</p>
            <p className="text-white/40 text-sm mt-2">El negocio recibió tu pedido</p>
          </div>
        ) : cartLines.length === 0 ? (
          <div className="text-center py-12 text-white/30">
            <p className="text-4xl mb-2">🛒</p>
            <p className="text-sm">Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            {cartLines.map(item => (
              <div key={item.id} className="flex items-center gap-2.5 px-4 py-3 border-b border-[#2A2A2A]">
                <div className="w-12 h-12 bg-[#2A2A2A] rounded-xl flex-shrink-0 overflow-hidden">
                  <img src={item.image || '/images/default.png'} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = '/images/default.png')} />
                </div>
                
                <div className="flex-1">
                  <p className="font-bold text-[13px] text-white">{item.name}</p>
                  <p className="text-[13px] font-black text-amber-100 mt-0.5">{fmt(item.subtotal)}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="w-7 h-7 rounded-full border border-[#2A2A2A] bg-[#2A2A2A] text-white text-base flex items-center justify-center cursor-pointer"
                  >
                    −
                  </button>
                  <span className="text-sm font-black text-white min-w-[14px] text-center">{item.qty}</span>
                  <button 
                    onClick={() => addToCart(item.id)} 
                    className="w-7 h-7 rounded-full bg-[#6f7f4f] border-none text-white text-base flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            
            <div className="px-4 pt-3">
              <div className="flex justify-between py-1 text-[13px] text-white/50">
                <span>Subtotal ({cartCount} items)</span>
                <span>{fmt(cartTotal)}</span>
              </div>
              
              <div className="flex justify-between py-1 text-[13px] text-white/50">
                <span>Domicilio</span>
                <span>{fmt(DELIVERY)}</span>
              </div>
              
              <div className="flex justify-between pt-3 mt-1 border-t border-[#6F7F4F] text-base font-black text-white">
                <span>Total</span>
                <span className="text-amber-100">{fmt(cartTotal + DELIVERY)}</span>
              </div>
              
              <textarea
                className="w-full mt-3 bg-[#2A2A2A] border border-[#6F7F4F] rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-[#F5C800] resize-none"
                placeholder="Nota para el pedido (opcional)..."
                rows={2}
                value={note}
                onChange={e => setNote(e.target.value)}
              />
              
              <button
                onClick={handleOrder}
                className="w-full py-4 bg-[#6F7F4F] text-amber-100 rounded-2xl font-black text-[15px] flex items-center justify-center gap-2 border-none cursor-pointer mt-3 active:scale-95 transition-transform"
              >
                🍞 Enviar pedido
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
