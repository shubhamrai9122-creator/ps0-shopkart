import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import SortSelect from '../components/SortSelect.jsx'
import { formatCategory, sortProducts } from '../utils/sortProducts.js'

function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('default')

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=30')
      .then((res) => {
        if (!res.ok) throw new Error('Could not load products')
        return res.json()
      })
      .then((data) => setProducts(data.products)) // DummyJSON returns an object, the array is data.products
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))

    fetch('https://dummyjson.com/products/category-list')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setCategories([]))
  }, [])

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  )
  const sorted = sortProducts(filtered, sortOrder)

  return (
    <section>
      <div className="page-header">
        <h1>All Products</h1>
        <div className="controls">
          <input
            type="search"
            className="search"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SortSelect value={sortOrder} onChange={setSortOrder} />
        </div>
      </div>

      {categories.length > 0 && (
        <div className="categories">
          {categories.map((cat) => (
            <Link key={cat} to={`/category/${cat}`} className="chip">
              {formatCategory(cat)}
            </Link>
          ))}
        </div>
      )}

      {loading && <p className="status">Loading products...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && sorted.length === 0 && (
        <p className="status">No products match "{search}".</p>
      )}

      <div className="grid">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default Products
