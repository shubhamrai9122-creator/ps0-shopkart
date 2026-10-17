import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="hero">
      <div className="hero-text">
        <p className="hero-tag">New season, new deals</p>
        <h1>Everything you need, all in one cart.</h1>
        <p>
          ShopKart is a mini online store built with React and React Router.
          Browse beauty, fragrances, furniture and groceries, search by name,
          and open any product to see its details and customer reviews.
        </p>
        <Link to="/products" className="btn btn-primary">
          Shop now
        </Link>
      </div>
      <div className="hero-art" aria-hidden="true">
        🛍️
      </div>
    </section>
  )
}

export default Home
