import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';

const CartPage = () => {
  const { cart, dispatch, cartTotal, setCurrentPage, showToast } = useApp();

  if (cart.length === 0) return (
    <div className="cart-page cart-empty">
      <div className="cart-empty-orb">🛒</div>
      <span className="cart-eyebrow">SATTVA RITUALS</span>
      <h2>Your Cart is Empty</h2>
      <p>Add some healing remedies to begin your wellness journey.</p>
      <button className="btn-primary cart-shop-btn" onClick={() => setCurrentPage('shop')}><Icon name="leaf" size={16} /> Explore Remedies</button>
    </div>
  );

  const shipping = cartTotal >= 999 ? 0 : 99;

  return (
    <main className="cart-page">
      <header className="cart-header">
        <div>
          <span className="cart-eyebrow">YOUR WELLNESS JOURNEY</span>
          <h1>Your Cart</h1>
          <p>{cart.length} {cart.length === 1 ? 'item' : 'items'} selected for you</p>
        </div>
        <button className="cart-continue" onClick={() => setCurrentPage('shop')}>Continue Shopping <span>↗</span></button>
      </header>

      <div className="cart-layout">
        <section className="cart-items" aria-label="Cart items">
          {cart.map((item, index) => (
            <article key={item.id} className="cart-item card" style={{ animationDelay: `${index * 70}ms` }}>
              <div className="cart-item-image"><img src={item.image} alt={item.name} /></div>
              <div className="cart-item-details">
                <p className="cart-category">{item.category}</p>
                <h4>{item.name}</h4>
                <p className="cart-item-price">₹{item.price}</p>
              </div>
              <div className="cart-item-controls">
                <div className="qty-control" aria-label={`Quantity for ${item.name}`}>
                  <button aria-label="Decrease quantity" onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty - 1 })}><Icon name="minus" size={14} /></button>
                  <span>{item.qty}</span>
                  <button aria-label="Increase quantity" onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty + 1 })}><Icon name="plus" size={14} /></button>
                </div>
                <button className="remove-item" aria-label={`Remove ${item.name}`} onClick={() => dispatch({ type: 'REMOVE', id: item.id })}><Icon name="trash" size={16} /></button>
              </div>
              <div className="cart-line-total">₹{item.price * item.qty}</div>
            </article>
          ))}
        </section>

        <aside className="cart-summary card">
          <div className="summary-heading"><span>ORDER SUMMARY</span><Icon name="leaf" size={18} /></div>
          <h3>Complete your order</h3>
          <div className="summary-products">
            {cart.map(item => <div key={item.id}><span>{item.name} <small>× {item.qty}</small></span><strong>₹{item.price * item.qty}</strong></div>)}
          </div>
          <div className="summary-row"><span>Subtotal</span><span>₹{cartTotal}</span></div>
          <div className="summary-row"><span>Shipping</span><span className="shipping-value">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
          {shipping > 0 && <p className="free-shipping-note">Add ₹{999 - cartTotal} more for free shipping</p>}
          <div className="summary-total"><span>Total</span><strong>₹{cartTotal + shipping}</strong></div>
          <div className="coupon-row"><input className="input" placeholder="Coupon code" aria-label="Coupon code" /><button className="btn-outline">Apply</button></div>
          <button className="btn-primary checkout-button" onClick={() => showToast('Redirecting to payment gateway...')}><span>Proceed to Checkout</span><Icon name="arrow-right" size={15} /></button>
          <p className="secure-note">🔒 SECURED PAYMENT · SSL ENCRYPTED</p>
        </aside>
      </div>
    </main>
  );
};

export default CartPage;
