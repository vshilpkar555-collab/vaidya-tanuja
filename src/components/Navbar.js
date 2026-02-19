import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Icon from './Icon';

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const { cartCount, currentPage, setCurrentPage, user, dosha } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { id: 'home',    label: 'Home' },
    { id: 'shop',    label: 'Shop' },
    { id: 'quiz',    label: 'Dosha Quiz' },
    { id: 'book',    label: 'Book Appointment' },
    { id: 'consult', label: 'AI Consult' },
  ];

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        background: scrolled ? 'rgba(253,251,247,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(45,90,39,0.1)' : 'none',
        transition: 'all 0.3s ease',
        padding: scrolled ? '12px 32px' : '20px 32px',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, var(--green), var(--gold))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🌿</div>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond', fontSize: 18, fontWeight: 600, color: 'var(--green)', lineHeight: 1 }}>Vaidya Tanuja</div>
            <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', lineHeight: 1 }}>Ayurvedic Wellness</div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hide-mobile" style={{ display: 'flex', gap: 28 }}>
          {navLinks.map(({ id, label }) => (
            <span key={id} className={`nav-link ${currentPage === id ? 'active' : ''}`} onClick={() => setCurrentPage(id)}>
              {label}
            </span>
          ))}
          {user?.isAdmin && (
            <span className="nav-link" onClick={() => setCurrentPage('admin')}>Admin</span>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {dosha && (
            <span className="hide-mobile" style={{ fontSize: 11, padding: '4px 10px', borderRadius: 12, background: 'var(--green-pale)', color: 'var(--green)', fontWeight: 600 }}>
              {dosha.charAt(0).toUpperCase() + dosha.slice(1)} Type
            </span>
          )}
          <button
            onClick={() => setCurrentPage('book')}
            className="hide-mobile"
            style={{ background: 'var(--gold)', border: 'none', borderRadius: 4, cursor: 'pointer', color: 'white', padding: '8px 14px', fontSize: 12, fontFamily: 'Jost', fontWeight: 600, letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <Icon name="calendar" size={14} color="white" /> Book
          </button>
          <button onClick={() => setCurrentPage('account')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }}>
            <Icon name="user" />
          </button>
          <button onClick={() => setCurrentPage('cart')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', position: 'relative' }}>
            <Icon name="cart" />
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: -8, right: -8, background: 'var(--gold)', color: 'white', borderRadius: '50%', width: 18, height: 18, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                {cartCount}
              </span>
            )}
          </button>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }}
          >
            <Icon name={mobileOpen ? 'x' : 'menu'} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{ background: 'var(--cream)', padding: '16px 32px', borderTop: '1px solid var(--green-pale)' }}>
          {navLinks.map(({ id, label }) => (
            <div key={id} style={{ padding: '12px 0', borderBottom: '1px solid var(--green-pale)' }}
              onClick={() => { setCurrentPage(id); setMobileOpen(false); }}>
              <span className="nav-link">{label}</span>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
