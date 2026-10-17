// Returns a new array sorted by price. order: 'low' | 'high' | anything else = original order
export function sortProducts(products, order) {
  const copy = [...products]
  if (order === 'low') copy.sort((a, b) => a.price - b.price)
  if (order === 'high') copy.sort((a, b) => b.price - a.price)
  return copy
}

// "home-decoration" -> "Home Decoration"
export function formatCategory(name) {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
