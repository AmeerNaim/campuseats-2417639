import { Link } from 'react-router-dom'
import VendorCard from '../components/VendorCard.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import { useVendors } from '../hooks/useVendors.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

function HomePage() {
  const { vendors, loading, error, reload } = useVendors()
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('campuseats-recent', [])

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  return (
    <>
      <section>
        <h2 className="section-title">Today's Vendors</h2>
        <div className="vendor-grid">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>

      {recentlyViewed.length > 0 && (
        <section style={{ marginTop: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="section-title">Recently Viewed</h2>
            <button
              type="button"
              className="link danger"
              onClick={() => setRecentlyViewed([])}
            >
              Clear
            </button>
          </div>
          <div className="grid">
            {recentlyViewed.map((item) => (
              <Link
                key={item.id}
                to={`/vendor/${item.vendorId}`}
                className="card"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <p className="tag">{item.category}</p>
                <h3>{item.name}</h3>
                <p className="price">RM {item.price.toFixed(2)}</p>
                <p className="muted" style={{ fontSize: '0.8rem' }}>View shop &rarr;</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default HomePage