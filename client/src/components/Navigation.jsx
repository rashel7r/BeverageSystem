import '../styles/Navigation.css'

function Navigation({ selectedCategory, onCategoryChange }) {
  return (
    <nav className="category-nav">
      <ul>
        <li className={selectedCategory === 'coffee' ? 'active' : ''}>
          <button onClick={() => onCategoryChange('coffee')}>Coffee</button>
        </li>
        <li className={selectedCategory === 'shakes' ? 'active' : ''}>
          <button onClick={() => onCategoryChange('shakes')}>Shakes</button>
        </li>
        <li className={selectedCategory === 'tea' ? 'active' : ''}>
          <button onClick={() => onCategoryChange('tea')}>Tea</button>
        </li>
        <li className={selectedCategory === 'bubbleTea' ? 'active' : ''}>
          <button onClick={() => onCategoryChange('bubbleTea')}>Bubble Tea</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation 