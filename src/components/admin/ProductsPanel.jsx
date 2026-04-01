import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { fmt } from '../../utils/fmt';
import { CATEGORIES } from '../../Data/Products';

const EMPTY_FORM = { name: '', desc: '', price: '', image: '', category: 'productos', badge: '' };

function ProductForm({ initial = EMPTY_FORM, onSave, onCancel }) {
  const [form, setForm] = useState(initial);
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const inputCls = "w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl px-3 py-2.5 text-white text-sm font-semibold outline-none focus:border-[#F5C800] transition-colors";
  const labelCls = "text-white/50 text-xs font-bold uppercase tracking-wide mb-1 block";

  return (
 <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4">
    <div className="grid grid-cols-2 gap-3 mb-3">

      {/* 🖼️ CAMPO IMAGEN */}
      <div className="col-span-2">
        <label className={labelCls}>Imagen</label>
        
        {/* Preview */}
        {form.image && (
          <div className="w-full h-32 bg-[#2A2A2A] rounded-xl overflow-hidden mb-2">
            <img
              src={form.image}
              alt="preview"
              className="w-full h-full object-cover"
              onError={e => { e.target.style.display = 'none'; }}
            />
          </div>
        )}

        {/* Botón seleccionar archivo */}
        <label className="w-full flex items-center justify-center gap-2 bg-[#2A2A2A] border border-dashed border-[#3A3A3A] hover:border-[#F5C800] rounded-xl py-3 cursor-pointer transition-colors group">
          <span className="text-lg">🖼️</span>
          <span className="text-white/50 group-hover:text-white/80 text-sm font-semibold transition-colors">
            {form.image ? 'Cambiar imagen' : 'Seleccionar imagen'}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              const file = e.target.files[0];
              if (!file) return;

              const imagePath = `/images/${file.name}`; // 🔥 SOLO RUTA
              set('image', imagePath);
            }}
          />
        </label>

        {/* Quitar imagen */}
        {form.image && (
          <button
            onClick={() => set('image', '')}
            className="mt-1.5 text-[#D81B1B] text-xs font-bold bg-transparent border-none cursor-pointer w-full text-center"
          >
            × Quitar imagen
          </button>
        )}
      </div>
 

        <div className="col-span-2">
          <label className={labelCls}>Nombre del producto</label>
          <input className={inputCls} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Ej: Garulla Especial" />
        </div>

        <div className="col-span-2">
          <label className={labelCls}>Descripción</label>
          <input className={inputCls} value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="Breve descripción del producto" />
        </div>

        <div>
          <label className={labelCls}>Precio (COP)</label>
          <input className={inputCls} type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="2500" />
        </div>

        <div>
          <label className={labelCls}>Categoría</label>
          <select className={inputCls} value={form.category} onChange={e => set('category', e.target.value)} style={{ backgroundColor: '#2A2A2A' }}>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>

        <div className="col-span-2">
          <label className={labelCls}>Badge (opcional)</label>
          <div className="flex gap-2">
            {['', 'popular', 'nuevo'].map(b => (
              <button key={b} onClick={() => set('badge', b)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer transition-all
                  ${form.badge === b
                    ? b === 'popular' ? 'bg-[#D81B1B] text-white border-[#D81B1B]'
                    : b === 'nuevo'   ? 'bg-[#F5C800] text-[#0D0D0D] border-[#F5C800]'
                    : 'bg-white/10 text-white border-white/20'
                    : 'bg-transparent text-white/30 border-[#2A2A2A]'}`}>
                {b === '' ? 'Sin badge' : b.charAt(0).toUpperCase() + b.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <button onClick={() => { if (!form.name.trim() || !form.price) return; onSave({ ...form, price: Number(form.price) }); }}
          className="flex-1 py-2.5 bg-[#F5C800] text-[#0D0D0D] rounded-xl font-black text-sm border-none cursor-pointer active:scale-95 transition-transform">
          Guardar
        </button>
        <button onClick={onCancel}
          className="py-2.5 px-4 bg-transparent text-white/40 rounded-xl font-bold text-sm border border-[#2A2A2A] cursor-pointer">
          Cancelar
        </button>
      </div>
    </div>
  );
}

function ProductRow({ product, onEdit, onDelete, onToggle }) {
  return (
    <div className={`bg-amber-100 border-2 rounded-xl px-3 py-2.5 flex items-center gap-3 transition-all ${!product.available ? 'opacity-40' : ''} border-[#2A2A2A]`}>
         <img
          src={product.image || '/images/default.png'}
          alt={product.name}
          className="w-9 h-9 bg-[#D4A373] rounded-lg border object-cover flex-shrink-0"
          onError={(e) => (e.target.src = '/images/default.png')}
        />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#2A2A2A] text-sm truncate">{product.name}</span>
          {product.badge && (
            <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase flex-shrink-0
              ${product.badge === 'popular' ? 'bg-amber-900 text-amber-100' : 'bg-green-700/50 text-[#0D0D0D]'}`}>
              {product.badge}
            </span>
          )}
        </div>
        <p className="text-[#2A2A2A] text-xs font-black">{fmt(product.price)}</p>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button onClick={() => onToggle(product.id)}
          className={`text-[10px] font-bold px-2 py-1 rounded-lg border-none cursor-pointer
            ${product.available ? 'bg-green-500/20 text-green-400' : 'bg-zinc-500/20 text-zinc-500'}`}>
          {product.available ? '● Activo' : '○ Oculto'}
        </button>
        <button onClick={() => onEdit(product)} className="w-7 h-7 bg-[#F5C800]/70 border-2 border-[#2A2A2A] rounded-lg text-xs border-none cursor-pointer flex items-center justify-center">✏️</button>
        <button onClick={() => onDelete(product.id)} className="w-7 h-7 bg-amber-900 rounded-lg text-[#D81B1B] text-xs border-none cursor-pointer flex items-center justify-center">🗑️</button>
      </div>
    </div>
  );
}

export default function ProductsPanel() {
  const { products, addProduct, updateProduct, deleteProduct, toggleAvailable } = useApp();
  const [mode, setMode] = useState('list');
  const [editTarget, setEditTarget] = useState(null);
  const [filterCat, setFilterCat] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = products
    .filter(p => filterCat === 'all' || p.category === filterCat)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 md:p-6 pb-24 md:pb-6 bg-[#85965F] min-h-screen">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="font-display text-amber-100 text-4xl tracking-wide">Productos</h1>
          <div className="w-full h-1 bg-amber-100 rounded mt-1" />
        </div>
        {mode === 'list' && (
          <button onClick={() => setMode('add')}
            className="bg-amber-100 text-amber-900 border-2  rounded-xl px-4 py-2.5 font-black text-sm cursor-pointer active:scale-95 transition-transform">
            + Nuevo
          </button>
        )}
      </div>

      {mode === 'add' && (
        <div className="mb-4">
          <p className="text-white/50 text-xs font-bold uppercase tracking-wide mb-3">Nuevo producto</p>
          <ProductForm onSave={(data) => { addProduct(data); setMode('list'); }} onCancel={() => setMode('list')} />
        </div>
      )}

      {mode === 'edit' && editTarget && (
        <div className="mb-4">
          <p className="text-white/50 text-xs font-bold uppercase tracking-wide mb-3">Editando: {editTarget.name}</p>
          <ProductForm
            initial={{ ...editTarget, price: String(editTarget.price) }}
            onSave={(data) => { updateProduct(editTarget.id, data); setEditTarget(null); setMode('list'); }}
            onCancel={() => { setEditTarget(null); setMode('list'); }}
          />
        </div>
      )}

      <input className="w-full bg-amber-100 border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-[#2A2A2A] text-sm outline-none focus:border-[#6F7F4F] mb-3 transition-colors"
        placeholder="🔍 Buscar producto..." value={search} onChange={e => setSearch(e.target.value)} />

      <div className="flex gap-2 overflow-x-auto mb-4 pb-1">
        <button onClick={() => setFilterCat('all')}
          className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold border cursor-pointer transition-all
            ${filterCat === 'all' ? 'bg-[#F5C800] text-[#0D0D0D] border-[#F5C800]' : 'bg-transparent text-white/40 border-[#2A2A2A]'}`}>
          Todos ({products.length})
        </button>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setFilterCat(c.id)}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold border cursor-pointer transition-all
              ${filterCat === c.id ? 'bg-[#F5C800] text-[#0D0D0D] border-[#F5C800]' : 'bg-transparent text-white/40 border-[#2A2A2A]'}`}>
            {c.label} ({products.filter(p => p.category === c.id).length})
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 text-center text-white/30">
            <p className="text-3xl mb-2">📭</p>
            <p className="text-sm">Sin productos{search ? ` con "${search}"` : ''}</p>
          </div>
        ) : filtered.map(p => (
          <ProductRow key={p.id} product={p}
            onEdit={(p) => { setEditTarget(p); setMode('edit'); }}
            onDelete={(id) => { if (window.confirm('¿Eliminar este producto?')) deleteProduct(id); }}
            onToggle={toggleAvailable} />
        ))}
      </div>
    </div>
  );
}