import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="card">
      <img src={product.thumbnail} alt={product.title} loading="lazy" />
      <div className="card-body">
        <h3>{product.title}</h3>
        <div className="card-meta">
          <span className="price">${product.price}</span>
          <span className="rating">★ {product.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
