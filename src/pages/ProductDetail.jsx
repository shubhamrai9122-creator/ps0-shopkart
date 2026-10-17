import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatCategory } from '../utils/sortProducts.js'

function ProductDetail({ onAddToCart }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeImage, setActiveImage] = useState('')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found')
        return res.json()
      })
      .then((data) => {
        setProduct(data)
        setActiveImage(data.images?.[0] || data.thumbnail)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="status">Loading product...</p>

  if (error) {
    return (
      <div className="status error">
        <p>{error}</p>
        <Link to="/products" className="btn btn-primary">
          Back to products
        </Link>
      </div>
    )
  }

  const originalPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2)

  return (
    <section>
      <Link to="/products" className="back-link">
        &larr; Back to products
      </Link>

      <div className="detail">
        <div className="detail-gallery">
          <img src={activeImage} alt={product.title} className="detail-image" />
          {product.images.length > 1 && (
            <div className="thumbs">
              {product.images.map((img) => (
                <button
                  key={img}
                  className={img === activeImage ? 'thumb active' : 'thumb'}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detail-info">
          <Link
            to={`/category/${product.category}`}
            className="detail-category"
          >
            {formatCategory(product.category)}
          </Link>
          <h1>{product.title}</h1>
          <p className="detail-brand">
            Brand: <strong>{product.brand || 'Generic'}</strong>
          </p>
          <p className="rating">★ {product.rating.toFixed(1)} / 5</p>

          <div className="detail-price">
            <span className="price big">${product.price}</span>
            <span className="old-price">${originalPrice}</span>
            <span className="discount">
              {product.discountPercentage}% off
            </span>
          </div>

          <p className={product.stock < 10 ? 'stock low' : 'stock'}>
            {product.stock > 0
              ? `In stock: ${product.stock} left`
              : 'Out of stock'}
          </p>

          <p className="detail-desc">{product.description}</p>

          <button
            className="btn btn-primary"
            disabled={product.stock === 0}
            onClick={() => {
              onAddToCart()
              setAdded(true)
            }}
          >
            Add to Cart
          </button>
          {added && <span className="added-msg">✓ Added to cart</span>}
        </div>
      </div>

      <div className="reviews">
        <h2>Customer Reviews ({product.reviews.length})</h2>
        {product.reviews.length === 0 && <p>No reviews yet.</p>}
        <ul>
          {product.reviews.map((review, index) => (
            <li key={index} className="review">
              <div className="review-head">
                <strong>{review.reviewerName}</strong>
                <span className="rating">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </span>
              </div>
              <p>{review.comment}</p>
              <small>{new Date(review.date).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ProductDetail
