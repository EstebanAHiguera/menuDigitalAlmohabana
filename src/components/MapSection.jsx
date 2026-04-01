export default function MapSection() {
  const openMaps = () => window.open('https://maps.google.com/?q=La+Garulla+Bogota', '_blank');
  const callUs   = () => window.open('tel:+573100000000', '_self');

  return (
    <div className="px-4 pt-16 pb-24">
      <div className="mb-4">
        <h2 className=" w-full py-3 bg-[#D4A373] rounded-xl font-bold  flex items-center justify-center gap-2 cursor-pointer border border-[#2A2A2A] mb-4 text-amber-100 text-3xl tracking-wide">Cómo llegar</h2>
        <div className="w-full h-1 bg-[#D4A373] rounded mt-1" />
      </div>

      {/* Mapa simulado */}
      <div className="rounded-2xl overflow-hidden border border-[#2A2A2A] mb-3">
        <div className="bg-[#1e1a14] h-48 relative flex flex-col items-center justify-end pb-4">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 192" preserveAspectRatio="xMidYMid slice">
            <rect width="400" height="192" fill="#1e1a14"/>
            <rect x="0" y="72" width="400" height="16" fill="#2a2520"/>
            <rect x="0" y="122" width="400" height="12" fill="#2a2520"/>
            <rect x="75" y="0" width="14" height="192" fill="#2a2520"/>
            <rect x="195" y="0" width="12" height="192" fill="#2a2520"/>
            <rect x="300" y="0" width="10" height="192" fill="#2a2520"/>
            <rect x="14" y="14" width="50" height="48" rx="4" fill="#2e2820"/>
            <rect x="100" y="18" width="80" height="44" rx="4" fill="#2e2820"/>
            <rect x="220" y="16" width="65" height="46" rx="4" fill="#2e2820"/>
            <rect x="325" y="14" width="60" height="48" rx="4" fill="#2e2820"/>
            <rect x="14" y="100" width="50" height="78" rx="4" fill="#2e2820"/>
            <rect x="100" y="96" width="80" height="80" rx="4" fill="#2e2820"/>
            <rect x="220" y="100" width="65" height="76" rx="4" fill="#2e2820"/>
            <rect x="325" y="96" width="60" height="80" rx="4" fill="#2e2820"/>
            <circle cx="200" cy="80" r="16" fill="#D81B1B" opacity="0.25"/>
            <circle cx="200" cy="80" r="9" fill="#D81B1B"/>
            <circle cx="200" cy="80" r="3.5" fill="white"/>
          </svg>
          <span className="text-4xl relative z-10">📍</span>
          <span className="text-[12px] font-bold text-[#F5C800] relative z-10 bg-[#0D0D0D] px-3 py-1 rounded-lg mt-1">
            La Garulla · Bogotá
          </span>
        </div>
      </div>

      {/* Botón Google Maps */}
      <button
        onClick={openMaps}
        className="w-full py-3.5 bg-[#D4A373] text-[#0D0D0D] rounded-xl  border border-[#2A2A2A]   font-black text-[15px] flex items-center justify-center gap-2 cursor-pointer border-none mb-2.5 active:scale-95 transition-transform"
      >
        <span className="text-lg">🗺️</span> Abrir en Google Maps
      </button>

      {/* Botón llamar */}
      <button
        onClick={callUs}
        className="w-full py-3 bg-[#D4A373]  rounded-xl font-bold text-[#2a2a2a] flex items-center justify-center gap-2 cursor-pointer border border-[#2A2A2A] mb-4 active:scale-95 transition-transform"
      >
        <span className="text-lg">📞</span> +57 310 000 0000
      </button>

      {/* Info cards */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: '🕐', label: 'Horario',    value: '6am – 8pm' },
          { icon: '📅', label: 'Días',       value: 'Lun – Sáb' },
          { icon: '🛵', label: 'Domicilios', value: 'Disponibles' },
        ].map(c => (
          <div key={c.label} className="bg-[#D4A373] border border-[#2A2A2A] rounded-xl p-3 text-center">
            <span className="text-2xl">{c.icon}</span>
            <p className="text-[12px] text-[#2A2A2A] mt-1">{c.label}</p>
            <p className="text-[12px] font-black text-[#2A2A2A] mt-0.5">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}