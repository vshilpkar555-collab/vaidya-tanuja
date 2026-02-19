import { useState } from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import Icon from '../components/Icon';
import PRODUCTS from '../data/products';

// ─── SHOP PAGE ────────────────────────────────────────────────────────────────
const ShopPage = () => {
  const { dosha } = useApp();
  const [filter, setFilter] = useState('all');
  const [sort, setSort]     = useState('featured');
  const [search, setSearch] = useState('');

  const categories = [
    'all','Cognitive Health','Digestive Health','Immunity',
    'Sleep & Rest','Skin Health',"Women's Wellness",'Weight Management','Joint Health',
  ];

  const filtered = PRODUCTS
    .filter(p => {
      if (filter !== 'all' && p.category !== filter) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) &&
          !p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'price-low')  return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'rating')     return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 32px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <p style={{ color: 'var(--gold)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>Sacred Formulations</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 400, color: 'var(--green)', marginBottom: 8 }}>
          Our Herbal Remedies
        </h1>
        {dosha && (
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            Showing recommendations for your{' '}
            <strong style={{ color: 'var(--green)' }}>
              {dosha.charAt(0).toUpperCase() + dosha.slice(1)} Prakriti
            </strong>
          </p>
        )}
      </div>

      {/* Search + Sort */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <input
            className="input"
            placeholder="Search remedies..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 40, width: 220 }}
          />
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
            <Icon name="search" size={16} color="var(--text-muted)" />
          </span>
        </div>
        <select className="input" style={{ width: 'auto' }} value={sort} onChange={e => setSort(e.target.value)}>
          <option value="featured">Featured</option>
          <option value="rating">Top Rated</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, overflowX: 'auto', paddingBottom: 4 }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              background: filter === cat ? 'var(--green)' : 'white',
              color: filter === cat ? 'white' : 'var(--text)',
              border: '1.5px solid',
              borderColor: filter === cat ? 'var(--green)' : '#E0E0E0',
              padding: '8px 16px',
              borderRadius: 20,
              fontSize: 13,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              fontFamily: 'Jost',
            }}
          >
            {cat === 'all' ? 'All Products' : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
          <p>No remedies found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }} className="grid-cols-4">
          {filtered.map(p => (
            <div key={p.id} style={{ animation: 'fadeUp 0.5s ease' }}>
              <ProductCard product={p} />
              {dosha && (p.doshas.includes(dosha) || p.doshas.includes('all')) && (
                <div style={{ background: 'var(--green)', color: 'white', textAlign: 'center', fontSize: 11, padding: '4px', borderRadius: '0 0 8px 8px', marginTop: -4, letterSpacing: '0.06em' }}>
                  ✦ RECOMMENDED FOR YOU
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopPage;
