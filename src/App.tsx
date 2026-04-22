import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, X, Plus, Minus, Send, Check, 
  ChevronLeft, ChevronRight, Star, ArrowLeft,
  ShoppingBag, Package, Truck, ShieldCheck,
  Globe, Sun, Moon, Info
} from 'lucide-react';

// --- Types ---
interface Product {
  id: string;
  name: { es: string; en: string };
  price: number;
  description: { es: string; en: string };
  images: string[];
}

interface CartItem extends Product {
  selectedSize: string;
  sizeMeasures: string;
  selectedColor: string;
  quantity: number;
}

// --- Constants ---
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: { es: 'Jersey México Local 2024', en: 'Mexico Home Jersey 2024' },
    price: 85.00,
    description: { 
      es: 'Inspirada en el plumaje del águila. Tejido transpirable con tecnología de absorción para alto rendimiento.',
      en: 'Inspired by eagle feathers. Breathable fabric with moisture-wicking technology for high performance.'
    },
    images: [
      'https://images.unsplash.com/photo-1627318042469-f83196ed8645?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
    ]
  },
  {
    id: '2',
    name: { es: 'Jersey Real Madrid Blanco Clásico', en: 'Real Madrid Classic White' },
    price: 90.00,
    description: { 
      es: 'La elegancia del club más grande de Europa. Escudo bordado y detalles dorados premium.',
      en: 'The elegance of Europe\'s greatest club. Embroidered crest and premium gold details.'
    },
    images: [
      'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?q=80&w=800&auto=format&fit=crop',
    ]
  },
  {
    id: '3',
    name: { es: 'Jersey Barcelona Retro 90s', en: 'Barcelona 90s Retro Jersey' },
    price: 75.00,
    description: { 
      es: 'Un viaje a la época dorada del Dream Team. Diseño icónico y ajuste clásico.',
      en: 'A trip to the Dream Team golden era. Iconic design and classic fit.'
    },
    images: [
      'https://images.unsplash.com/photo-1628109312117-915000570cc9?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621272036047-bb0f76bbc1ad?q=80&w=800&auto=format&fit=crop',
    ]
  },
  {
    id: '4',
    name: { es: 'Jersey Argentina 3 Estrellas', en: 'Argentina 3 Stars Jersey' },
    price: 95.00,
    description: { 
      es: 'La piel de los campeones del mundo. Con el parche oficial de la FIFA y las 3 estrellas bordadas.',
      en: 'The skin of world champions. With official FIFA patch and 3 embroidered stars.'
    },
    images: [
      'https://images.unsplash.com/photo-1672322319409-9657f9202352?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1673891404104-e3ad97edac8b?q=80&w=800&auto=format&fit=crop',
    ]
  },
  {
    id: '5',
    name: { es: 'Jersey Inter Miami Local (Messi)', en: 'Inter Miami Home Jersey (Messi)' },
    price: 88.00,
    description: { 
      es: 'El color rosa que revoluciona el fútbol. Edición especial con personalización premium.',
      en: 'The pink color revolutionizing football. Special edition with premium personalization.'
    },
    images: [
      'https://images.unsplash.com/photo-1706698656113-d144e5acafdd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1706700010896-1849202a3a5f?q=80&w=800&auto=format&fit=crop',
    ]
  },
  {
    id: '6',
    name: { es: 'Jersey Italia Renaissance', en: 'Italy Renaissance Jersey' },
    price: 82.00,
    description: { 
      es: 'Arte y fútbol se fusionan en este diseño único. Inspirado en la arquitectura clásica italiana.',
      en: 'Art and football blend in this unique design. Inspired by classic Italian architecture.'
    },
    images: [
      'https://images.unsplash.com/photo-1624608351586-13e71239859f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614632537190-23e4141777db?q=80&w=800&auto=format&fit=crop',
    ]
  }
];

const SIZE_CHART = [
  { id: 'S', label: 'S', measures: '48cm / 19"' },
  { id: 'M', label: 'M', measures: '51cm / 20"' },
  { id: 'L', label: 'L', measures: '54cm / 21"' },
  { id: 'XL', label: 'XL', measures: '57cm / 22"' },
  { id: 'XXL', label: 'XXL', measures: '60cm / 23.5"' },
];

const WHATSAPP_NUMBER = "+529624600652";

const I18N = {
  es: {
    catalog: 'Catálogo',
    about: 'Nosotros',
    contact: 'Contacto',
    exhibit: 'EXHIBICIÓN',
    heroSub: 'Excelencia Curada',
    heroTitle: 'Exhibición de <span class="text-red-600 font-light italic">Jerseys</span>',
    heroDesc: 'Descubre Aiko\'s T-Shirt Shop. Calidad premium y diseños icónicos del fútbol mundial seleccionados para ti.',
    shipping: 'Envíos Rápidos en todo México',
    selectionSize: 'Selección: Talla (Pecho)',
    selectionTone: 'Versión / Tono',
    addToBag: 'Añadir a la Bolsa',
    backGrid: 'Volver al Catálogo',
    inventory: 'Inventario',
    emptyCart: 'Tu inventario está vacío',
    browse: 'Empezar a buscar',
    totalBill: 'Total del Pedido',
    finalize: 'Finalizar Pedido',
    secure: 'Seguro',
    logistic: 'Logística',
    fast: 'Entrega en TODO México',
    sustainable: 'Calidad Premium',
    identityName: 'Nombre Completo',
    phone: 'Número de Contacto (+)',
    address: 'Dirección de Entrega',
    online: 'Vendedores en Línea',
    disclaimer: 'El pedido se coordina vía WhatsApp. Entregas garantizadas en todo México.',
    items: 'Artículos',
    orderMsg: 'NUEVO PEDIDO DE JERSEY',
  },
  en: {
    catalog: 'Catalog',
    about: 'About',
    contact: 'Contact',
    exhibit: 'EXHIBIT',
    heroSub: 'Curated Excellence',
    heroTitle: 'Jersey <span class="text-red-600 font-light italic">Exhibition</span>',
    heroDesc: 'Discover Aiko\'s T-Shirt Shop. Premium quality and iconic football designs curated for you.',
    shipping: 'Fast Mexico-Wide Shipping',
    selectionSize: 'Selection: Size (Chest)',
    selectionTone: 'Version / tone',
    addToBag: 'Add to Bag',
    backGrid: 'Back to Catalog',
    inventory: 'Inventory',
    emptyCart: 'Your inventory is empty',
    browse: 'Start Browsing',
    totalBill: 'Total Bill',
    finalize: 'Finalize Order',
    secure: 'Secure',
    logistic: 'Logistics',
    fast: 'Mexico-Wide Delivery',
    sustainable: 'Premium Quality',
    identityName: 'Full Identity Name',
    phone: 'Contact Number (+)',
    address: 'Delivery Address & Notes',
    online: 'Operators Online',
    disclaimer: 'Orders are processed via WhatsApp. Guaranteed delivery in all Mexico.',
    items: 'Items',
    orderMsg: 'NEW JERSEY ORDER',
  }
};

// --- Main App ---
export default function App() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [view, setView] = useState<'catalog' | 'details' | 'summary'>('catalog');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(SIZE_CHART[1]);

  const t = I18N[lang];

  useEffect(() => {
    const savedCart = localStorage.getItem('jersey_cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jersey_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = () => {
    if (!selectedProduct) return;
    const existingIdx = cart.findIndex(i => i.id === selectedProduct.id && i.selectedSize === selectedSize.id);
    if (existingIdx !== -1) {
      const newCart = [...cart];
      newCart[existingIdx].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { ...selectedProduct, selectedSize: selectedSize.id, sizeMeasures: selectedSize.measures, selectedColor: 'Local', quantity: 1 }]);
    }
    setView('summary');
  };

  const removeFromCart = (idx: number) => setCart(cart.filter((_, i) => i !== idx));
  const updateQty = (idx: number, delta: number) => {
    const newCart = [...cart];
    newCart[idx].quantity = Math.max(1, newCart[idx].quantity + delta);
    setCart(newCart);
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const bgClass = theme === 'dark' ? 'bg-slate-950 text-slate-50' : 'bg-slate-50 text-slate-950';
  const cardClass = theme === 'dark' ? 'bg-slate-900/40 border-white/5' : 'bg-white border-slate-200 shadow-sm';

  return (
    <div className={`min-h-screen font-sans ${bgClass} overflow-x-hidden pt-24 pb-12 transition-colors duration-500`}>
      {/* Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors ${theme === 'dark' ? 'bg-slate-950/80 border-white/5' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => setView('catalog')} className="flex items-center gap-3">
            <div className="w-10 h-10 accent-gradient rounded-xl flex items-center justify-center font-black text-white italic shadow-lg overflow-hidden">
              <ShoppingBag className="w-6 h-6 border-b-2 border-white/20 pb-0.5" />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase font-display">
              AIKO'S <span className="text-red-600 font-light italic">T-SHIRT SHOP</span>
            </h1>
          </button>

          <div className="flex items-center gap-3">
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="p-2 hover:bg-indigo-500/10 rounded-xl transition flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-500">
              <Globe className="w-4 h-4" /> {lang.toUpperCase()}
            </button>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 hover:bg-slate-500/10 rounded-xl transition">
              {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-indigo-500" />}
            </button>
            <button onClick={() => setView('summary')} className="relative p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
              <ShoppingBag className="w-5 h-5 text-indigo-500" />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 accent-gradient rounded-full text-[10px] font-black flex items-center justify-center shadow-lg">{cart.length}</span>}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {view === 'catalog' && (
            <motion.div key="catalog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
              <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 p-10 rounded-[3rem] border transition-colors ${cardClass}`}>
                <div className="max-w-xl">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-4 block italic">{t.heroSub}</span>
                  <h2 className="text-5xl md:text-6xl font-black uppercase font-display leading-[0.9] tracking-tighter mb-6" dangerouslySetInnerHTML={{ __html: t.heroTitle }} />
                  <p className="text-slate-400 text-lg font-medium leading-relaxed">{t.heroDesc}</p>
                  <div className="mt-8 flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-2xl border border-emerald-500/20 w-fit">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{t.shipping}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PRODUCTS.map(p => (
                  <motion.div key={p.id} whileHover={{ y: -8 }} onClick={() => { setSelectedProduct(p); setView('details'); }} className={`rounded-[2.5rem] border overflow-hidden cursor-pointer group transition-all ${cardClass}`}>
                    <div className="aspect-[4/5] relative overflow-hidden bg-slate-800">
                      <img src={p.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" referrerPolicy="no-referrer" />
                      <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-slate-950 via-transparent flex justify-between items-end">
                        <div>
                          <p className="text-lg font-black uppercase tracking-tighter leading-none mb-1 text-white">{p.name[lang]}</p>
                          <p className="text-indigo-400 font-bold text-sm tracking-widest uppercase italic">${p.price}</p>
                        </div>
                        <div className="w-12 h-12 accent-gradient rounded-2xl flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform">
                          <Plus className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'details' && selectedProduct && (
            <motion.div key="details" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="col-span-12">
                <button onClick={() => setView('catalog')} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-500 transition">
                  <ArrowLeft className="w-4 h-4" /> {t.backGrid}
                </button>
              </div>

              <div className={`col-span-12 lg:col-span-7 rounded-[3rem] border overflow-hidden relative ${cardClass} aspect-[4/5]`}>
                <AnimatePresence mode="wait">
                  <motion.img key={currentImageIndex} src={selectedProduct.images[currentImageIndex]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full object-cover" />
                </AnimatePresence>
                <div className="absolute inset-x-8 bottom-8 flex gap-3">
                  {selectedProduct.images.map((img, idx) => (
                    <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`w-16 h-16 rounded-2xl border-2 transition-all ${idx === currentImageIndex ? 'border-indigo-500 scale-110 shadow-lg shadow-indigo-500/20' : 'border-white/10 opacity-50 hover:opacity-100'}`}>
                      <img src={img} className="w-full h-full object-cover rounded-xl" />
                    </button>
                  ))}
                </div>
              </div>

              <div className={`col-span-12 lg:col-span-5 rounded-[3rem] border p-10 flex flex-col justify-between ${cardClass}`}>
                <div className="space-y-6">
                  <h3 className="text-4xl font-black uppercase leading-tight font-display tracking-tighter">{selectedProduct.name[lang]}</h3>
                  <p className="text-3xl font-light text-indigo-500 italic">${selectedProduct.price}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{selectedProduct.description[lang]}</p>
                  
                  <div className="bg-indigo-500/5 p-4 rounded-2xl border border-indigo-500/10 flex items-center gap-3">
                    <Info className="w-5 h-5 text-indigo-500" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">{t.shipping}</p>
                  </div>

                  <div className="space-y-8 mt-10">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500 italic">{t.selectionSize}</label>
                        <span className="text-[9px] font-black text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded-full">{selectedSize.measures}</span>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        {SIZE_CHART.map(s => (
                          <button key={s.id} onClick={() => setSelectedSize(s)} className={`h-12 rounded-xl border font-black text-xs transition-all ${selectedSize.id === s.id ? 'accent-gradient border-transparent text-white shadow-xl shadow-indigo-500/30' : 'border-white/10 hover:bg-white/5'}`}>{s.label}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <motion.button whileTap={{ scale: 0.95 }} onClick={addToCart} className="w-full h-20 rounded-[2.5rem] accent-gradient text-white font-black uppercase text-xs tracking-widest shadow-2xl transition-transform mt-12 flex items-center justify-center gap-3">
                  <ShoppingCart className="w-5 h-5" /> {t.addToBag}
                </motion.button>
              </div>
            </motion.div>
          )}

          {view === 'summary' && (
            <motion.div key="summary" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="col-span-12">
                <button onClick={() => setView('catalog')} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition">
                  <ArrowLeft className="w-4 h-4" /> {t.backGrid}
                </button>
              </div>

              <div className="col-span-12 lg:col-span-8 space-y-6">
                <div className={`rounded-[3rem] border p-10 ${cardClass}`}>
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-10 font-display">{t.inventory} <span className="text-indigo-500 font-light">MEX-JERSEY</span></h3>
                  
                  {cart.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center opacity-20 gap-4">
                      <ShoppingBag className="w-20 h-20" />
                      <p className="text-[10px] font-black uppercase tracking-[0.4em]">{t.emptyCart}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item, idx) => (
                        <motion.div key={`${item.id}-${item.selectedSize}`} layout className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white/5 border border-white/5 rounded-[2.5rem]">
                          <img src={item.images[0]} className="w-24 h-24 rounded-3xl object-cover border border-white/10" />
                          <div className="flex-1 text-center sm:text-left">
                            <h4 className="text-lg font-black uppercase tracking-tight mb-2">{item.name[lang]}</h4>
                            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[9px] font-black uppercase rounded-full border border-indigo-400/20">{item.selectedSize} ({item.sizeMeasures})</span>
                            </div>
                            <p className="text-2xl font-black font-display tracking-tight">${item.price}</p>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                             <div className="flex items-center bg-slate-950 border border-white/10 rounded-2xl px-4 py-2">
                               <button onClick={() => updateQty(idx, -1)} className="p-2 hover:text-indigo-400"><Minus className="w-4 h-4 text-white" /></button>
                               <span className="w-10 text-center font-black font-display text-white">{item.quantity}</span>
                               <button onClick={() => updateQty(idx, 1)} className="p-2 hover:text-indigo-400"><Plus className="w-4 h-4 text-white" /></button>
                             </div>
                             <button onClick={() => removeFromCart(idx)} className="text-[9px] font-black uppercase tracking-widest text-red-500/40 hover:text-red-500">Eliminar</button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: ShieldCheck, title: t.secure, desc: 'SSL + WhatsApp' },
                    { icon: Truck, title: t.logistic, desc: t.fast },
                    { icon: Package, title: t.sustainable, desc: 'Original Fit' }
                  ].map((f, i) => (
                    <div key={i} className={`rounded-3xl border p-6 flex flex-col items-center text-center gap-3 ${cardClass}`}>
                      <f.icon className="w-6 h-6 text-indigo-400" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">{f.title}</p>
                        <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-12 lg:col-span-4 h-full">
                <div className={`rounded-[3rem] border p-10 h-full flex flex-col ${cardClass}`}>
                   <h3 className="text-xl font-black uppercase tracking-widest mb-10 font-display italic">CHECKOUT <span className="text-indigo-500 font-light">EXHIBIT</span></h3>
                   
                   <div className="space-y-4 mb-10 text-sm font-bold uppercase tracking-tight">
                     <div className="flex justify-between items-center text-slate-500">
                       <span className="text-[10px] italic">Subtotal</span>
                       <span>${totalPrice.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between items-center text-emerald-400">
                       <span className="text-[10px] italic">Envío México</span>
                       <span>$0.00</span>
                     </div>
                     <div className="h-px bg-white/10 my-4" />
                     <div className="flex justify-between items-end">
                       <span className="text-[10px] font-black uppercase text-indigo-500 italic">{t.totalBill}</span>
                       <span className="text-4xl font-black font-display tracking-tighter leading-none text-indigo-500 animate-pulse">
                         ${totalPrice.toFixed(2)}
                       </span>
                     </div>
                   </div>

                   <CheckoutForm cart={cart} totalPrice={totalPrice} lang={lang} t={t} />
                   
                   <div className="mt-auto pt-8 border-t border-white/5 text-center space-y-4">
                     <div className="flex items-center justify-center gap-2 text-emerald-400">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        <span className="text-[9px] font-black uppercase tracking-widest">{t.online}</span>
                     </div>
                     <p className="text-[8px] text-slate-500 font-black uppercase leading-relaxed tracking-wider">{t.disclaimer}</p>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <div className="fixed top-0 -translate-y-1/2 left-0 w-[60vw] h-[60vw] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />
    </div>
  );
}

function CheckoutForm({ cart, totalPrice, lang, t }: { cart: CartItem[], totalPrice: number, lang: 'es' | 'en', t: any }) {
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  const sendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    let message = `*NUEVO PEDIDO - AIKO'S SHOP*\n\n`;
    message += `👤 *Client:* ${formData.name}\n`;
    message += `📞 *Phone:* ${formData.phone}\n`;
    message += `📍 *Dirección:* ${formData.address}\n\n`;
    message += `🛒 *Inventory:*\n`;
    
    cart.forEach(item => {
      message += `• ${item.quantity}x ${item.name[lang]} (${item.selectedSize}) - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\n💰 *TOTAL: $${totalPrice.toFixed(2)} MXN*`;
    message += `\n\n🚚 _${t.shipping}_`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <form onSubmit={sendWhatsApp} className="space-y-4 flex-1 flex flex-col">
      <input required type="text" placeholder={t.identityName} className="w-full bg-indigo-500/5 border border-indigo-500/10 h-16 px-6 rounded-3xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
      <input required type="tel" placeholder={t.phone} className="w-full bg-indigo-500/5 border border-indigo-500/10 h-16 px-6 rounded-3xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
      <textarea required placeholder={t.address} className="w-full bg-indigo-500/5 border border-indigo-500/10 p-6 rounded-[2rem] h-32 text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={cart.length === 0} className="w-full h-20 rounded-[2.5rem] accent-gradient text-white font-black uppercase text-xs tracking-[0.2em] shadow-xl flex items-center justify-center gap-3 disabled:opacity-20 mt-6">
        <Send className="w-5 h-5" /> {t.finalize}
      </motion.button>
    </form>
  );
}
