import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';

const CartPage = () => {
  const { cart, dispatch, cartTotal, setCurrentPage, showToast } = useApp();

  if (cart.length === 0) return (
    <div className="cart-page cart-empty">
      <div className="cart-empty-icon">🛒</div>
      <h2>Your Cart is Empty</h2>
      <p>Add some healing remedies to begin your wellness journey.</p>
      <button className="btn-primary" onClick={() => setCurrentPage('shop')}><Icon name="leaf" size={16} /> Explore Remedies</button>
    </div>
  );

  const shipping = cartTotal >= 999 ? 0 : 99;

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item card">
              <div className="cart-item-image"><img src={item.image} alt={item.name} /></div>
              <div className="cart-item-details">
                <p className="cart-category">{item.category}</p>
                <h4>{item.name}</h4>
                <p className="cart-item-price">₹{item.price}</p>
              </div>
              <div className="cart-item-controls">
                <div className="qty-control">
                  <button aria-label="Decrease quantity" onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty - 1 })}><Icon name="minus" size={14} /></button>
                  <span>{item.qty}</span>
                  <button aria-label="Increase quantity" onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty + 1 })}><Icon name="plus" size={14} /></button>
                </div>
                <button className="remove-item" aria-label={`Remove ${item.name}`} onClick={() => dispatch({ type: 'REMOVE', id: item.id })}><Icon name="trash" size={16} /></button>
              </div>
              <div className="cart-line-total">₹{item.price * item.qty}</div>
            </div>
          ))}
        </div>

        <div className="cart-summary card">
          <h3>Order Summary</h3>
          <div className="summary-products">
            {cart.map(item => <div key={item.id}><span>{item.name} × {item.qty}</span><span>₹{item.price * item.qty}</span></div>)}
          </div>
          <div className="summary-row"><span>Subtotal</span><span>₹{cartTotal}</span></div>
          <div className="summary-row"><span>Shipping</span><span className="shipping-value">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
          {shipping > 0 && <p className="free-shipping-note">Add ₹{999 - cartTotal} more for free shipping!</p>}
          <div className="summary-total"><span>Total</span><span>₹{cartTotal + shipping}</span></div>
          <div className="coupon-row"><input className="input" placeholder="Coupon code" /><button className="btn-outline">Apply</button></div>
          <button className="btn-primary checkout-button" onClick={() => showToast('Redirecting to payment gateway...')}>Proceed to Checkout</button>
          <p className="secure-note">🔒 SECURED BY RAZORPAY · SSL ENCRYPTED</p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
