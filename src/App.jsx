import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
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
