import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=30')
      .then((res) => {
        if (!res.ok) throw new Error('Could not load products')
        return res.json()
      })
      .then((data) => setProducts(data.products)) // DummyJSON returns an object, the array is data.products
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <section>
      <div className="page-header">
        <h1>All Products</h1>
        <input
          type="search"
          className="search"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p className="status">Loading products...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p className="status">No products match "{search}".</p>
      )}

      <div className="grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default Products
