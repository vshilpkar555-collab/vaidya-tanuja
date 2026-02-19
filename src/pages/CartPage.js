import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';

// ─── CART PAGE ────────────────────────────────────────────────────────────────
const CartPage = () => {
  const { cart, dispatch, cartTotal, setCurrentPage, showToast } = useApp();

  if (cart.length === 0) return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '100px 32px 80px', textAlign: 'center' }}>
      <div style={{ fontSize: 80, marginBottom: 24 }}>🛒</div>
      <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 36, color: 'var(--green)', marginBottom: 16 }}>Your Cart is Empty</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Add some healing remedies to begin your wellness journey.</p>
      <button className="btn-primary" onClick={() => setCurrentPage('shop')}>
        <Icon name="leaf" size={16} /> Explore Remedies
      </button>
    </div>
  );

  const shipping = cartTotal >= 999 ? 0 : 99;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 32px 80px' }}>
      <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 44, fontWeight: 400, color: 'var(--green)', marginBottom: 40 }}>Your Cart</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32 }} className="grid-cols-2">
        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {cart.map(item => (
            <div key={item.id} className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ width: 72, height: 72, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.category}</p>
                <h4 style={{ fontFamily: 'Cormorant Garamond', fontSize: 20, marginBottom: 4 }}>{item.name}</h4>
                <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 20, color: 'var(--green)', fontWeight: 600 }}>₹{item.price}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--green-pale)', borderRadius: 6, overflow: 'hidden' }}>
                  <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty - 1 })} style={{ background: 'none', border: 'none', padding: '8px 12px', cursor: 'pointer' }}><Icon name="minus" size={14} /></button>
                  <span style={{ padding: '0 12px', fontWeight: 600 }}>{item.qty}</span>
                  <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty + 1 })} style={{ background: 'none', border: 'none', padding: '8px 12px', cursor: 'pointer' }}><Icon name="plus" size={14} /></button>
                </div>
                <button onClick={() => dispatch({ type: 'REMOVE', id: item.id })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '8px' }}>
                  <Icon name="trash" size={16} />
                </button>
              </div>
              <div style={{ textAlign: 'right', minWidth: 80 }}>
                <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 20, fontWeight: 600 }}>₹{item.price * item.qty}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="card" style={{ padding: '32px', alignSelf: 'flex-start', position: 'sticky', top: 100 }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 26, marginBottom: 24 }}>Order Summary</h3>

          <div style={{ borderBottom: '1px solid var(--green-pale)', paddingBottom: 16, marginBottom: 16 }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
                <span style={{ color: 'var(--text-muted)' }}>{item.name} × {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
            <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
            <span>₹{cartTotal}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
            <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
            <span style={{ color: 'var(--green)', fontWeight: 500 }}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
          </div>
          {shipping > 0 && (
            <p style={{ fontSize: 12, color: 'var(--gold)', marginBottom: 8 }}>Add ₹{999 - cartTotal} more for free shipping!</p>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontFamily: 'Cormorant Garamond', fontWeight: 600, borderTop: '2px solid var(--green-pale)', paddingTop: 16, marginTop: 8, marginBottom: 24 }}>
            <span>Total</span>
            <span style={{ color: 'var(--green)' }}>₹{cartTotal + shipping}</span>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <input className="input" placeholder="Coupon code" style={{ flex: 1 }} />
            <button className="btn-outline" style={{ whiteSpace: 'nowrap' }}>Apply</button>
          </div>

          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => showToast('Redirecting to payment gateway...')}>
            Proceed to Checkout
          </button>

          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>🔒 SECURED BY RAZORPAY · SSL ENCRYPTED</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
