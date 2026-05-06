import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingCart, X, Plus, Minus, Send, Check,
  ChevronLeft, ChevronRight, Star, ArrowLeft,
  ShoppingBag, Package, Truck, ShieldCheck,
  Globe, Sun, Moon, Info,
  Instagram, Facebook, MessageCircle, Mail, MapPin
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
const CONTACT_EMAIL = "sportivatotalmx@gmail.com";

const I18N = {
  es: {
    catalog: 'Catálogo',
    about: 'Nosotros',
    contact: 'Contacto',
    exhibit: 'COLECCIÓN PRO',
    heroSub: 'Disciplina. Pasión. Gloria.',
    heroTitle: 'EQUIPAMIENTO DE <span class="gold-text-gradient font-black">ÉLITE</span>',
    heroDesc: 'Descubre Sportiva Total MX. Rendimiento superior y diseños icónicos del fútbol mundial forjados en oro.',
    shipping: 'ENVIOS A TODO MÉXICO',
    selectionSize: 'SELECCIÓN: TALLA PROFESIONAL',
    selectionTone: 'VERSIÓN / ACABADO',
    addToBag: 'Adquirir Ahora',
    backGrid: 'Volver a la Galería',
    inventory: 'TU SELECCIÓN',
    emptyCart: 'No has seleccionado equipamiento',
    browse: 'Explorar Galería',
    totalBill: 'Inversión Total',
    finalize: 'Finalizar Pedido',
    secure: 'Seguro',
    logistic: 'Logística Pro',
    fast: 'Logística en todo México',
    sustainable: 'Calidad Premium Elite',
    identityName: 'Nombre del Atleta / Cliente',
    phone: 'Contacto WhatsApp (+)',
    address: 'Dirección de Entrega Estratégica',
    online: 'Asistencia en Tiempo Real',
    disclaimer: 'Gestión exclusiva vía WhatsApp. Entregas tácticas en todo México.',
    items: 'Unidades',
    orderMsg: 'NUEVA ORDEN DE EQUIPAMIENTO ELITE - SPORTIVA TOTAL MX',
    contactInfo: 'Contacto',
    social: 'Redes Sociales',
    rights: 'Todos los derechos reservados.',
  },
  en: {
    catalog: 'Catalog',
    about: 'Our Story',
    contact: 'Contact',
    exhibit: 'PRO COLLECTION',
    heroSub: 'Discipline. Passion. Glory.',
    heroTitle: 'ELITE <span class="gold-text-gradient font-black">GEAR</span> EXHIBIT',
    heroDesc: 'Discover Sportiva Total MX. Superior performance and iconic world football designs curated for you.',
    shipping: 'FAST MEXICO-WIDE LOGISTICS',
    selectionSize: 'SELECTION: PRO SIZE (CHEST)',
    selectionTone: 'VERSION / FINISH',
    addToBag: 'Acquire Now',
    backGrid: 'Back to Gallery',
    inventory: 'YOUR SELECTION',
    emptyCart: 'No gear selected yet',
    browse: 'Browse Gallery',
    totalBill: 'Total Investment',
    finalize: 'Finalize Order',
    secure: 'Secure',
    logistic: 'Pro Logistics',
    fast: 'Mexico-Wide Logistics',
    sustainable: 'Elite Premium Quality',
    identityName: 'Athlete / Client Name',
    phone: 'WhatsApp Contact (+)',
    address: 'Strategic Delivery Address',
    online: 'Real-time Assistance',
    disclaimer: 'Exclusive management via WhatsApp. Tactical deliveries across Mexico.',
    items: 'Units',
    orderMsg: 'NEW ELITE GEAR ORDER - SPORTIVA TOTAL MX',
    contactInfo: 'Contact',
    social: 'Social Media',
    rights: 'All rights reserved.',
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

  const bgClass = theme === 'dark' ? 'bg-[#0A0A0A] text-[#F5F5F5]' : 'bg-[#F2F2F2] text-[#0A0A0A]';
  const cardClass = theme === 'dark' ? 'bento-card' : 'bento-card bg-white border-slate-200 shadow-sm';

  return (
    <div className={`min-h-screen font-sans ${bgClass} overflow-x-hidden pt-24 pb-12 transition-colors duration-500`}>
      {/* Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors ${theme === 'dark' ? 'bg-[#0A0A0A]/80 border-white/5' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => setView('catalog')} className="flex items-center gap-4 group">
            <div className="w-12 h-12 gold-fill rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 overflow-hidden">
              <img src="/19080.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <h1 className="text-lg font-black tracking-tighter uppercase font-display leading-none">
                SPORTIVA <span className="gold-text-gradient italic">TOTAL MX</span>
              </h1>
              <p className="text-[8px] font-bold tracking-[0.3em] text-slate-500 uppercase mt-1 leading-none">{t.heroSub}</p>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="p-2 hover:bg-[#D4AF37]/10 rounded-xl transition flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">
              <Globe className="w-4 h-4" /> {lang.toUpperCase()}
            </button>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 hover:bg-slate-500/10 rounded-xl transition">
              {theme === 'dark' ? <Sun className="w-5 h-5 text-[#D4AF37]" /> : <Moon className="w-5 h-5 text-[#191970]" />}
            </button>
            <button onClick={() => setView('summary')} className="relative p-3 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl transition-all hover:bg-[#D4AF37]/10">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 gold-fill rounded-full text-[10px] font-black flex items-center justify-center shadow-lg border-2 border-[#0A0A0A]">{cart.length}</span>}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {view === 'catalog' && (
            <motion.div key="catalog" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-10">
              <div className={`flex flex-col md:flex-row md:items-center justify-between gap-8 p-12 rounded-[3.5rem] border transition-all ${cardClass} relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[100px] rounded-full -z-10" />
                <div className="max-w-2xl">
                  <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#D4AF37] mb-6 block italic">{t.heroSub}</span>
                  <h2 className="text-6xl md:text-7xl font-black uppercase font-display leading-[0.85] tracking-tighter mb-8" dangerouslySetInnerHTML={{ __html: t.heroTitle }} />
                  <p className="text-[#B0B0B0] text-xl font-medium leading-relaxed max-w-lg">{t.heroDesc}</p>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <div className="flex items-center gap-3 bg-[#0F3D2E]/20 text-[#22c55e] px-6 py-3 rounded-2xl border border-[#0F3D2E]/40 w-fit">
                      <Truck className="w-5 h-5" />
                      <span className="text-[11px] font-black uppercase tracking-widest">{t.shipping}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-[#5A1A1A]/20 text-[#ef4444] px-6 py-3 rounded-2xl border border-[#5A1A1A]/40 w-fit">
                      <ShieldCheck className="w-5 h-5" />
                      <span className="text-[11px] font-black uppercase tracking-widest">{t.sustainable}</span>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block w-72 h-72 border border-[#D4AF37]/20 rounded-full flex items-center justify-center relative">
                   <div className="w-64 h-64 border border-[#D4AF37]/40 rounded-full flex items-center justify-center">
                      <div className="w-56 h-56 gold-fill rounded-full flex items-center justify-center opacity-10 animate-pulse" />
                   </div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Star className="w-16 h-16 text-[#D4AF37] blur-sm animate-pulse" />
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.map(p => (
                  <motion.div key={p.id} whileHover={{ y: -12 }} onClick={() => { setSelectedProduct(p); setView('details'); }} className={`rounded-[3rem] border overflow-hidden cursor-pointer group transition-all duration-500 ${cardClass}`}>
                    <div className="aspect-[4/5] relative overflow-hidden bg-[#1A1A1A]">
                      <img src={p.images[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
                      <div className="absolute inset-x-0 bottom-0 p-10 flex justify-between items-end">
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#D4AF37] mb-2">{t.exhibit}</p>
                          <h4 className="text-2xl font-black uppercase tracking-tighter leading-none mb-1 text-[#F5F5F5]">{p.name[lang]}</h4>
                          <p className="text-[#B0B0B0] font-bold text-lg tracking-tight italic mt-2">${p.price}</p>
                        </div>
                        <div className="w-14 h-14 gold-fill rounded-2xl flex items-center justify-center text-[#0A0A0A] scale-75 group-hover:scale-100 transition-all shadow-2xl">
                          <Plus className="w-8 h-8" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'details' && selectedProduct && (
            <motion.div key="details" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
              <div className="col-span-12">
                <button onClick={() => setView('catalog')} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-[#D4AF37] transition-all group">
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" /> {t.backGrid}
                </button>
              </div>

              <div className={`col-span-12 lg:col-span-7 rounded-[4rem] border overflow-hidden relative ${cardClass} aspect-[4/5] lg:aspect-auto`}>
                <AnimatePresence mode="wait">
                  <motion.img key={currentImageIndex} src={selectedProduct.images[currentImageIndex]} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.6 }} className="w-full h-full object-cover" />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/20 to-[#0A0A0A]/80 pointer-events-none" />
                <div className="absolute bottom-10 left-10 flex gap-4">
                  {selectedProduct.images.map((img, idx) => (
                    <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`w-20 h-20 rounded-2xl border-2 overflow-hidden transition-all duration-500 ${idx === currentImageIndex ? 'border-[#D4AF37] scale-110 shadow-2xl shadow-[#D4AF37]/30' : 'border-white/10 opacity-40 hover:opacity-100'}`}>
                      <img src={img} className="w-full h-full object-cover rounded-xl" />
                    </button>
                  ))}
                </div>
              </div>

              <div className={`col-span-12 lg:col-span-5 rounded-[4rem] border p-12 lg:p-16 flex flex-col justify-between ${cardClass}`}>
                <div className="space-y-10">
                  <div className="space-y-4">
                    <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#D4AF37] italic">{t.heroSub}</span>
                    <h3 className="text-5xl lg:text-6xl font-black uppercase leading-[0.9] font-display tracking-tighter">{selectedProduct.name[lang]}</h3>
                    <p className="text-4xl font-light gold-text-gradient animate-pulse italic mt-6 tracking-tighter">${selectedProduct.price}</p>
                  </div>
                  
                  <p className="text-[#B0B0B0] text-lg leading-relaxed font-medium">{selectedProduct.description[lang]}</p>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-[#0F3D2E]/20 px-4 py-2 rounded-xl border border-[#0F3D2E]/30 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#22c55e] rounded-full" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#22c55e]">{t.shipping}</span>
                    </div>
                  </div>

                  <div className="space-y-10 pt-6">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <label className="text-[11px] uppercase tracking-[0.4em] font-black text-slate-500 italic">{t.selectionSize}</label>
                        <span className="text-[11px] font-black text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/20">{selectedSize.measures}</span>
                      </div>
                      <div className="grid grid-cols-5 gap-3">
                        {SIZE_CHART.map(s => (
                          <button key={s.id} onClick={() => setSelectedSize(s)} className={`h-16 rounded-2xl border font-black text-[11px] tracking-widest transition-all duration-500 ${selectedSize.id === s.id ? 'gold-fill border-transparent text-[#0A0A0A] shadow-2xl' : 'border-white/10 hover:bg-white/5 text-slate-400'}`}>{s.label}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={addToCart} className="w-full h-24 rounded-[3rem] gold-fill text-[#0A0A0A] font-black uppercase text-sm tracking-[0.3em] shadow-2xl transition-all mt-16 flex items-center justify-center gap-4">
                  <ShoppingCart className="w-6 h-6" /> {t.addToBag}
                </motion.button>
              </div>
            </motion.div>
          )}

          {view === 'summary' && (
            <motion.div key="summary" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="col-span-12">
                <button onClick={() => setView('catalog')} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all group">
                   <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" /> {t.backGrid}
                </button>
              </div>

              <div className="col-span-12 lg:col-span-8 space-y-8">
                <div className={`rounded-[4rem] border p-12 ${cardClass}`}>
                  <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-12 font-display">{t.inventory} <span className="gold-text-gradient font-light">LIMITED EDITION</span></h3>
                  
                  {cart.length === 0 ? (
                    <div className="py-24 flex flex-col items-center justify-center opacity-20 gap-8">
                      <ShoppingBag className="w-32 h-32 stroke-[0.5px]" />
                      <p className="text-[12px] font-black uppercase tracking-[0.6em]">{t.emptyCart}</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {cart.map((item, idx) => (
                        <motion.div key={`${item.id}-${item.selectedSize}`} layout className="flex flex-col sm:flex-row items-center gap-8 p-8 bg-white/5 border border-white/5 rounded-[3.5rem] group hover:border-[#D4AF37]/20 transition-all duration-700">
                          <img src={item.images[0]} className="w-32 h-32 rounded-[2.5rem] object-cover border border-white/10 group-hover:scale-105 transition-transform" />
                          <div className="flex-1 text-center sm:text-left space-y-3">
                            <h4 className="text-2xl font-black uppercase tracking-tight text-[#F5F5F5]">{item.name[lang]}</h4>
                            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                              <span className="px-4 py-1.5 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-black uppercase rounded-full border border-[#D4AF37]/20">{item.selectedSize} — {item.sizeMeasures}</span>
                            </div>
                            <p className="text-3xl font-black font-display tracking-tight text-white">${item.price}</p>
                          </div>
                          <div className="flex flex-col items-center gap-4">
                             <div className="flex items-center bg-[#0A0A0A] border border-white/10 rounded-3xl px-6 py-3">
                               <button onClick={() => updateQty(idx, -1)} className="p-3 text-slate-500 hover:text-[#D4AF37] transition-colors"><Minus className="w-5 h-5" /></button>
                               <span className="w-12 text-center text-xl font-black font-display text-white">{item.quantity}</span>
                               <button onClick={() => updateQty(idx, 1)} className="p-3 text-slate-500 hover:text-[#D4AF37] transition-colors"><Plus className="w-5 h-5" /></button>
                             </div>
                             <button onClick={() => removeFromCart(idx)} className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500/40 hover:text-red-500 transition-colors">REMOVE UNIT</button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: ShieldCheck, title: t.secure, desc: 'TACTICAL PROTECTION' },
                    { icon: Truck, title: t.logistic, desc: t.fast },
                    { icon: Package, title: t.sustainable, desc: 'ELITE SELECTION' }
                  ].map((f, i) => (
                    <div key={i} className={`rounded-[2.5rem] border p-8 flex flex-col items-center text-center gap-4 transition-all duration-500 hover:-translate-y-2 ${cardClass}`}>
                      <f.icon className="w-8 h-8 text-[#D4AF37]" />
                      <div className="space-y-1">
                        <p className="text-[11px] font-black uppercase tracking-[0.4em]">{f.title}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-12 lg:col-span-4 h-full">
                <div className={`rounded-[4rem] border p-12 h-full flex flex-col ${cardClass}`}>
                   <h3 className="text-2xl font-black uppercase tracking-[0.3em] mb-12 font-display italic text-center">CHECKOUT <span className="gold-text-gradient font-light">ELITE</span></h3>
                   
                   <div className="space-y-6 mb-12 text-[11px] font-black uppercase tracking-[0.2em]">
                     <div className="flex justify-between items-center text-slate-500 italic">
                       <span>SUBTOTAL GESTIÓN</span>
                       <span>${totalPrice.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between items-center text-[#22c55e] italic">
                       <span>LOGÍSTICA MX PRO</span>
                       <span>FREE</span>
                     </div>
                     <div className="h-px bg-white/5 my-6" />
                     <div className="flex justify-between items-end">
                       <span className="text-[#D4AF37] italic tracking-[0.4em]">{t.totalBill}</span>
                       <span className="text-5xl font-black font-display tracking-tighter leading-none gold-text-gradient animate-pulse">
                         ${totalPrice.toFixed(2)}
                       </span>
                     </div>
                   </div>

                   <CheckoutForm cart={cart} totalPrice={totalPrice} lang={lang} t={t} />
                   
                   <div className="mt-auto pt-10 border-t border-white/5 text-center space-y-6">
                     <div className="flex items-center justify-center gap-3 text-emerald-400">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                        <span className="text-[11px] font-black uppercase tracking-[0.5em]">{t.online}</span>
                     </div>
                     <p className="text-[9px] text-[#B0B0B0] font-bold uppercase leading-relaxed tracking-[0.2em]">{t.disclaimer}</p>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer lang={lang} theme={theme} />

      {/* Luxury Decorative Background */}
      <div className="fixed top-0 -translate-y-1/2 left-0 w-[50vw] h-[50vw] bg-[#D4AF37]/5 blur-[180px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 translate-y-1/2 right-0 w-[40vw] h-[40vw] bg-[#5A1A1A]/5 blur-[150px] rounded-full pointer-events-none -z-10" />
    </div>
  );
}

function Footer({ lang, theme }: { lang: 'es' | 'en'; theme: 'dark' | 'light' }) {
  const t = I18N[lang];
  const cardBase = theme === 'dark'
    ? 'bento-card'
    : 'bento-card bg-white border-slate-200 shadow-sm';
  const textMuted = theme === 'dark' ? 'text-[#B0B0B0]' : 'text-slate-500';
  const textMain  = theme === 'dark' ? 'text-white'     : 'text-slate-900';
  const divider   = theme === 'dark' ? 'border-white/5' : 'border-slate-100';
  const socialBtn = theme === 'dark'
    ? 'border-white/10 hover:border-[#D4AF37]/60'
    : 'border-slate-200 hover:border-[#D4AF37]/60';

  return (
    <footer className="w-full px-4 pb-10 pt-2 max-w-7xl mx-auto">
      <div className={`${cardBase} p-8 md:p-12`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="space-y-3">
            <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${textMuted}`}>SPORTIVA</p>
            <h2 className="text-3xl font-black font-display uppercase leading-none">
              <span className="gold-text-gradient">TOTAL MX</span>
            </h2>
            <p className={`text-xs font-bold uppercase tracking-widest ${textMuted}`}>{t.heroSub}</p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${textMuted}`}>{t.contactInfo}</p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className={`text-xs font-bold ${textMain} group-hover:text-[#D4AF37] transition-colors`}>
                {WHATSAPP_NUMBER}
              </span>
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 group">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className={`text-xs font-bold ${textMain} group-hover:text-[#D4AF37] transition-colors`}>
                {CONTACT_EMAIL}
              </span>
            </a>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className={`text-xs font-bold ${textMain}`}>México</span>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${textMuted}`}>{t.social}</p>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className={`w-10 h-10 rounded-2xl border ${socialBtn} flex items-center justify-center transition-all group`}
              >
                <Instagram className={`w-5 h-5 ${textMuted} group-hover:text-[#D4AF37] transition-colors`} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className={`w-10 h-10 rounded-2xl border ${socialBtn} flex items-center justify-center transition-all group`}
              >
                <Facebook className={`w-5 h-5 ${textMuted} group-hover:text-[#D4AF37] transition-colors`} />
              </a>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className={`mt-10 pt-6 border-t ${divider} flex flex-col md:flex-row items-center justify-between gap-3`}>
          <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${textMuted}`}>
            © {new Date().getFullYear()} Sportiva Total MX &middot; {t.rights}
          </p>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] gold-text-gradient">
            {t.heroSub}
          </p>
        </div>
      </div>
    </footer>
  );
}

function CheckoutForm({ cart, totalPrice, lang, t }: { cart: CartItem[], totalPrice: number, lang: 'es' | 'en', t: any }) {
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  const sendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    let message = `*${t.orderMsg}*\n\n`;
    message += `👤 *ATLETA/CLIENTE:* ${formData.name}\n`;
    message += `📞 *WHATSAPP:* ${formData.phone}\n`;
    message += `📍 *LOGÍSTICA:* ${formData.address}\n\n`;
    message += `🏟️ *EQUIPAMIENTO SELECCIONADO:*\n`;
    
    cart.forEach(item => {
      message += `• ${item.quantity}x ${item.name[lang]} (${item.selectedSize}) - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\n💰 *INVERSIÓN TOTAL: $${totalPrice.toFixed(2)} MXN*`;
    message += `\n\n🚚 _${t.shipping}_`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const inputStyle = "w-full bg-[#0A0A0A] border border-white/5 h-20 px-8 rounded-[2rem] text-sm font-bold focus:ring-2 focus:ring-[#D4AF37] transition-all outline-none placeholder:text-slate-700 placeholder:italic placeholder:font-normal";

  return (
    <form onSubmit={sendWhatsApp} className="space-y-6 flex-1 flex flex-col pt-4">
      <input required type="text" placeholder={t.identityName} className={inputStyle} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
      <input required type="tel" placeholder={t.phone} className={inputStyle} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
      <textarea required placeholder={t.address} className={`${inputStyle} h-40 p-8 resize-none`} value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={cart.length === 0} className="w-full h-24 rounded-[3rem] gold-fill text-[#0A0A0A] font-black uppercase text-sm tracking-[0.4em] shadow-[0_20px_50px_rgba(212,175,55,0.2)] flex items-center justify-center gap-4 disabled:opacity-20 mt-10">
        <Send className="w-6 h-6" /> {t.finalize}
      </motion.button>
    </form>
  );
}
