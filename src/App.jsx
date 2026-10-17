import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Category from './pages/Category.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  // Cart state lives in App so both Navbar and ProductDetail can use it
  const [cartCount, setCartCount] = useState(0)

  function addToCart() {
    setCartCount((count) => count + 1)
  }

  return (
    <>
      <Navbar cartCount={cartCount} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/:id"
            element={<ProductDetail onAddToCart={addToCart} />}
          />
          <Route path="/category/:name" element={<Category />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        ShopKart &copy; 2026 &middot; Data from DummyJSON
      </footer>
    </>
  )
}

export default App
