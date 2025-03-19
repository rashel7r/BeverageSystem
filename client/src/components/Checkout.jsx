import React, { useState, useEffect } from 'react';
import { FaCreditCard, FaArrowLeft } from 'react-icons/fa';
import '../styles/Checkout.css';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
        // Get existing order number from localStorage
        const existingOrderNumber = localStorage.getItem('currentOrderNumber');
        if (existingOrderNumber) {
            setOrderNumber(existingOrderNumber);
        } else {
            // Only generate new order number if one doesn't exist
            generateOrderNumber();
        }
    }, []);

    const generateOrderNumber = () => {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2); // gets last 2 digits of year
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 01-12
        const day = date.getDate().toString().padStart(2, '0'); // 01-31
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // 000-999
        const newOrderNumber = `${year}${month}${day}${random}`;
        setOrderNumber(newOrderNumber);
    };

    const getImagePath = (item) => {
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

        const categoryMap = imageMap[item.category] || {};
        const imageName = categoryMap[item.name] || 'default.jpg';
        return `/images/${item.category}/${imageName}`;
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    };

    const handlePayment = () => {
        if (!paymentMethod) {
            alert('Please select a payment method');
            return;
        }
        navigate('/payment');
    };

    const handleBack = () => {
        navigate('/cart');
    };

    return (
        <>
            <div className="cart-header">
                <button 
                    className="back-button" 
                    onClick={handleBack}
                    style={{ marginTop: '-40px' }}
                >
                    <FaArrowLeft style={{ fontSize: '1rem', color: 'white' }} />
                </button>
                <h1 className="page-title" style={{ marginTop: '-30px' }}>Check Out</h1>
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
            </div>
            <div className="checkout-page">
                <div className="order-summary">
                    {cartItems.map((item, index) => (
                        <div key={index} className="drink-summary-card">
                            <div className="drink-image">
                                <img 
                                    src={getImagePath(item)}
                                    alt={item.name}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `/images/${item.category}/default.jpg`;
                                    }}
                                />
                            </div>
                            <div className="drink-details">
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <div className="customizations">
                                    <span>Customized with: {item.milk}</span>
                                    {item.syrup && <span>, {item.syrup}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cart-summary-table">
                    <div className="summary-section">
                        <div className="table-header">
                            <span>Item</span>
                            <span>QTY</span>
                            <span>Price</span>
                            <span>Amount</span>
                        </div>
                        {cartItems.map((item, index) => (
                            <div key={index} className="table-row">
                                <span className="item-name">{item.name}</span>
                                <span className="item-qty">{item.quantity || 1}</span>
                                <span className="item-price">${item.price.toFixed(2)}</span>
                                <span className="item-amount">${((item.quantity || 1) * item.price).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="detail-row">
                            <span>Order</span>
                            <span className="detail-value">#{orderNumber}</span>
                        </div>
                        <div className="detail-row">
                            <span>Time</span>
                            <span className="detail-value">15 min</span>
                        </div>
                        <div className="detail-row total-row">
                            <span>Total</span>
                            <span className="detail-value">${calculateTotal().toFixed(2)}</span>
                        </div>
                        <div className="payment-method-row">
                            <span>Payment Method</span>
                            <select 
                                value={paymentMethod} 
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="payment-select"
                            >
                                <option value="">Payment Method</option>
                                <option value="cash">Cash</option>
                                <option value="credit">Credit Card</option>
                                <option value="debit">Debit Card</option>
                            </select>
                        </div>
                        <button className="pay-button" onClick={handlePayment}>
                            Pay <FaCreditCard />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout; 