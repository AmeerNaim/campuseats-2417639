import { useParams, Link } from 'react-router-dom'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import { useVendors } from '../hooks/useVendors.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

function VendorPage() {
  const { id } = useParams()
  const { vendors, loading, error, reload } = useVendors()
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('campuseats-recent', [])

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  const vendor = vendors.find((v) => v.id === id)

  if (!vendor) {
    return (
      <div className="card">
        <h2>Vendor Not Found</h2>
        <p className="muted">The requested vendor does not exist.</p>
        <Link to="/" className="btn" style={{ display: 'inline-block', width: 'auto', marginTop: '1rem', textDecoration: 'none' }}>
          Back to Vendors
        </Link>
      </div>
    )
  }

  function handleViewItem(item) {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id)
      return [{ ...item, vendorId: vendor.id }, ...filtered].slice(0, 5)
    })
  }

  return (
    <section>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--muted)', fontSize: '0.9rem' }}>
          &larr; All Vendors
        </Link>
        <h2 className="section-title" style={{ display: 'block' }}>{vendor.name}</h2>
        <p className="muted">{vendor.location} &middot; Open: {vendor.openHours}</p>
      </div>
      <MenuList items={vendor.menu} vendorId={vendor.id} onView={handleViewItem} />
    </section>
  )
}

export default VendorPage