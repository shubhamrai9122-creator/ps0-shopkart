import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import SortSelect from '../components/SortSelect.jsx'
import { formatCategory, sortProducts } from '../utils/sortProducts.js'

function Category() {
  const { name } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortOrder, setSortOrder] = useState('default')

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${name}`)
      .then((res) => {
        if (!res.ok) throw new Error('Could not load this category')
        return res.json()
      })
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [name])

  const sorted = sortProducts(products, sortOrder)

  return (
    <section>
      <Link to="/products" className="back-link">
        &larr; All products
      </Link>

      <div className="page-header">
        <h1>{formatCategory(name)}</h1>
        <SortSelect value={sortOrder} onChange={setSortOrder} />
      </div>

      {loading && <p className="status">Loading products...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="status">No products found in this category.</p>
      )}

      <div className="grid">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default Category
