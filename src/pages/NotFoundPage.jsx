import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <h2>404</h2>
      <p className="muted">Page not found.</p>
      <Link to="/" className="btn" style={{ display: 'inline-block', width: 'auto', marginTop: '1rem', textDecoration: 'none' }}>
        Return Home
      </Link>
    </div>
  )
}

export default NotFoundPage