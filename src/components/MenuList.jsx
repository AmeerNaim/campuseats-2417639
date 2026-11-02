import MenuItemCard from './MenuItemCard.jsx'

function MenuList({ items, vendorId, onView }) {
  if (!items || items.length === 0) {
    return <p className="muted">No items on this menu yet.</p>
  }

  return (
    <div className="grid">
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
          vendorId={vendorId}
          onView={onView}
        />
      ))}
    </div>
  )
}

export default MenuList