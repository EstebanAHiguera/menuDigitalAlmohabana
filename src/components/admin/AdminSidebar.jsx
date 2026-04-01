import { useApp } from '../../context/AppContext';

const NAV = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'orders',    icon: '🧾', label: 'Pedidos' },
  { id: 'products',  icon: '🍞', label: 'Productos' },
  { id: 'history',   icon: '📋', label: 'Historial' },
];

export default function AdminSidebar({ active, onChange }) {
  const { stats } = useApp();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-amber-100 border-r border-[#2A2A2A] min-h-screen sticky top-0">
        <div className="px-5 py-5 border-b border-[#2A2A2A]">
          <div className="font-display text-amber-900 text-3xl tracking-widest leading-none">LA GARULLA</div>
          <div className="text-amber-900 text-[10px] tracking-widest uppercase mt-1">Panel Admin</div>
        </div>

        <nav className="flex flex-col gap-1 p-3 flex-1">
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex items-center gap-3 mt-2 px-3 py-2.5 border-t border-[#2A2A2A] rounded-xl text-sm font-bold text-left w-full border-none cursor-pointer transition-all
                ${active === item.id
                  ? ' bg-[#48581b98] text-[#0D0D0D] '
                : 'bg-[#6F7F4F] text-amber-100 hover:text-white/50 hover:bg-[#85965F] '}`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.id === 'orders' && stats.pendingOrders > 0 && (
                <span className="bg-[#D81B1B] text-amber-100 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {stats.pendingOrders}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#2A2A2A]">
          <button
            onClick={() => onChange('menu')}
            className="w-full py-2 border border-[#2A2A2A] rounded-xl text-amber-100 text-xs font-bold bg-[#85965F] cursor-pointer hover:text-white/50 transition-colors"
          >
            👁️ Ver menú público
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-amber-100 border-t-2 border-[#85965F] flex z-50">
        {NAV.map(item => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[9px] font-bold bg-transparent border-none cursor-pointer transition-all
              ${active === item.id ? 'text-[#F5C800]' : 'text-white/30'}`}
          >
            <span className="text-lg relative">
              {item.icon}
              {item.id === 'orders' && stats.pendingOrders > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D81B1B] text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {stats.pendingOrders}
                </span>
              )}
            </span>
            {item.label}
          </button>
        ))}
        <button
          onClick={() => onChange('menu')}
          className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[9px] font-bold bg-transparent border-none cursor-pointer text-white/30"
        >
          <span className="text-lg">👁️</span>
          Menú
        </button>
      </nav>
    </>
  );
}