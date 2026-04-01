import { useApp } from '../../context/AppContext';
import { fmt } from '../../utils/fmt';

export default function ProductCard({ product }) {
  const { addToCart, cart, removeFromCart } = useApp();
  const qty = cart[product.id] || 0;
  
  if (!product.available) return null;
  
  return (
    <div className={`bg-[#85965F] rounded-2xl overflow-hidden p-1.5 flex flex-col transition-all mb-4
      ${qty > 0 ? 'border-2 border-[#6F7F4F] p-1.5' : 'border border-[#2A2A2A]'}`}>      
     <div className="bg-amber-100 rounded-2xl aspect-square relative overflow-hidden">
        
        <img
          src={product.image || '/images/default.png'}
          alt={product.name}
          className="w-full h-full  object-cover absolute top-0 left-0"
          onError={(e) => (e.target.src = '/images/default.png')}
        />

        {qty > 0 && (
          <span className="absolute top-2 right-2 bg-[#2A2A2A] text-white border border-[#4A4A4A] text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
            {qty}
          </span>
        )}
      </div>
      
      <div className="p-2.5 flex flex-col gap-1 flex-1 justify-between">
        {product.badge && (
          <span className={`text-[12px] font-black px-2 py-0.5 rounded-md uppercase self-start
            ${product.badge === 'popular' ? 'bg-amber-100 text-amber-900' : 'bg-amber-900 text-amber-100'}`}>
            {product.badge}
          </span>
        )}
        
        <p className="font-bold text-[15px] text-white leading-tight">{product.name}</p>
        <p className="text-[13px] text-black leading-snug">{product.desc}</p> 
        <span className="font-black text-[14px] text-[#1A1A1A] mt-1 block]">{fmt(product.price)}</span>
        
        <div className="flex items-center justify-end gap-1 mt-2">
          <button
            onClick={() => qty > 0 && removeFromCart(product.id)}
            className="bg-[#2A2A2A] text-white border border-[#4A4A4A] rounded-lg px-2 py-1 font-white text-xs cursor-pointer active:scale-95 transition-transform"
          >
            -
          </button>
          
          <input
            type="text"
            readOnly
            value={qty}
            className="w-8 h-6 text-center rounded-lg bg-[#2A2A2A] border border-[#4A4A4A] text-white font-black text-xs"
          />
          
          <button
            onClick={() => addToCart(product.id)}
            className="w-6 h-6 rounded-full bg-[#2A2A2A] border border-[#4A4A4A] text-white text-sm flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
