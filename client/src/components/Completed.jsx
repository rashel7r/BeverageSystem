import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/Completed.css';

function Completed() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [completedOrders, setCompletedOrders] = useState([]);

    useEffect(() => {
        // Load completed orders from localStorage
        const storedOrders = JSON.parse(localStorage.getItem('completedOrders') || '[]');
        setCompletedOrders(storedOrders);
    }, []);

    const handleBack = () => {
        navigate('/admin');
    };

    const getImagePath = (order) => {
        const imageMap = {
            coffee: {
                'Espresso': 'espresso.png',
                'Americano': 'americano.png',
                'Flat White': 'flat-white.png',
                'Cappuccino': 'cappuccino.png'
            },
            shakes: {
                'Berry Blast Smoothie': 'berryblast.jpg',
                'Tropical Smoothie': 'tropicalsmoothie.jpg',
                'Green Smoothie': 'greensmoothie.jpg',
                'Banana Shake': 'bananashake.jpg'
            },
            tea: {
                'Chai Latte': 'chailatte.jpg',
                'Classic Black Tea': 'classicblacktea.jpg',
                'Green Tea': 'greentea.jpg',
                'Matcha Latte': 'matchalatte.jpg'
            },
            bubbleTea: {
                'Brown Sugar Milk Tea': 'brownsugarmilktea.jpg',
                'Matcha Bubble Tea': 'matchabubbletea.jpg',
                'Tea Popping Boba': 'teapoppingboba.jpg',
                'Thai Bubble Tea': 'thaibubbletea.jpg'
            }
        };

        const categoryImages = imageMap[order.category] || {};
        const imageName = categoryImages[order.name] || 'default.jpg';
        return `/images/${order.category}/${imageName}`;
    };

    const filteredOrders = completedOrders.filter(order =>
        order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customization.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="completed-container">
            {/* Back Button */}
            <button className="back-button" onClick={handleBack} style={{ marginLeft: '2rem', marginTop: '-20px' }}>
                <FaArrowLeft style={{ fontSize: '1rem', color: 'white' }} />
            </button>

            {/* Cafe Title */}
            <div style={{
                position: 'absolute',
                top: '-4rem',
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
                        color: '#D27B44'
                    }}>Cafe</span>
                    <span style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold',
                        color: '#6E7061',
                        marginLeft: '4px'
                    }}>Asipiya</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="order-tabs">
                <button onClick={() => navigate('/admin')}>Orders</button>
                <button className="active">Completed</button>
            </div>

            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search ......."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>

            {/* Completed Orders List */}
            <div className="completed-orders-list">
                {filteredOrders.map(order => (
                    <div key={order.id} className="completed-order-item" style={{
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                        padding: '1rem',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginLeft: '6rem',
                        marginRight: '6rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                            <div className="order-image">
                                <img 
                                    src={getImagePath(order)}
                                    alt={order.name}
                                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                                    onError={(e) => {
                                        e.target.src = '/images/default.jpg';
                                    }}
                                />
                            </div>
                            <div>
                                <h3 style={{ margin: '0 0 0.5rem 0' }}>{order.name}</h3>
                                <p style={{ margin: '0 0 0.25rem 0', color: '#666' }}>
                                    customized - {order.customization}
                                </p>
                                <p style={{ margin: '0', color: '#666' }}>Time - {order.time}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <select 
                                className="status-dropdown"
                                value="completed"
                                disabled
                                style={{
                                    minWidth: '120px',
                                    padding: '0.5rem',
                                    borderRadius: '4px'
                                }}
                            >
                                <option value="completed">Completed</option>
                            </select>
                            <div className="order-number" style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                border: '2px solid #000',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                fontWeight: 'bold'
                            }}>
                                {order.orderNumber}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Completed; 