import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from './Navigation'
import '../styles/ShakesMenu.css'

function ShakesMenu() {
    const [beverages, setBeverages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchShakes()
        
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

    const fetchShakes = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/beverages/shakes')
            if (!response.ok) throw new Error(`Server returned ${response.status}`)
            const data = await response.json()
            setBeverages(data)
            setError(null)
        } catch (error) {
            console.error('Error fetching shakes:', error)
            setError('Unable to load shakes menu. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    const handleCustomize = (beverage) => {
        navigate(`/customize/shakes/${beverage._id}`, { 
            state: { 
                beverage,
                category: 'shakes'
            }
        })
    }

    const handleCategoryChange = (category) => {
        navigate(`/${category}`);
    };

    if (loading) return <div className="loading">Loading shakes menu...</div>
    if (error) {
        return (
            <div className="error">
                <p>{error}</p>
                <button onClick={fetchShakes} className="retry-button">Retry</button>
            </div>
        )
    }

    const getImagePath = (beverage) => {
        const imageMap = {
            'Banana Shake': 'bananashake.jpg',
            'Berry Blast Smoothie': 'berryblast.jpg',
            'Green Smoothie': 'greensmoothie.jpg',
            'Tropical Smoothie': 'tropicalsmoothie.jpg'
        };
        return `/images/shakes/${imageMap[beverage.name] || 'default-shake.jpg'}`;
    };

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
                    selectedCategory="shakes"
                    onCategoryChange={handleCategoryChange}
                />
            </div>
            <div className="shakes-menu">
                <div className="menu-content">
                    <h2 className="category-title">Smoothies & Shakes</h2>
                    <div className="beverage-list">
                        {beverages.map((beverage) => (
                            <div key={beverage._id} className="beverage-item">
                                <div className="beverage-image">
                                    <img
                                        src={getImagePath(beverage)}
                                        alt={beverage.name}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/images/shakes/default-shake.jpg';
                                        }}
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

export default ShakesMenu 