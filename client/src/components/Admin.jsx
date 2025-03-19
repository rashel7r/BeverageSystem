import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/Admin.css';

function Admin() {
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([
        {
            id: 1,
            name: 'Espresso',
            category: 'coffee',
            customization: 'Whole Milk, Vanilla',
            time: '15min',
            status: 'process',
            orderNumber: '1',
            image: 'espresso.png'
        },
        {
            id: 2,
            name: 'Americano',
            category: 'coffee',
            customization: 'Whole Milk, Vanilla',
            time: '15min',
            status: 'process',
            orderNumber: '2',
            image: 'americano.png'
        },
        {
            id: 3,
            name: 'Flat White',
            category: 'coffee',
            customization: 'Whole Milk, Vanilla',
            time: '15min',
            status: 'process',
            orderNumber: '3',
            image: 'flat-white.png'
        },
        {
            id: 4,
            name: 'Cappuccino',
            category: 'coffee',
            customization: 'Whole Milk',
            time: '15min',
            status: 'process',
            orderNumber: '4',
            image: 'cappuccino.png'
        }
    ]);
    const [completedOrders, setCompletedOrders] = useState([
        {
            id: 5,
            name: 'Espresso',
            category: 'coffee',
            customization: 'Whole Milk, Vanilla',
            time: '15min',
            status: 'completed',
            orderNumber: '5',
            image: 'espresso.png'
        },
        {
            id: 6,
            name: 'Americano',
            category: 'coffee',
            customization: 'Whole Milk, Vanilla',
            time: '15min',
            status: 'completed',
            orderNumber: '6',
            image: 'americano.png'
        }
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Load completed orders from localStorage
        const storedOrders = JSON.parse(localStorage.getItem('completedOrders') || '[]');
        // If there are no stored orders, use the initial state
        if (storedOrders.length === 0) {
            localStorage.setItem('completedOrders', JSON.stringify(completedOrders));
        } else {
            setCompletedOrders(storedOrders);
        }
    }, []);

    const handleBack = () => {
        navigate('/feedback-display');
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'completed') {
            // Load completed orders from localStorage when switching to completed tab
            const storedOrders = JSON.parse(localStorage.getItem('completedOrders') || '[]');
            setCompletedOrders(storedOrders);
        }
    };

    const handleStatusChange = (orderId, newStatus) => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                return { ...order, status: newStatus };
            }
            return order;
        });
        setOrders(updatedOrders);

        if (newStatus === 'completed') {
            // Store the completed order in localStorage
            const completedOrder = updatedOrders.find(order => order.id === orderId);
            const existingCompleted = JSON.parse(localStorage.getItem('completedOrders') || '[]');
            const newCompletedOrders = [...existingCompleted, completedOrder];
            localStorage.setItem('completedOrders', JSON.stringify(newCompletedOrders));
            setCompletedOrders(newCompletedOrders);
            
            // Remove the order from the active orders list
            setOrders(updatedOrders.filter(order => order.id !== orderId));
        }
    };

    const handleBookClick = (order) => {
        const orderWithImagePath = {
            ...order,
            image: getImagePath(order)
        };
        navigate('/special-instructions', {
            state: { order: orderWithImagePath }
        });
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

    const filteredOrders = activeTab === 'completed' 
        ? completedOrders.filter(order =>
            order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customization.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : orders;

    return (
        <div className="admin-container">
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

            {/* Search Bar */}
            {activeTab === 'completed' && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '6rem auto 2rem',
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
            )}

            {/* Orders List */}
            <div className="orders-list" style={{ 
                marginTop: activeTab === 'completed' ? '2rem' : '2rem',
                position: 'relative',
                zIndex: 0,
                minHeight: '200px',
                overflowY: 'auto'
            }}>
                {activeTab === 'orders' && (
                    <h2 style={{ 
                        marginLeft: '6rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '2rem'
                    }}>
                        Orders
                        <div className="sort-container">
                            <select className="sort-dropdown">
                                <option value="short">Short</option>
                                <option value="long">Long</option>
                            </select>
                        </div>
                    </h2>
                )}
                {filteredOrders.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '2rem',
                        color: '#666'
                    }}>
                        No orders found
                    </div>
                ) : (
                    filteredOrders.map(order => (
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
                                        src={getImagePath(order)} 
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
                                {activeTab === 'orders' ? (
                                    <>
                                        <select 
                                            className="status-dropdown"
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            style={{
                                                minWidth: '120px',
                                                padding: '0.5rem',
                                                borderRadius: '4px',
                                                border: '1px solid #D27B44',
                                                backgroundColor: '#fff',
                                                outline: 'none',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                color: '#333',
                                                marginRight: (order.id !== 1 && order.id !== 3) ? '4.5rem' : '0'
                                            }}
                                        >
                                            <option value="process">Process</option>
                                            <option value="preparing">Preparing</option>
                                            <option value="ready">Ready</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                        {(order.id === 1 || order.id === 3) && (
                                            <button 
                                                className="book-icon" 
                                                onClick={() => handleBookClick(order)}
                                                title={`View instructions for ${order.name}`}
                                                aria-label={`View special instructions for ${order.name}`}
                                            >
                                                <MenuBookIcon style={{ color: '#FFFFFF' }} />
                                            </button>
                                        )}
                                    </>
                                ) : (
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
                                )}
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
        </div>
    );
}

export default Admin; 