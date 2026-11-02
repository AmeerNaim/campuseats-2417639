import { Link, useNavigate } from 'react-router-dom'
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'
import { useCart } from '../hooks/useCart.js'

function CartPage() {
  const { cart, total, placeOrder } = useCart()
  const navigate = useNavigate()

  function handlePlaceOrder(details) {
    placeOrder(details)
    navigate('/orders')
  }

  if (cart.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
        <p className="muted">Your cart is empty. Pick something from a menu first.</p>
        <Link to="/" className="btn" style={{ display: 'inline-block', width: 'auto', marginTop: '1rem', textDecoration: 'none' }}>
          Browse Menus
        </Link>
      </div>
    )
  }

  return (
    <div className="cart-layout">
      <div className="card">
        <ul className="cart-list">
          {cart.map((line) => (
            <CartItem key={line.item.id} line={line} />
          ))}
        </ul>
        <p className="cart-total">Total: RM {total.toFixed(2)}</p>
      </div>
      <CheckoutForm onPlaceOrder={handlePlaceOrder} />
    </div>
  )
}

export default CartPage