import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </section>
  )
}

export default NotFound
