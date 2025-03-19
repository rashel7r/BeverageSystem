import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from './Navigation'
import '../styles/TeaMenu.css'

function TeaMenu() {
    const [beverages, setBeverages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchTeas()
        
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

    const fetchTeas = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/beverages/tea')
            if (!response.ok) throw new Error(`Server returned ${response.status}`)
            const data = await response.json()
            setBeverages(data)
            setError(null)
        } catch (error) {
            console.error('Error fetching teas:', error)
            setError('Unable to load tea menu. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    const handleCustomize = (beverage) => {
        navigate(`/customize/tea/${beverage._id}`, { 
            state: { 
                beverage,
                category: 'tea'
            }
        })
    }

    const handleCategoryChange = (category) => {
        navigate(`/${category}`);
    };

    if (loading) return <div className="loading">Loading tea menu...</div>
    if (error) {
        return (
            <div className="error">
                <p>{error}</p>
                <button onClick={fetchTeas} className="retry-button">Retry</button>
            </div>
        )
    }

    const getImagePath = (beverage) => {
        const imageMap = {
            'Chai Latte': 'chailatte.jpg',
            'Classic Black Tea': 'classicblacktea.jpg',
            'Green Tea': 'greentea.jpg',
            'Matcha Latte': 'matchalatte.jpg'
        };
        return `/images/tea/${imageMap[beverage.name] || 'default-tea.jpg'}`;
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
                    selectedCategory="tea"
                    onCategoryChange={handleCategoryChange}
                />
            </div>
            <div className="tea-menu">
                <div className="menu-content">
                    <h2 className="category-title">Tea Menu</h2>
                    <div className="beverage-list">
                        {beverages.map((beverage) => (
                            <div key={beverage._id} className="beverage-item">
                                <div className="beverage-image">
                                    <img
                                        src={getImagePath(beverage)}
                                        alt={beverage.name}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/images/tea/default-tea.jpg';
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

export default TeaMenu 