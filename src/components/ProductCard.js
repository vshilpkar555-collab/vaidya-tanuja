import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Icon from './Icon';

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
const ProductCard = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist, setSelectedProduct, setCurrentPage } = useApp();
  const [imgError, setImgError] = useState(false);
  const isWished = wishlist.includes(product.id);

  const openProduct = () => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  return (
    <div className="card" style={{ cursor: 'pointer', position: 'relative' }}>
      {/* Wishlist button */}
      <button
        onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }}
        style={{ position: 'absolute', top: 14, right: 14, background: 'white', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 1 }}
      >
        <Icon name={isWished ? 'heart-fill' : 'heart'} size={16} color={isWished ? '#e53e3e' : 'var(--text-muted)'} />
      </button>

      {/* Out of stock overlay */}
      {!product.inStock && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
          <span style={{ background: 'var(--text)', color: 'white', padding: '6px 16px', borderRadius: 4, fontSize: 12, fontWeight: 600, letterSpacing: '0.1em' }}>OUT OF STOCK</span>
        </div>
      )}

      {/* Image */}
      <div onClick={openProduct} style={{ position: 'relative', overflow: 'hidden', height: 200 }}>
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-img"
            onError={() => setImgError(true)}
            style={{ transition: 'transform 0.4s ease' }}
            onMouseEnter={e => { e.target.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
          />
        ) : (
          <div style={{ height: 200, background: 'linear-gradient(135deg, var(--green-pale), var(--gold-pale))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56 }}>🌿</div>
        )}
        <div style={{ position: 'absolute', bottom: 8, left: 8 }}>
          <span style={{ fontSize: 11, color: 'white', background: 'rgba(0,0,0,0.5)', padding: '3px 8px', borderRadius: 10, letterSpacing: '0.06em', textTransform: 'uppercase', backdropFilter: 'blur(4px)' }}>
            {product.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
          {product.doshas.map(d => (
            <span key={d} className={`badge badge-${d}`}>
              {d === 'all' ? '✦ Tridoshic' : d.charAt(0).toUpperCase() + d.slice(1)}
            </span>
          ))}
        </div>

        <h3 onClick={openProduct} style={{ fontFamily: 'Cormorant Garamond', fontSize: 20, fontWeight: 600, marginBottom: 8, color: 'var(--text)', lineHeight: 1.3 }}>
          {product.name}
        </h3>

        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 14 }}>
          {product.shortDesc}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
          <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{product.rating} ({product.reviews})</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontFamily: 'Cormorant Garamond', fontSize: 22, fontWeight: 600, color: 'var(--green)' }}>₹{product.price}</span>
            <span style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: 6 }}>₹{product.originalPrice}</span>
          </div>
          <button
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: 12 }}
            onClick={e => { e.stopPropagation(); if (product.inStock) addToCart(product); }}
            disabled={!product.inStock}
          >
            <Icon name="cart" size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
