import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Camera,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { COMBOS, FAQS, PRODUCTS, TESTIMONIALS, WHATSAPP_PHONE, type Product } from './data/products';
import { ThreeHeroCanvas } from './components/ThreeHeroCanvas';
import { ThreeProductStage } from './components/ThreeProductStage';
import './index.css';

const money = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const whatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [cartOpen, setCartOpen] = useState(false);

  const categories = ['Todos', ...Array.from(new Set(PRODUCTS.map((product) => product.category)))];
  const filteredProducts = activeCategory === 'Todos'
    ? PRODUCTS
    : PRODUCTS.filter((product) => product.category === activeCategory);

  const cartItems = useMemo(
    () => PRODUCTS.filter((product) => cart[product.id]).map((product) => ({ product, quantity: cart[product.id] })),
    [cart],
  );
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const addToCart = (product: Product) => {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] || 0) + 1 }));
    setCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((current) => {
      const next = Math.max(0, (current[id] || 0) + delta);
      const copy = { ...current };
      if (next === 0) delete copy[id];
      else copy[id] = next;
      return copy;
    });
  };

  const celebrateAndOrder = (message: string) => {
    confetti({ particleCount: 80, spread: 65, origin: { y: 0.75 }, colors: ['#f59e0b', '#fef3c7', '#92400e'] });
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#0d0a08] text-[#f8ede3]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#0d0a08]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#inicio" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-orange-700 text-2xl shadow-lg shadow-amber-900/30">🥐</span>
            <span className="leading-none"><strong className="block font-display text-xl tracking-wide text-amber-100">Luís</strong><small className="text-[10px] font-bold uppercase tracking-[.27em] text-amber-500">salgados artesanais</small></span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-stone-300 md:flex">
            <a className="transition hover:text-amber-400" href="#cardapio">Cardápio</a>
            <a className="transition hover:text-amber-400" href="#combos">Combos & festas</a>
            <a className="transition hover:text-amber-400" href="#historia">Nossa história</a>
            <a className="transition hover:text-amber-400" href="#duvidas">Dúvidas</a>
          </nav>
          <div className="flex items-center gap-3">
            <button aria-label="Abrir carrinho" onClick={() => setCartOpen(true)} className="relative rounded-full border border-amber-500/25 p-3 text-amber-200 transition hover:border-amber-400 hover:bg-amber-500/10">
              <ShoppingBag size={19} />
              {cartCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-amber-500 px-1 text-[10px] font-black text-black">{cartCount}</span>}
            </button>
            <button aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)} className="rounded-full border border-white/10 p-3 md:hidden"><Menu size={19} /></button>
            <a href="#cardapio" className="hidden rounded-full bg-amber-500 px-5 py-3 text-sm font-extrabold text-stone-950 shadow-lg shadow-amber-900/30 transition hover:-translate-y-0.5 hover:bg-amber-400 sm:block">Pedir agora</a>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-white/5 px-5 py-4 md:hidden">
            {['cardapio', 'combos', 'historia', 'duvidas'].map((id, index) => <a key={id} onClick={() => setMenuOpen(false)} href={`#${id}`} className="block py-3 font-semibold text-stone-300">{['Cardápio', 'Combos & festas', 'Nossa história', 'Dúvidas'][index]}</a>)}
          </motion.nav>}
        </AnimatePresence>
      </header>

      <main>
        <section id="inicio" className="relative isolate flex min-h-[760px] items-center pt-20">
          <ThreeHeroCanvas />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_42%,rgba(180,83,9,.20),transparent_35%),linear-gradient(115deg,#0d0a08_15%,rgba(13,10,8,.8)_50%,#0d0a08_100%)]" />
          <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="relative z-10">
              <div className="gold-badge mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[.16em] text-amber-300"><Sparkles size={14} /> Alta gastronomia, feita em casa</div>
              <h1 className="max-w-3xl font-display text-5xl font-black leading-[.98] tracking-tight text-amber-50 sm:text-7xl">O sabor que transforma <em className="gold-gradient-text">qualquer momento</em> em ocasião especial.</h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-stone-300">Salgados artesanais assados na hora, com massa amanteigada e recheio de verdade. Crocância, afeto e aquele cheirinho de forno chegando até você.</p>
              <div className="mt-9 flex flex-wrap gap-4"><a href="#cardapio" className="glow-btn inline-flex items-center gap-2 rounded-full px-7 py-4 font-extrabold text-stone-950">Conhecer o cardápio <ArrowRight size={18} /></a><a href="#historia" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 font-bold text-stone-200 transition hover:border-amber-500/50 hover:text-amber-300">Nossa história</a></div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-stone-400"><span className="flex items-center gap-2"><Check size={16} className="text-amber-500" /> Feito artesanalmente</span><span className="flex items-center gap-2"><Check size={16} className="text-amber-500" /> Entrega quentinha</span><span className="flex items-center gap-2"><Check size={16} className="text-amber-500" /> Ingredientes nobres</span></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .15 }} className="relative mx-auto h-[460px] w-full max-w-[560px] lg:h-[580px]">
              <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />
              <div className="absolute inset-0 z-10"><ThreeProductStage imageSrc={PRODUCTS[0].image} /></div>
              <img src={PRODUCTS[0].image} alt="Croissant artesanal recheado" className="hero-food absolute left-1/2 top-[40%] z-20 w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-[42%] object-cover shadow-2xl shadow-black/60" />
              <div className="absolute bottom-5 left-1/2 z-30 w-64 -translate-x-1/2 rounded-2xl border border-amber-300/20 bg-[#21160f]/85 p-4 text-center backdrop-blur-xl"><p className="text-xs font-bold uppercase tracking-[.22em] text-amber-400">O queridinho da casa</p><p className="mt-1 font-display text-xl text-amber-50">Croissant Folhado Clássico</p></div>
            </motion.div>
          </div>
          <a href="#cardapio" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-stone-500 md:flex">Role para explorar <ChevronDown size={16} /></a>
        </section>

        <section className="border-y border-white/5 bg-[#130e0b] py-6"><div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-12 gap-y-4 px-5 text-sm font-semibold text-stone-400 lg:justify-between lg:px-8"><span className="flex items-center gap-3"><Clock3 className="text-amber-500" size={19} /> Assados a cada pedido</span><span className="flex items-center gap-3"><Truck className="text-amber-500" size={19} /> Entrega rápida e segura</span><span className="flex items-center gap-3"><Star className="fill-amber-500 text-amber-500" size={19} /> 5.0 na avaliação dos clientes</span><span className="flex items-center gap-3"><MapPin className="text-amber-500" size={19} /> São Paulo e região</span></div></section>

        <section id="cardapio" className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-3 text-xs font-black uppercase tracking-[.25em] text-amber-500">Feito para dar água na boca</p><h2 className="font-display text-4xl font-bold text-amber-50 sm:text-5xl">Escolha seu próximo <em className="text-amber-500">favorito.</em></h2></div><p className="max-w-md text-stone-400">Receitas autorais, ingredientes selecionados e o cuidado de quem acredita que um bom salgado pode ser inesquecível.</p></div>
          <div className="mb-10 flex gap-2 overflow-x-auto pb-2">{categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-bold transition ${activeCategory === category ? 'border-amber-500 bg-amber-500 text-stone-950' : 'border-white/10 text-stone-400 hover:border-amber-500/40 hover:text-amber-300'}`}>{category}</button>)}</div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} onDetails={() => setSelectedProduct(product)} onAdd={() => addToCart(product)} />)}</div>
        </section>

        <section id="combos" className="relative overflow-hidden bg-[#17100b] py-24"><div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-amber-600/10 blur-3xl" /><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mb-12 max-w-2xl"><p className="mb-3 text-xs font-black uppercase tracking-[.25em] text-amber-500">Para compartilhar (ou não)</p><h2 className="font-display text-4xl font-bold text-amber-50 sm:text-5xl">Combos que fazem a festa <em className="text-amber-500">começar.</em></h2></div><div className="grid gap-5 lg:grid-cols-3">{COMBOS.map((combo) => <motion.article whileHover={{ y: -5 }} key={combo.id} className={`relative flex flex-col rounded-3xl border p-7 ${combo.popular ? 'border-amber-500/70 bg-gradient-to-b from-amber-500/15 to-[#21140c]' : 'border-white/10 bg-white/[.025]'}`}>{combo.popular && <span className="absolute -top-3 left-7 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-stone-950">Mais pedido</span>}<p className="text-xs font-bold uppercase tracking-widest text-amber-500">{combo.tag}</p><h3 className="mt-3 font-display text-2xl text-amber-50">{combo.title}</h3><p className="mt-3 min-h-14 text-sm leading-6 text-stone-400">{combo.desc}</p><ul className="my-6 space-y-3 border-y border-white/10 py-5 text-sm text-stone-300">{combo.items.map((item) => <li key={item} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-amber-500" />{item}</li>)}</ul><div className="mt-auto flex items-end justify-between"><div><p className="text-xs text-stone-500 line-through">De {money(combo.originalPrice)}</p><p className="font-display text-3xl font-bold text-amber-300">{money(combo.price)}</p></div><button onClick={() => celebrateAndOrder(`Olá, Luís! Quero pedir o ${combo.title} por ${money(combo.price)}.`)} className="rounded-full bg-amber-500 px-4 py-3 text-sm font-extrabold text-stone-950 transition hover:bg-amber-400">Pedir combo</button></div></motion.article>)}</div></div></section>

        <section id="historia" className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 lg:grid-cols-2 lg:px-8"><div className="relative"><div className="absolute -inset-5 rounded-[3rem] bg-amber-500/10 blur-2xl" /><img src="/images/empadinha-gourmet-frango-cremoso.jpeg" alt="Empadinha artesanal de frango" className="relative aspect-[4/3] w-full rounded-[2.5rem] object-cover shadow-2xl shadow-black/50" /><div className="absolute -bottom-5 -right-3 rounded-2xl border border-amber-400/30 bg-[#21160f] px-5 py-4 shadow-xl sm:right-8"><p className="font-display text-3xl font-bold text-amber-400">100%</p><p className="text-xs font-bold uppercase tracking-wider text-stone-400">feito à mão</p></div></div><div><p className="mb-3 text-xs font-black uppercase tracking-[.25em] text-amber-500">Mais que um salgado</p><h2 className="font-display text-4xl font-bold leading-tight text-amber-50 sm:text-5xl">Tem receita que a gente faz. <em className="text-amber-500">E tem receita que a gente sente.</em></h2><p className="mt-6 leading-8 text-stone-400">A Luís nasceu na cozinha de casa, entre uma fornada e outra, com a vontade de resgatar o sabor dos assados feitos com calma. Hoje, cada unidade continua recebendo o mesmo cuidado: massa preparada no tempo certo, recheio generoso e forno sempre quente.</p><p className="mt-4 leading-8 text-stone-400">Porque para nós, artesanal não é só um jeito de fazer. É um jeito de receber você.</p><a href={whatsappUrl('Olá, Luís! Quero conhecer os salgados artesanais.')} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 font-bold text-amber-400 hover:text-amber-300">Fale com a gente <ArrowRight size={17} /></a></div></section>

        <section className="bg-[#130e0b] py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mb-12 text-center"><p className="mb-3 text-xs font-black uppercase tracking-[.25em] text-amber-500">Quem prova, recomenda</p><h2 className="font-display text-4xl font-bold text-amber-50 sm:text-5xl">Palavra de quem já <em className="text-amber-500">se apaixonou.</em></h2></div><div className="grid gap-5 md:grid-cols-3">{TESTIMONIALS.map((testimonial) => <article key={testimonial.name} className="card-glass rounded-3xl p-7"><div className="mb-5 flex gap-1">{Array.from({ length: testimonial.rating }).map((_, index) => <Star key={index} size={16} className="fill-amber-400 text-amber-400" />)}</div><p className="leading-7 text-stone-300">“{testimonial.comment}”</p><div className="mt-7 border-t border-white/10 pt-5"><p className="font-bold text-amber-50">{testimonial.name}</p><p className="mt-1 text-xs text-stone-500">{testimonial.role} · {testimonial.location}</p></div></article>)}</div></div></section>

        <section id="duvidas" className="mx-auto max-w-4xl px-5 py-24 lg:px-8"><div className="mb-10 text-center"><p className="mb-3 text-xs font-black uppercase tracking-[.25em] text-amber-500">Tudo bem explicado</p><h2 className="font-display text-4xl font-bold text-amber-50 sm:text-5xl">Ficou com <em className="text-amber-500">dúvida?</em></h2></div><div className="space-y-3">{FAQS.map((faq, index) => <div key={faq.q} className="rounded-2xl border border-white/10 bg-white/[.025]"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-5 p-5 text-left font-bold text-amber-50"><span>{faq.q}</span><ChevronDown size={19} className={`shrink-0 text-amber-500 transition ${openFaq === index ? 'rotate-180' : ''}`} /></button><AnimatePresence initial={false}>{openFaq === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="px-5 pb-5 leading-7 text-stone-400">{faq.a}</p></motion.div>}</AnimatePresence></div>)}</div></section>

        <section className="px-5 pb-24 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[2rem] border border-amber-500/25 bg-gradient-to-r from-amber-500/20 via-orange-900/20 to-transparent p-8 sm:p-12 md:flex-row md:items-center"><div><p className="text-xs font-black uppercase tracking-[.25em] text-amber-400">Seu próximo momento especial começa aqui</p><h2 className="mt-3 max-w-xl font-display text-3xl font-bold text-amber-50 sm:text-4xl">Quentinho, artesanal e pronto para chegar na sua mesa.</h2></div><a target="_blank" rel="noreferrer" href={whatsappUrl('Olá, Luís! Quero fazer um pedido.')} className="glow-btn inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-4 font-extrabold text-stone-950">Pedir pelo WhatsApp <MessageCircle size={18} /></a></div></section>
      </main>

        <footer className="border-t border-white/5 bg-[#090706] py-10"><div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 text-sm text-stone-500 md:flex-row md:items-center md:justify-between lg:px-8"><div className="flex items-center gap-3"><span className="text-2xl">🥐</span><div><p className="font-display text-lg text-amber-100">Luís Salgados Artesanais</p><p>Feito com calma. Entregue com carinho.</p></div></div><div className="flex items-center gap-5"><a href={whatsappUrl('Olá, Luís!')} target="_blank" rel="noreferrer" className="transition hover:text-amber-400"><MessageCircle size={18} /></a><a href="#inicio" className="transition hover:text-amber-400"><Camera size={18} /></a><span>© 2025 Luís Artesanais</span></div></div></footer>

      <AnimatePresence>{selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={() => { addToCart(selectedProduct); setSelectedProduct(null); }} />}</AnimatePresence>
      <AnimatePresence>{cartOpen && <CartDrawer items={cartItems} total={cartTotal} onClose={() => setCartOpen(false)} updateQuantity={updateQuantity} onOrder={() => celebrateAndOrder(`Olá, Luís! Quero fazer um pedido: ${cartItems.map(({ product, quantity }) => `${quantity}x ${product.name}`).join(', ')}. Total estimado: ${money(cartTotal)}.`)} />}</AnimatePresence>
    </div>
  );
}

function ProductCard({ product, onDetails, onAdd }: { product: Product; index?: number; onDetails: () => void; onAdd: () => void }) {
  return <motion.article layout initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="group card-glass card-glass-hover overflow-hidden rounded-3xl"><button onClick={onDetails} className="relative block w-full text-left"><div className="absolute left-4 top-4 z-10 rounded-full bg-[#1d120b]/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-amber-300">{product.badge}</div><img src={product.image} alt={product.name} className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105" /></button><div className="p-5"><p className="text-[10px] font-black uppercase tracking-[.16em] text-amber-500">{product.category}</p><h3 className="mt-2 min-h-14 font-display text-xl font-bold leading-tight text-amber-50">{product.name}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-400">{product.shortDesc}</p><div className="mt-5 flex items-center justify-between gap-3"><div><span className="text-2xl font-bold text-amber-300">{money(product.promoPrice || product.price)}</span>{product.promoPrice && <span className="ml-2 text-xs text-stone-600 line-through">{money(product.price)}</span>}</div><button onClick={onAdd} className="grid h-10 w-10 place-items-center rounded-full bg-amber-500 text-stone-950 transition hover:bg-amber-400" aria-label={`Adicionar ${product.name}`}><Plus size={19} /></button></div></div></motion.article>;
}

function ProductModal({ product, onClose, onAdd }: { product: Product; onClose: () => void; onAdd: () => void }) {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center bg-black/75 p-5 backdrop-blur-sm" onClick={onClose}><motion.div initial={{ y: 20, scale: .97 }} animate={{ y: 0, scale: 1 }} onClick={(event) => event.stopPropagation()} className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-amber-500/20 bg-[#1b120d] p-5 sm:p-7"><button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-2 text-stone-300 hover:text-white"><X size={18} /></button><div className="grid gap-7 md:grid-cols-2"><img src={product.image} alt={product.name} className="aspect-square w-full rounded-2xl object-cover" /><div className="flex flex-col justify-center"><p className="text-xs font-black uppercase tracking-[.18em] text-amber-500">{product.category}</p><h2 className="mt-2 font-display text-3xl font-bold text-amber-50">{product.name}</h2><p className="mt-4 leading-7 text-stone-400">{product.fullDesc}</p><div className="my-5 grid grid-cols-2 gap-2">{product.highlights.map((highlight) => <span key={highlight} className="rounded-xl bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-200">✓ {highlight}</span>)}</div><p className="text-3xl font-bold text-amber-300">{money(product.promoPrice || product.price)}</p><button onClick={onAdd} className="glow-btn mt-5 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 font-extrabold text-stone-950">Adicionar ao pedido <ShoppingBag size={17} /></button></div></div></motion.div></motion.div>;
}

function CartDrawer({ items, total, onClose, updateQuantity, onOrder }: { items: { product: Product; quantity: number }[]; total: number; onClose: () => void; updateQuantity: (id: string, delta: number) => void; onOrder: () => void }) {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black/60" onClick={onClose}><motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} onClick={(event) => event.stopPropagation()} className="ml-auto flex h-full w-full max-w-md flex-col border-l border-amber-500/20 bg-[#150e0a] p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[.2em] text-amber-500">Seu pedido</p><h2 className="mt-1 font-display text-3xl text-amber-50">Sacola</h2></div><button onClick={onClose} className="rounded-full border border-white/10 p-2"><X size={19} /></button></div>{items.length === 0 ? <div className="flex flex-1 flex-col items-center justify-center text-center"><span className="mb-5 text-5xl">🥐</span><p className="font-display text-2xl text-amber-50">Sua sacola está vazia</p><p className="mt-2 text-sm text-stone-500">Escolha algo delicioso para começar.</p><button onClick={onClose} className="mt-6 rounded-full bg-amber-500 px-5 py-3 text-sm font-bold text-stone-950">Ver cardápio</button></div> : <><div className="my-8 flex-1 space-y-4 overflow-y-auto">{items.map(({ product, quantity }) => <div key={product.id} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-3"><img src={product.image} alt="" className="h-20 w-20 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="font-bold text-amber-50">{product.name}</p><p className="mt-1 text-sm text-amber-300">{money(product.price)}</p><div className="mt-2 flex items-center gap-3"><button onClick={() => updateQuantity(product.id, -1)} className="rounded-full border border-white/15 p-1"><Minus size={13} /></button><span className="text-sm font-bold">{quantity}</span><button onClick={() => updateQuantity(product.id, 1)} className="rounded-full border border-white/15 p-1"><Plus size={13} /></button></div></div></div>)}</div><div className="border-t border-white/10 pt-5"><div className="mb-4 flex justify-between text-lg font-bold"><span>Total estimado</span><span className="text-amber-300">{money(total)}</span></div><button onClick={onOrder} className="glow-btn flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 font-extrabold text-stone-950">Finalizar no WhatsApp <MessageCircle size={18} /></button><p className="mt-3 text-center text-xs text-stone-600">O pagamento é combinado com a equipe.</p></div></>}</motion.aside></motion.div>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
