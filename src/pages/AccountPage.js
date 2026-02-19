import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Mandala from '../components/Mandala';
import Icon from '../components/Icon';

// ─── ACCOUNT PAGE ─────────────────────────────────────────────────────────────
const AccountPage = () => {
  const { user, setUser, setCurrentPage, dosha, showToast } = useApp();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const handleSubmit = () => {
    const mockUser = {
      name: form.name || 'Wellness Seeker',
      email: form.email || 'demo@vaidyatanuja.com',
      isAdmin: form.email === 'admin@vaidyatanuja.com',
      orders: [
        { id: '#VT2024001', date: '15 Jan 2024', status: 'Delivered', total: 1748, items: ['Chyawanprash Gold', 'Triphala Digest Guard'] },
        { id: '#VT2024002', date: '28 Jan 2024', status: 'In Transit', total: 849,  items: ['Brahmi Mind Elixir'] },
      ],
    };
    setUser(mockUser);
    showToast(`Welcome, ${mockUser.name}! 🙏`);
  };

  // ── Logged-in view ───────────────────────────────────────────────────────
  if (user) return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '100px 32px 80px' }}>
      {/* Profile banner */}
      <div style={{ background: 'linear-gradient(135deg,var(--green),#1a3a17)', borderRadius: 16, padding: '40px', marginBottom: 32, position: 'relative', overflow: 'hidden' }}>
        <Mandala size={250} style={{ right: -60, top: -60 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 16 }}>🌿</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 32, color: 'white', marginBottom: 4 }}>Namaste, {user.name}</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{user.email}</p>
          {dosha && (
            <span style={{ display: 'inline-block', marginTop: 12, background: 'rgba(255,255,255,0.15)', color: 'white', padding: '6px 16px', borderRadius: 20, fontSize: 13 }}>
              ✦ {dosha.charAt(0).toUpperCase() + dosha.slice(1)} Prakriti Profile
            </span>
          )}
        </div>
      </div>

      {/* Order history */}
      <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 28, color: 'var(--green)', marginBottom: 20 }}>Order History</h3>
      {user.orders.map(order => (
        <div key={order.id} className="card" style={{ padding: '24px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>{order.id}</p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{order.date}</p>
              <p style={{ fontSize: 13, marginTop: 6 }}>{order.items.join(', ')}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 600, background: order.status === 'Delivered' ? 'var(--green-pale)' : '#FEF3C7', color: order.status === 'Delivered' ? 'var(--green)' : '#B45309', marginBottom: 8 }}>
                {order.status}
              </span>
              <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 20, fontWeight: 600 }}>₹{order.total}</p>
            </div>
          </div>
        </div>
      ))}

      <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
        <button className="btn-primary" onClick={() => setCurrentPage('book')}>
          <Icon name="calendar" size={16} /> Book Appointment
        </button>
        {user.isAdmin && (
          <button className="btn-primary" onClick={() => setCurrentPage('admin')}>
            <Icon name="settings" size={16} /> Admin Panel
          </button>
        )}
        <button className="btn-outline" onClick={() => { setUser(null); showToast('Logged out successfully'); }}>
          Sign Out
        </button>
      </div>
    </div>
  );

  // ── Login / Sign-up view ─────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '100px 32px 80px' }}>
      <div className="card" style={{ padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🌿</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 32, color: 'var(--green)', marginBottom: 4 }}>
            {mode === 'login' ? 'Welcome Back' : 'Begin Your Journey'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            {mode === 'login' ? 'Sign in to your wellness account' : 'Create your Ayurvedic profile'}
          </p>
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', marginBottom: 24, border: '1.5px solid var(--green-pale)', borderRadius: 8, overflow: 'hidden' }}>
          {['login','signup'].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: '12px', background: mode === m ? 'var(--green)' : 'transparent', color: mode === m ? 'white' : 'var(--text)', border: 'none', cursor: 'pointer', fontFamily: 'Jost', fontSize: 14, fontWeight: 500, transition: 'all 0.2s' }}>
              {m === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {mode === 'signup' && (
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Full Name</label>
              <input className="input" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
          )}
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Email Address</label>
            <input className="input" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Password</label>
            <input className="input" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
          <button className="btn-primary" onClick={handleSubmit} style={{ justifyContent: 'center', marginTop: 8 }}>
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--gold)', marginTop: 16, cursor: 'pointer' }} onClick={handleSubmit}>
          Continue as guest →
        </p>
      </div>
    </div>
  );
};

export default AccountPage;
