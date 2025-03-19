import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from './Navigation'
import '../styles/CoffeeMenu.css'

function CoffeeMenu() {
    const [beverages, setBeverages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchCoffees()
        
        let lastScrollY = window.scrollY;
        
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar-container');
            const currentScrollY = window.scrollY;
            
            if (currentScrollY < lastScrollY) {
                // Scrolling up
                navbar.classList.add('visible');
            } else {
                // Scrolling down
                navbar.classList.remove('visible');
            }
            
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    const fetchCoffees = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/beverages/coffee')
            if (!response.ok) throw new Error(`Server returned ${response.status}`)
            const data = await response.json()
            setBeverages(data)
            setError(null)
        } catch (error) {
            console.error('Error fetching coffees:', error)
            setError('Unable to load coffee menu. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    const handleCustomize = (beverage) => {
        navigate(`/customize/coffee/${beverage._id}`, { 
            state: { 
                beverage,
                category: 'coffee'
            }
        })
    }

    const handleCategoryChange = (category) => {
        navigate(`/${category}`);
    };

    if (loading) return <div className="loading">Loading coffee menu...</div>
    if (error) {
        return (
            <div className="error">
                <p>{error}</p>
                <button onClick={fetchCoffees} className="retry-button">Retry</button>
            </div>
        )
    }

    return (
        <div>
            <div style={{
                position: 'absolute',
                top: '1rem',
                right: '-8rem',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                marginLeft: 'auto',
                width: 'auto',
                whiteSpace: 'nowrap',
                overflow: 'visible',
                transform: 'translateX(-110px)'
            }}>
                <span style={{ 
                    fontSize: '1.5rem', 
                    marginRight: '0.3rem',
                    display: 'inline-block'
                }}>🍵</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold',
                        color: '#E4794A'
                    }}>Cafe</span>
                    <span style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold',
                        color: '#6E7061',
                        marginLeft: '4px'
                    }}>Asipiya</span>
                </div>
            </div>
            <div className="navbar-container">
                <Navigation 
                    selectedCategory="coffee"
                    onCategoryChange={handleCategoryChange}
                />
            </div>
            <div className="coffee-menu">
                <div className="menu-content">
                    <h2 className="category-title">Coffee Menu</h2>
                    <div className="beverage-list">
                        {beverages.map((beverage) => (
                            <div key={beverage._id} className="beverage-item">
                                <div className="beverage-image">
                                    <img
                                        src={`/images/coffee/${beverage.name.toLowerCase().replace(/\s+/g, '-')}.png`}
                                        alt={beverage.name}
                                    />
                                </div>
                                <div className="beverage-details">
                                    <div className="beverage-header">
                                        <h3>{beverage.name} - ${beverage.price.toFixed(2)}</h3>
                                    </div>
                                    <p className="description">{beverage.description}</p>
                                    <button 
                                        className="customize-button"
                                        onClick={() => handleCustomize(beverage)}
                                    >
                                        Customize
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoffeeMenu