import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';

// ─── PRODUCT DETAIL PAGE ──────────────────────────────────────────────────────
const ProductDetailPage = () => {
  const { selectedProduct: p, addToCart, wishlist, toggleWishlist, setCurrentPage } = useApp();
  const [qty, setQty]         = useState(1);
  const [tab, setTab]         = useState('benefits');
  const [imgError, setImgError] = useState(false);

  if (!p) return null;
  const isWished = wishlist.includes(p.id);
  const discount = Math.round((1 - p.price / p.originalPrice) * 100);

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 32px 80px' }}>
      <button
        onClick={() => setCurrentPage('shop')}
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', marginBottom: 32, fontFamily: 'Jost', fontSize: 14 }}
      >
        ← Back to Shop
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }} className="grid-cols-2">
        {/* Image */}
        <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-lg)', position: 'relative' }}>
          {!imgError ? (
            <img src={p.image} alt={p.name} style={{ width: '100%', height: 480, objectFit: 'cover', display: 'block' }} onError={() => setImgError(true)} />
          ) : (
            <div style={{ height: 480, background: 'linear-gradient(135deg,var(--green-pale),var(--gold-pale))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 96 }}>🌿</div>
          )}
          <div style={{ position: 'absolute', bottom: 16, left: 16, display: 'flex', gap: 8 }}>
            {p.doshas.map(d => (
              <span key={d} className={`badge badge-${d}`}>
                {d === 'all' ? '✦ Tridoshic' : d.charAt(0).toUpperCase() + d.slice(1)}
              </span>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{p.category}</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 42, fontWeight: 500, color: 'var(--text)', lineHeight: 1.2, marginBottom: 16 }}>{p.name}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <span className="stars">{'★'.repeat(Math.floor(p.rating))}</span>
            <span style={{ fontSize: 14 }}>{p.rating} · {p.reviews} reviews</span>
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 28 }}>{p.shortDesc}</p>

          <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
            {p.tags.map(tag => (
              <span key={tag} style={{ background: 'var(--green-pale)', color: 'var(--green)', padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 500 }}>{tag}</span>
            ))}
          </div>

          {/* Price */}
          <div style={{ borderTop: '1px solid var(--green-pale)', borderBottom: '1px solid var(--green-pale)', padding: '20px 0', marginBottom: 28 }}>
            <span style={{ fontFamily: 'Cormorant Garamond', fontSize: 36, fontWeight: 600, color: 'var(--green)' }}>₹{p.price}</span>
            <span style={{ fontSize: 16, color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: 12 }}>₹{p.originalPrice}</span>
            <span style={{ background: 'var(--gold)', color: 'white', fontSize: 12, padding: '3px 8px', borderRadius: 4, marginLeft: 12, fontWeight: 600 }}>
              {discount}% OFF
            </span>
          </div>

          {/* Qty + Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--green-pale)', borderRadius: 6, overflow: 'hidden' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: 'none', border: 'none', padding: '10px 14px', cursor: 'pointer' }}><Icon name="minus" size={14} /></button>
              <span style={{ padding: '0 16px', fontWeight: 600, fontSize: 16 }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ background: 'none', border: 'none', padding: '10px 14px', cursor: 'pointer' }}><Icon name="plus" size={14} /></button>
            </div>
            <button className="btn-primary" style={{ flex: 1 }} onClick={() => addToCart(p)}>
              <Icon name="cart" size={16} /> Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(p.id)}
              style={{ padding: '12px', border: '1.5px solid var(--green-pale)', background: 'white', borderRadius: 6, cursor: 'pointer' }}
            >
              <Icon name={wishlist.includes(p.id) ? 'heart-fill' : 'heart'} size={18} color={wishlist.includes(p.id) ? '#e53e3e' : 'var(--text-muted)'} />
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '2px solid var(--green-pale)', marginBottom: 20 }}>
            {['benefits','ingredients','usage'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{ background: 'none', border: 'none', padding: '12px 20px', cursor: 'pointer', fontFamily: 'Jost', fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: tab === t ? 'var(--green)' : 'var(--text-muted)', borderBottom: tab === t ? '2px solid var(--green)' : '2px solid transparent', marginBottom: -2, transition: 'all 0.2s' }}
              >
                {t}
              </button>
            ))}
          </div>

          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            {tab === 'benefits' && (
              <ul style={{ listStyle: 'none' }}>
                {p.benefits.map(b => (
                  <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', fontSize: 14, lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--gold)', marginTop: 2, flexShrink: 0 }}>✦</span> {b}
                  </li>
                ))}
              </ul>
            )}
            {tab === 'ingredients' && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {p.ingredients.map(ing => (
                  <span key={ing} style={{ background: 'var(--cream-dark)', padding: '8px 14px', borderRadius: 20, fontSize: 13 }}>🌿 {ing}</span>
                ))}
              </div>
            )}
            {tab === 'usage' && (
              <p style={{ fontSize: 14, lineHeight: 1.8, background: 'var(--cream-dark)', padding: '16px', borderRadius: 8, borderLeft: '3px solid var(--gold)' }}>
                {p.howToUse}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
