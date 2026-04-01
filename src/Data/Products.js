export const INITIAL_PRODUCTS = [
  { id: 'g1', category: 'productos',    name: 'Garulla Tradicional', desc: 'Maíz, queso campesino y mantequilla',        price: 1800,  image: '/images/garulla.png', badge: 'popular', available: true },
  { id: 'g2', category: 'productos',    name: 'Garulla Rellena',     desc: 'Rellena de queso doble crema derretido',     price: 2500,  image: '/images/garulla.png', badge: 'nuevo',   available: true },
  { id: 'g3', category: 'productos',    name: 'Garulla Grande',      desc: 'Tamaño familiar, perfecta para compartir',   price: 3200,  image: '/images/garulla.png', badge: null,      available: true },
  { id: 'g4', category: 'productos',    name: 'Garulla Mini x3',     desc: 'Pack de tres unidades pequeñas',             price: 3500,  image: '/images/garulla.png', badge: 'popular', available: true },

  { id: 'a1', category: 'productos', name: 'Almojábana Clásica',  desc: 'Suave, esponjosa y recién horneada',         price: 2000,  image: '/images/almohabana.png', badge: 'popular', available: true },
  { id: 'a2', category: 'productos', name: 'Almojábana XL',       desc: 'Extra grande, con más queso por dentro',     price: 2800,  image: '/images/almohabana.png', badge: null,      available: true },
  { id: 'a3', category: 'productos', name: 'Almojábana de Maíz',  desc: 'Versión especial con maíz dulce',            price: 2200,  image: '/images/almohabana.png', badge: 'nuevo',   available: true },
  { id: 'a4', category: 'productos', name: 'Almojábana x6',       desc: 'Media docena para llevar o compartir',       price: 10000, image: '/images/almohabana.png', badge: null,      available: true },

  { id: 'c1', category: 'combos',      name: 'Combo Desayuno',      desc: '2 garullas + 1 almojábana + tinto',          price: 6500,  image: '/images/empanada.png', badge: null,      available: true },
  { id: 'c2', category: 'combos',      name: 'Combo Familiar',      desc: '4 garullas + 4 almojábanas + 2 jugos',       price: 20000, image: '/images/empanada.png', badge: null,      available: true },
  { id: 'c3', category: 'combos',      name: 'Combo Paisa',         desc: '3 garullas rellenas + chocolate caliente',   price: 9500,  image: '/images/panDebono.png', badge: null,      available: true },

  { id: 'b1', category: 'bebidas',     name: 'Tinto pequeño',       desc: 'Tinto negro recién colado',                  price: 1200,  image: '/images/default.png', badge: null,      available: true },
  { id: 'b2', category: 'bebidas',     name: 'Tinto grande',        desc: 'Tinto negro grande',                         price: 1800,  image: '/images/default.png', badge: null,      available: true },
  { id: 'b3', category: 'bebidas',     name: 'Chocolate caliente',  desc: 'Chocolate de mesa tradicional',              price: 2500,  image: '/images/default.png', badge: null,      available: true },
  { id: 'b4', category: 'bebidas',     name: 'Jugo de naranja',     desc: 'Jugo natural de naranja',                    price: 3000,  image: '/images/default.png', badge: null,      available: true },
  { id: 'b5', category: 'bebidas',     name: 'Agua',                desc: 'Agua fría 500ml',                            price: 1500,  image: '/images/default.png', badge: null,      available: true },
  { id: 'b6', category: 'bebidas',     name: 'Gaseosa',             desc: 'Gaseosa 350ml',                              price: 2000,  image: '/images/default.png', badge: null,      available: true },
];

export const CATEGORIES = [
  { id: 'productos', label: 'Productos' },
  { id: 'combos',      label: 'Combos' },
  { id: 'bebidas',     label: 'Bebidas' },
];

export const ORDER_STATUSES = [
  { id: 'pendiente',   label: 'Pendiente',      color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  { id: 'preparacion', label: 'En preparación', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { id: 'listo',       label: 'Listo',           color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  { id: 'entregado',   label: 'Entregado',       color: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30' },
];

