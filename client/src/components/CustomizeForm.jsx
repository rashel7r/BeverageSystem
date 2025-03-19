import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { BiCoffee } from 'react-icons/bi';
import { IoIosArrowBack } from 'react-icons/io';
import '../styles/CustomizeForm.css';

function CustomizeForm() {
    const { category, beverageId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [beverage, setBeverage] = useState(location.state?.beverage || null);
    const [selectedMilk, setSelectedMilk] = useState('Whole Milk');
    const [selectedSyrup, setSelectedSyrup] = useState('');
    const [selectedSweetener, setSelectedSweetener] = useState('');
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [loading, setLoading] = useState(!location.state?.beverage);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Only fetch if we don't have the beverage data from state
        if (!location.state?.beverage) {
            fetchBeverage();
        }
    }, [category, beverageId, location.state]);

    const fetchBeverage = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/beverages/${category}/${beverageId}`);
            if (!response.ok) throw new Error(`Server returned ${response.status}`);
            const data = await response.json();
            setBeverage(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching beverage:', error);
            setError('Unable to load beverage details. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const milkOptions = [
        { name: 'Whole Milk', price: 0.30 },
        { name: 'Almond Milk', price: 0.40 },
        { name: 'Soy Milk', price: 0.70 }
    ];

    const syrupOptions = [
        'Caramel',
        'Vanilla',
        'Hazelnut',
        'Chocolate',
        'Brown Sugar'
    ];

    const sweetenerOptions = [
        'Sugar',
        'Honey',
        'Stevia',
        'None'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const cartItem = {
            ...beverage,
            milk: selectedMilk,
            syrup: selectedSyrup,
            sweetener: selectedSweetener,
            specialInstructions,
            quantity: 1,
            category: category
        };

        // Get existing cart items or initialize empty array
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        // Add new item to cart
        const updatedCart = [...existingCart, cartItem];
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        // Navigate to cart page with state
        navigate('/cart', {
            state: {
                from: 'customize',
                category: category,
                beverageId: beverageId
            }
        });
    };

    const handleBack = () => {
        // Navigate to the appropriate menu based on category
        switch(category) {
            case 'coffee':
                navigate('/coffee');
                break;
            case 'tea':
                navigate('/tea');
                break;
            case 'shakes':
                navigate('/shakes');
                break;
            case 'bubbleTea':
                navigate('/bubbleTea');
                break;
            default:
                navigate('/coffee'); // Default to coffee menu
        }
    };

    const getImagePath = (beverage, category) => {
        const imageMaps = {
            coffee: {
                'Espresso': 'espresso.png',
                'Americano': 'americano.png',
                'Flat White': 'flat-white.png',
                'Cappuccino': 'cappuccino.png'
            },
            tea: {
                'Chai Latte': 'chailatte.jpg',
                'Classic Black Tea': 'classicblacktea.jpg',
                'Green Tea': 'greentea.jpg',
                'Matcha Latte': 'matchalatte.jpg'
            },
            shakes: {
                'Berry Blast Smoothie': 'berryblast.jpg',
                'Tropical Smoothie': 'tropicalsmoothie.jpg',
                'Green Smoothie': 'greensmoothie.jpg',
                'Banana Shake': 'bananashake.jpg'
            },
            bubbleTea: {
                'Brown Sugar Milk Tea': 'brownsugarmilktea.jpg',
                'Matcha Bubble Tea': 'matchabubbletea.jpg',
                'Tea Popping Boba': 'teapoppingboba.jpg',
                'Thai Bubble Tea': 'thaibubbletea.jpg'
            }
        };

        const categoryImages = imageMaps[category] || {};
        const imageName = categoryImages[beverage?.name] || `default.${category === 'coffee' ? 'png' : 'jpg'}`;
        return `/images/${category}/${imageName}`;
    };

    if (loading) return <div className="loading">Loading beverage details...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!beverage) return <div className="error">Beverage not found</div>;

    return (
        <div className="customize-form-container" style={{ 
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
        }}>
            <div className="customize-header">
                <button className="back-button" onClick={handleBack} style={{ marginTop: '-50px' }}>
                    <FaArrowLeft style={{ fontSize: '1rem', color: 'white' }} />
                </button>
                
                <div style={{
                    position: 'absolute',
                    top: '-95px',
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

                <div className="beverage-header">
                    <div className="beverage-content">
                        <img 
                            src={getImagePath(beverage, category)}
                            alt={beverage?.name}
                            className="beverage-image"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `/images/${category}/default.${category === 'coffee' ? 'png' : 'jpg'}`;
                            }}
                        />
                        <h2>{beverage?.name}</h2>
                    </div>
                </div>
            </div>

            <form className="customize-form" onSubmit={handleSubmit}>
                <div className="form-section">
                    <h3>Milk Choices</h3>
                    <div className="options-list">
                        {milkOptions.map((option) => (
                            <div key={option.name} className="option-item">
                                <label>
                                    <input
                                        type="radio"
                                        name="milk"
                                        value={option.name}
                                        checked={selectedMilk === option.name}
                                        onChange={(e) => setSelectedMilk(e.target.value)}
                                    />
                                    {option.name}
                                    <span className="price-tag">+${option.price.toFixed(2)}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-section">
                    <h3>Flavours Syrups</h3>
                    <select
                        className="dropdown-select"
                        value={selectedSyrup}
                        onChange={(e) => setSelectedSyrup(e.target.value)}
                    >
                        <option value="">Select a syrup</option>
                        {syrupOptions.map((syrup) => (
                            <option key={syrup} value={syrup}>{syrup}</option>
                        ))}
                    </select>
                </div>

                <div className="form-section">
                    <h3>Sweeteners</h3>
                    <select
                        className="dropdown-select"
                        value={selectedSweetener}
                        onChange={(e) => setSelectedSweetener(e.target.value)}
                    >
                        <option value="">Select a sweetener</option>
                        {sweetenerOptions.map((sweetener) => (
                            <option key={sweetener} value={sweetener}>{sweetener}</option>
                        ))}
                    </select>
                </div>

                <div className="form-section">
                    <h3>Special Instructions</h3>
                    <textarea
                        className="special-instructions"
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        placeholder="Any special requests?"
                    />
                    <button type="submit" className="add-to-cart-button">
                        <FaShoppingCart /> Add to Cart
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CustomizeForm; 