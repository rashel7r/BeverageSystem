import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/SpecialInstructions.css';

function SpecialInstructions() {
    const [activeTab, setActiveTab] = useState('orders');
    const [searchQuery, setSearchQuery] = useState('');
    const [completedOrders, setCompletedOrders] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { order } = location.state || {};

    useEffect(() => {
        // Load completed orders from localStorage when component mounts or tab changes
        if (activeTab === 'completed') {
            const storedOrders = JSON.parse(localStorage.getItem('completedOrders') || '[]');
            setCompletedOrders(storedOrders);
        }
    }, [activeTab]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'completed') {
            // Load completed orders from localStorage when switching to completed tab
            const storedOrders = JSON.parse(localStorage.getItem('completedOrders') || '[]');
            setCompletedOrders(storedOrders);
        }
    };

    // Filter completed orders based on search query
    const filteredCompletedOrders = completedOrders.filter(order =>
        order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customization.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Instructions based on drink type
    const getDrinkInstructions = (drinkName) => {
        const instructions = {
            'Espresso': {
                'Extra Hot': [
                    'Preheat the cup by rinsing it with hot water.',
                    'Ensure the espresso machine is at the higher end of the temperature range (around 93°C/200°F).',
                ],
                'Double Shot': [
                    'Use 18-20 grams of coffee for a double shot.',
                    'Extract approximately 60ml of espresso.',
                ]
            },
            'Americano': {
                'Preparation': [
                    'Pull a double shot of espresso.',
                    'Add hot water to fill the cup (approximately 180ml).',
                    'Serve immediately while hot.'
                ]
            },
            'Flat White': {
                'Milk Preparation': [
                    'Steam milk to create microfoam (around 60-65°C).',
                    'Ensure smooth, silky texture with minimal bubbles.'
                ],
                'Assembly': [
                    'Pour steamed milk over the espresso shot.',
                    'Create latte art if desired.'
                ]
            },
            'Cappuccino': {
                'Milk Preparation': [
                    'Steam milk to create a rich, creamy foam.',
                    'Aim for equal parts espresso, steamed milk, and foam.'
                ],
                'Assembly': [
                    'Pour steamed milk over the espresso shot.',
                    'Top with foam and optionally dust with cocoa powder.'
                ]
            }
        };

        return instructions[drinkName] || {
            'Standard Preparation': [
                'Follow standard recipe guidelines.',
                'Check temperature requirements.',
                'Ensure proper mixing of ingredients.'
            ]
        };
    };

    return (
        <div className="special-instructions-container" style={{ 
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
        }}>
            {/* Back Button */}
            <button className="back-button" onClick={handleBack} style={{ marginLeft: '2rem', marginTop: '-20px' }}>
                <FaArrowLeft style={{ fontSize: '1rem', color: 'white' }} />
            </button>

            {/* Header Section */}
            <div className="header-section">
                {/* Order Tabs */}
                <div className="order-tabs">
                    <button 
                        className={activeTab === 'orders' ? 'active' : ''} 
                        onClick={() => handleTabChange('orders')}
                    >
                        Orders
                    </button>
                    <button 
                        className={activeTab === 'completed' ? 'active' : ''} 
                        onClick={() => handleTabChange('completed')}
                    >
                        Completed
                    </button>
                </div>

                {/* Cafe Title */}
                <div style={{
                    position: 'absolute',
                    top: '-8rem',
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
            </div>

            {/* Content */}
            {activeTab === 'completed' ? (
                <>
                    {/* Search Bar */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '4rem auto 2rem',
                        width: '100%',
                        maxWidth: '600px',
                        padding: '0 2rem',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        <div style={{
                            position: 'relative',
                            width: '100%'
                        }}>
                            <input
                                type="text"
                                placeholder="Search ......."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 40px 12px 20px',
                                    borderRadius: '25px',
                                    border: '1px solid #e0e0e0',
                                    fontSize: '1rem',
                                    backgroundColor: '#f8f8f8'
                                }}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    style={{
                                        position: 'absolute',
                                        right: '65px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            )}
                            <button style={{
                                position: 'absolute',
                                right: '15px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Completed Orders List */}
                    <div className="orders-list" style={{ 
                        marginTop: '2rem',
                        position: 'relative',
                        zIndex: 0,
                        minHeight: '200px',
                        overflowY: 'auto'
                    }}>
                        {filteredCompletedOrders.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '2rem',
                                color: '#666'
                            }}>
                                No completed orders found
                            </div>
                        ) : (
                            filteredCompletedOrders.map(order => (
                                <div key={order.id} className="order-item" style={{
                                    borderBottom: '1px solid #e0e0e0',
                                    padding: '1.5rem 0',
                                    marginLeft: '6rem',
                                    marginRight: '6rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#fff'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div className="order-image">
                                            <img 
                                                src={`/images/${order.category}/${order.image}`}
                                                alt={order.name}
                                                style={{ 
                                                    width: '80px', 
                                                    height: '80px', 
                                                    objectFit: 'cover', 
                                                    borderRadius: '8px'
                                                }}
                                                onError={(e) => {
                                                    e.target.src = '/images/default.jpg';
                                                }}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                            <h3 style={{ 
                                                margin: '0',
                                                fontSize: '1.2rem',
                                                fontWeight: '600'
                                            }}>{order.name}</h3>
                                            <p style={{ 
                                                margin: '0',
                                                color: '#666',
                                                fontSize: '0.9rem'
                                            }}>
                                                customized - {order.customization}
                                            </p>
                                            <p style={{ 
                                                margin: '0',
                                                color: '#666',
                                                fontSize: '0.9rem'
                                            }}>Time - {order.time}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                        <select 
                                            className="status-dropdown"
                                            value="completed"
                                            disabled
                                            style={{
                                                minWidth: '120px',
                                                padding: '0.5rem',
                                                borderRadius: '4px',
                                                border: '1px solid #D27B44',
                                                backgroundColor: '#f8f8f8',
                                                outline: 'none',
                                                cursor: 'not-allowed',
                                                fontSize: '0.9rem',
                                                color: '#333'
                                            }}
                                        >
                                            <option value="completed">Completed</option>
                                        </select>
                                        <div style={{
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
                            ))
                        )}
                    </div>
                </>
            ) : (
                <div className="instructions-content">
                    <div className="title-section">
                        <div className="title-with-number">
                            <h2 className="special-instructions-title">Special Instructions</h2>
                            <div className="order-number-circle">
                                {order?.orderNumber || '1'}
                            </div>
                        </div>
                    </div>
                    
                    <div className="order-info">
                        <div className="beverage-section">
                            <div className="beverage-info">
                                <img 
                                    src={order?.image} 
                                    alt={order?.name || 'Beverage'}
                                    className="beverage-image"
                                    onError={(e) => {
                                        e.target.src = '/images/default.jpg';
                                    }}
                                />
                                <h3>{order?.name || 'Beverage'}</h3>
                            </div>
                            <select 
                                className="status-dropdown"
                                defaultValue="process"
                                style={{
                                    minWidth: '120px',
                                    padding: '0.5rem',
                                    borderRadius: '4px',
                                    border: '1px solid #D27B44',
                                    backgroundColor: '#fff',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    color: '#333'
                                }}
                            >
                                <option value="process">Process</option>
                                <option value="preparing">Preparing</option>
                                <option value="ready">Ready</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div className="customize-section" style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                            padding: '1rem',
                            marginBottom: '1rem'
                        }}>
                            <h4>Customize</h4>
                            <div className="customize-details">
                                {order?.customization?.split(', ').map((item, index) => (
                                    <p key={index}>{item}</p>
                                )) || (
                                    <p>No customization specified</p>
                                )}
                            </div>
                        </div>

                        <div className="order-details" style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                            padding: '1rem',
                            marginBottom: '1rem'
                        }}>
                            <div className="detail-item">
                                <span>Item - {order?.id || '2'}</span>
                            </div>
                            <div className="detail-item">
                                <span>Time - {order?.time || '15min'}</span>
                            </div>
                        </div>

                        <div className="instructions-section" style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                            padding: '1rem'
                        }}>
                            <h4>Instructions</h4>
                            <div className="instructions-details">
                                {Object.entries(getDrinkInstructions(order?.name)).map(([category, steps]) => (
                                    <div key={category} className="instruction-category">
                                        <h5>{category}:</h5>
                                        <ul>
                                            {steps.map((step, index) => (
                                                <li key={index}>{step}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SpecialInstructions; 