import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
        <h2>No Orders Yet</h2>
        <p className="muted">You haven't placed any orders yet.</p>
        <Link to="/" className="btn" style={{ display: 'inline-block', width: 'auto', marginTop: '1rem', textDecoration: 'none' }}>
          Start Ordering
        </Link>
      </div>
    )
  }

  return (
    <section>
      <h2 className="section-title">My Orders</h2>
      <div style={{ display: 'grid', gap: '1.25rem' }}>
        {orders.map((ord) => (
          <div key={ord.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Order #{ord.id}</h3>
              <span className="status open">Confirmed</span>
            </div>
            <p className="muted">Customer: {ord.name} &middot; Mahallah: {ord.mahallah}</p>
            <p className="muted">Pickup Time: <strong>{ord.pickupTime}</strong></p>
            <ul style={{ paddingLeft: '1.2rem', margin: '0.5rem 0' }}>
              {ord.items.map((line) => (
                <li key={line.item.id}>
                  {line.qty}x {line.item.name} &mdash; RM {(line.item.price * line.qty).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="price" style={{ margin: '0.5rem 0 0' }}>Total: RM {ord.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OrdersPage