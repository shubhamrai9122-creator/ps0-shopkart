function SortSelect({ value, onChange }) {
  return (
    <select
      className="sort"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="default">Sort: Featured</option>
      <option value="low">Price: Low to High</option>
      <option value="high">Price: High to Low</option>
    </select>
  )
}

export default SortSelect
