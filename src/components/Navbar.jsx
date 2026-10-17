import { Link, NavLink } from 'react-router-dom'

function Navbar({ cartCount }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          Shop<span>Kart</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/products">Products</NavLink>
          <span className="cart" title="Items in cart">
            🛒 Cart <span className="cart-count">{cartCount}</span>
          </span>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
