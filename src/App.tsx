import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Link, Route, Routes, useParams, useSearchParams } from 'react-router-dom'
import { ArrowRight, Check, ChevronDown, Menu, Minus, Plus, Search, ShoppingBag, SlidersHorizontal, Sparkles, User, X } from 'lucide-react'
import type { Category, Product } from './types'
import { fetchProducts } from './lib/supabase'

type CartLine = { product: Product; quantity: number }
const money = (n:number) => `$${n.toFixed(2)}`
type CatalogState = { products: Product[]; loading: boolean; error: Error | null }
const CatalogContext = createContext<CatalogState>({ products: [], loading: true, error: null })
const useCatalog = () => useContext(CatalogContext)

function Header({count,onCart}:{count:number;onCart:()=>void}) {
  const [open,setOpen] = useState(false)
  return <header className="site-header"><div className="announcement">Complimentary shipping on orders over $100 <ArrowRight size={14}/></div>
    <div className="nav-wrap"><button className="icon-btn mobile-menu" onClick={()=>setOpen(!open)} aria-label="Open menu"><Menu/></button><Link className="wordmark" to="/">loam <i>&</i> linen</Link>
    <nav className={open?'nav open':'nav'}><Link to="/shop">Shop</Link><Link to="/shop?category=Textiles">Textiles</Link><Link to="/shop?category=Objects">Objects</Link><Link to="/about">Our approach</Link></nav>
    <div className="nav-actions"><Link className="icon-btn" to="/account" aria-label="Account"><User/></Link><button className="icon-btn bag" onClick={onCart} aria-label={`Cart with ${count} items`}><ShoppingBag/>{count>0&&<span>{count}</span>}</button></div></div>
  </header>
}

function Footer(){return <footer><div className="footer-main"><div><Link className="wordmark" to="/">loam <i>&</i> linen</Link><p>Considered objects for a slower home.</p></div><div className="footer-links"><div><strong>Explore</strong><Link to="/shop">Shop all</Link><Link to="/about">Our approach</Link><Link to="/account">Account</Link></div><div><strong>Help</strong><a href="mailto:hello@loamandlinen.com">Contact</a><Link to="/shipping">Shipping & returns</Link><Link to="/faq">FAQ</Link></div><div><strong>Stay awhile</strong><p className="small">Notes on making, keeping, and finding the good stuff.</p><div className="subscribe"><input placeholder="Your email address" aria-label="Email address"/><button aria-label="Subscribe"><ArrowRight/></button></div></div></div></div><div className="footer-bottom"><span>© 2025 Loam & Linen</span><span>Made with intention.</span></div></footer>}

function ProductCard({product,onAdd}:{product:Product;onAdd:(p:Product)=>void}){return <article className="product-card"><Link to={`/product/${product.id}`} className="product-image"><img src={product.image} alt={product.name}/>{product.badge&&<span className="badge">{product.badge}</span>}<button className="quick-add" onClick={e=>{e.preventDefault();onAdd(product)}}><Plus size={17}/> Quick add</button></Link><div className="product-meta"><div><span className="category">{product.category}</span><h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3></div><strong>{money(product.price)}</strong></div></article>}

function Home({onAdd}:{onAdd:(p:Product)=>void}){const {products: catalog}=useCatalog();return <><main><section className="hero"><div className="hero-copy"><p className="eyebrow">Objects with a point of view</p><h1>Make room for<br/><em>the everyday.</em></h1><p className="hero-lede">A considered collection of useful, beautiful things for the way you actually live.</p><Link className="button button-dark" to="/shop">Shop the collection <ArrowRight size={16}/></Link></div><div className="hero-image"><img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=90" alt="Sunlit, calm living room with natural textures"/><span className="image-note">Volume 04 — The quiet edit</span></div></section>
<section className="intro"><p className="eyebrow">The good stuff</p><h2>Things that get better<br/><em>with living.</em></h2><p>We look for the honest detail: the hand-thrown edge, the small maker, the material that remembers where it came from. Objects to use, not just admire.</p></section>
<section className="featured"><div className="section-head"><div><p className="eyebrow">A few favorites</p><h2>Start here</h2></div><Link to="/shop" className="text-link">View all <ArrowRight size={15}/></Link></div><div className="product-grid">{catalog.slice(0,4).map(p=><ProductCard key={p.id} product={p} onAdd={onAdd}/>)}</div></section>
<section className="manifesto"><div className="manifesto-image"><img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85" alt="Hands working with natural materials"/></div><div className="manifesto-copy"><Sparkles size={22}/><h2>Keep what is<br/><em>worth keeping.</em></h2><p>We believe in fewer, better things. In buying once and using often. In the small pleasure of an object that feels right in your hand.</p><Link to="/about" className="text-link">Our approach <ArrowRight size={15}/></Link></div></section>
<section className="newsletter"><p className="eyebrow">A note from us</p><h2>Good things, occasionally.</h2><p>New work, old wisdom, and a little beauty for your inbox.</p><div className="subscribe large"><input placeholder="Your email address" aria-label="Email address"/><button>Subscribe <ArrowRight size={15}/></button></div></section></main><Footer/></>}

function Shop({onAdd}:{onAdd:(p:Product)=>void}){const {products: catalog}=useCatalog();const [params,setParams]=useSearchParams();const initial=(params.get('category') as Category)||'All';const [category,setCategory]=useState<Category>(initial);const [query,setQuery]=useState(params.get('q')||'');const [sort,setSort]=useState('featured');const [filterOpen,setFilterOpen]=useState(false);const filtered=useMemo(()=>catalog.filter(p=>(category==='All'||p.category===category)&&p.name.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>sort==='price-low'?a.price-b.price:sort==='price-high'?b.price-a.price:0),[catalog,category,query,sort]);const choose=(c:Category)=>{setCategory(c);setParams(c==='All'?{}:{category:c})};return <><main className="shop-page"><div className="shop-title"><p className="eyebrow">The collection</p><h1>Objects for <em>living.</em></h1><p>Useful, beautiful things chosen for their material, maker, and staying power.</p></div><div className="shop-toolbar"><button className="filter-toggle" onClick={()=>setFilterOpen(!filterOpen)}><SlidersHorizontal size={16}/> Filters</button><div className={filterOpen?'filters open':'filters'}>{(['All','Ceramics','Textiles','Woodwork','Objects'] as Category[]).map(c=><button key={c} className={category===c?'active':''} onClick={()=>choose(c)}>{c}</button>)}</div><div className="toolbar-right"><label className="search"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search objects..." aria-label="Search products"/></label><label className="sort">Sort by <select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><ChevronDown size={15}/></label></div></div><p className="result-count">{filtered.length} {filtered.length===1?'object':'objects'}</p><div className="product-grid shop-grid">{filtered.map(p=><ProductCard key={p.id} product={p} onAdd={onAdd}/>)}</div>{filtered.length===0&&<div className="empty"><Search size={26}/><h3>Nothing found.</h3><p>Try another search or clear your filters.</p><button className="button button-outline" onClick={()=>{setQuery('');choose('All')}}>Clear filters</button></div>}</main><Footer/></>}

function ProductDetail({onAdd}:{onAdd:(p:Product)=>void}){const {products: catalog}=useCatalog();const {id}=useParams();const p=catalog.find(x=>x.id===id);const [added,setAdded]=useState(false);if(!p)return <main className="empty"><h3>Object not found.</h3><Link to="/shop" className="button button-outline">Back to collection</Link></main>;return <><main className="detail"><div className="detail-image"><img src={p.image} alt={p.name}/></div><div className="detail-copy"><Link to="/shop" className="back">← Back to collection</Link><span className="category">{p.category}</span><h1>{p.name}</h1><p className="price">{money(p.price)}</p><p className="detail-description">{p.description}</p><div className="details">{p.details.map(d=><div key={d}><Check size={16}/>{d}</div>)}</div><button className="button button-dark add-button" onClick={()=>{onAdd(p);setAdded(true)}}>{added?'Added to your bag':'Add to bag'} <ShoppingBag size={17}/></button><div className="accordions"><details><summary>Shipping & returns <Plus size={16}/></summary><p>Complimentary shipping over $100. Returns accepted within 30 days of delivery.</p></details><details><summary>Care guide <Plus size={16}/></summary><p>Each piece includes care instructions tailored to its material.</p></details></div></div></main><section className="related"><div className="section-head"><h2>You may also like</h2><Link to="/shop" className="text-link">Shop all <ArrowRight size={15}/></Link></div><div className="product-grid">{catalog.filter(x=>x.id!==p.id).slice(0,4).map(x=><ProductCard key={x.id} product={x} onAdd={onAdd}/>)}</div></section><Footer/></>}

function Cart({lines,onClose,onUpdate,onCheckout}:{lines:CartLine[];onClose:()=>void;onUpdate:(id:string,n:number)=>void;onCheckout:()=>void}){const subtotal=lines.reduce((s,l)=>s+l.product.price*l.quantity,0);return <div className="drawer-backdrop" onClick={onClose}><aside className="cart-drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><h2>Your bag <span>{lines.reduce((s,l)=>s+l.quantity,0)}</span></h2><button className="icon-btn" onClick={onClose} aria-label="Close cart"><X/></button></div>{lines.length===0?<div className="cart-empty"><ShoppingBag size={30}/><h3>Your bag is waiting.</h3><p>Good things take their time. Add something lovely.</p><Link to="/shop" onClick={onClose} className="button button-outline">Browse collection</Link></div>:<><div className="cart-lines">{lines.map(l=><div className="cart-line" key={l.product.id}><img src={l.product.image} alt=""/><div><Link to={`/product/${l.product.id}`} onClick={onClose}>{l.product.name}</Link><small>{money(l.product.price)}</small><div className="quantity"><button onClick={()=>onUpdate(l.product.id,l.quantity-1)} aria-label="Decrease quantity"><Minus size={13}/></button><span>{l.quantity}</span><button onClick={()=>onUpdate(l.product.id,l.quantity+1)} aria-label="Increase quantity"><Plus size={13}/></button></div></div><strong>{money(l.product.price*l.quantity)}</strong></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><small>Shipping calculated at checkout.</small><button className="button button-dark full" onClick={onCheckout}>Continue to checkout <ArrowRight size={16}/></button></div></>}</aside></div>}

function Checkout({lines}:{lines:CartLine[]}){const [done,setDone]=useState(false);const total=lines.reduce((s,l)=>s+l.product.price*l.quantity,0);if(done)return <main className="confirmation"><div className="confirm-icon"><Check/></div><p className="eyebrow">Order received</p><h1>Thank you for<br/><em>keeping good things.</em></h1><p>Your order #LL-2048 is being prepared with care. We sent a confirmation to your inbox.</p><Link to="/shop" className="button button-dark">Continue shopping <ArrowRight size={16}/></Link></main>;return <main className="checkout"><div className="checkout-form"><Link to="/shop" className="back">← Continue shopping</Link><h1>Almost <em>home.</em></h1><form onSubmit={e=>{e.preventDefault();setDone(true)}}><h3>Contact</h3><input required type="email" placeholder="Email address"/><h3>Delivery</h3><div className="two-col"><input required placeholder="First name"/><input required placeholder="Last name"/></div><input required placeholder="Address"/><div className="two-col"><input required placeholder="City"/><input required placeholder="Postcode"/></div><h3>Payment</h3><div className="payment-note">Demo checkout — no payment will be processed.</div><input required placeholder="Card number" inputMode="numeric"/><button className="button button-dark full" type="submit">Place order <ArrowRight size={16}/></button></form></div><div className="order-summary"><h2>Your order</h2>{lines.map(l=><div className="summary-line" key={l.product.id}><img src={l.product.image} alt=""/><span>{l.product.name} <small>× {l.quantity}</small></span><strong>{money(l.product.price*l.quantity)}</strong></div>)}<div className="summary-total"><span>Total</span><strong>{money(total)}</strong></div></div></main>}

function Account(){const [mode,setMode]=useState<'signin'|'signup'>('signin');const [authed,setAuthed]=useState(false);if(authed)return <main className="account"><div className="account-head"><div><p className="eyebrow">Welcome back</p><h1>Your account.</h1></div><button className="text-link" onClick={()=>setAuthed(false)}>Sign out</button></div><div className="account-grid"><section><h2>Order history</h2><div className="order"><div><strong>#LL-1984</strong><span>March 18, 2025</span></div><span className="status">Delivered</span><strong>$202.00</strong></div><div className="order"><div><strong>#LL-1772</strong><span>January 08, 2025</span></div><span className="status">Delivered</span><strong>$76.00</strong></div></section><aside className="account-aside"><h3>Saved details</h3><p>alex@example.com</p><p>Portland, OR</p><button className="button button-outline">Edit details</button></aside></div></main>;return <main className="auth"><div className="auth-art"><img src="https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=85" alt="Abstract still life"/><p>“The best objects are the ones that become part of your story.”</p></div><div className="auth-form"><Link to="/" className="wordmark">loam <i>&</i> linen</Link><div className="auth-tabs"><button className={mode==='signin'?'active':''} onClick={()=>setMode('signin')}>Sign in</button><button className={mode==='signup'?'active':''} onClick={()=>setMode('signup')}>Create account</button></div><h1>{mode==='signin'?'Welcome back.':'Make yourself at home.'}</h1><p>{mode==='signin'?'Access your orders and saved details.':'Keep track of orders and save your favorites.'}</p><form onSubmit={e=>{e.preventDefault();setAuthed(true)}}>{mode==='signup'&&<input required placeholder="Full name"/>}<input required type="email" placeholder="Email address"/><input required type="password" placeholder="Password"/><button className="button button-dark full">{mode==='signin'?'Sign in':'Create account'} <ArrowRight size={16}/></button></form><small>Demo mode — your details stay in this browser.</small></div></main>}

function InfoPage({kind}:{kind:'about'|'shipping'|'faq'}){const content={about:{title:<>Made for <em>living.</em></>,body:'Loam & Linen is a small edit of useful, beautiful things. We work with makers who care about material, process, and making things that last.'},shipping:{title:<>Arrive with <em>ease.</em></>,body:'Orders ship within 2–4 business days. Complimentary shipping is included on orders over $100. If something is not right, returns are welcome within 30 days.'},faq:{title:<>A few good <em>answers.</em></>,body:'Have a question about an object, an order, or our process? Write to hello@loamandlinen.com and we will get back to you within two business days.'}}[kind];return <main className="intro info-page"><p className="eyebrow">{kind==='about'?'Our approach':kind==='shipping'?'Shipping & returns':'Frequently asked'}</p><h1>{content.title}</h1><p>{content.body}</p><Link className="button button-dark" to="/shop">Explore the collection <ArrowRight size={16}/></Link></main>}

function App() {
  const [lines, setLines] = useState<CartLine[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [catalog, setCatalog] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const loadCatalog = useCallback(() => {
    setLoading(true)
    setError(null)
    fetchProducts()
      .then(result => {
        if (result.error) setError(result.error)
        else if (result.data) setCatalog(result.data)
      })
      .catch(reason => setError(reason instanceof Error ? reason : new Error('Unable to load products.')))
      .finally(() => setLoading(false))
  }, [])

  useEffect(loadCatalog, [loadCatalog])

  const add = (product: Product) => {
    setLines(current => {
      const existing = current.find(line => line.product.id === product.id)
      return existing
        ? current.map(line => line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const update = (id: string, quantity: number) => {
    setLines(current => quantity < 1
      ? current.filter(line => line.product.id !== id)
      : current.map(line => line.product.id === id ? { ...line, quantity } : line))
  }

  const count = lines.reduce((sum, line) => sum + line.quantity, 0)
  const catalogState = { products: catalog, loading, error }

  return <CatalogContext.Provider value={catalogState}>
    <Header count={count} onCart={() => setCartOpen(true)} />
    {loading ? <main className="empty" aria-live="polite"><Sparkles size={26} /><h3>Gathering the collection...</h3><p>Just a moment.</p></main>
      : error ? <main className="empty" role="alert"><h3>We could not load the collection.</h3><p>{error.message}</p><button className="button button-outline" onClick={loadCatalog}>Try again</button></main>
      : <Routes>
        <Route path="/" element={<Home onAdd={add} />} />
        <Route path="/shop" element={<Shop onAdd={add} />} />
        <Route path="/product/:id" element={<ProductDetail onAdd={add} />} />
        <Route path="/checkout" element={<Checkout lines={lines} />} />
        <Route path="/account" element={<Account />} />
        <Route path="/about" element={<InfoPage kind="about" />} />
        <Route path="/shipping" element={<InfoPage kind="shipping" />} />
        <Route path="/faq" element={<InfoPage kind="faq" />} />
        <Route path="*" element={<Home onAdd={add} />} />
      </Routes>}
    {cartOpen && <Cart lines={lines} onClose={() => setCartOpen(false)} onUpdate={update} onCheckout={() => { setCartOpen(false); window.location.href = '/checkout' }} />}
  </CatalogContext.Provider>
}
export default App
