import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaRegCalendarAlt, FaQuestionCircle, FaArrowLeft } from 'react-icons/fa';
import { CreditCard as VisaIcon, CreditCardOutlined as MasterCardIcon, CreditScore as AmexIcon } from '@mui/icons-material';
import '../styles/Payment.css';

function Payment() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        cardNumber: '',
        expiryDate: '',
        cvc: ''
    });
    const [orderDetails, setOrderDetails] = useState({
        name: '',
        orderNumber: '',
        time: '15min',
        total: 0
    });

    useEffect(() => {
        // Get cart items and order number from localStorage
        const savedCart = localStorage.getItem('cart');
        const currentOrderNumber = localStorage.getItem('currentOrderNumber');
        if (savedCart) {
            const cartItems = JSON.parse(savedCart);
            const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
            setOrderDetails(prev => ({
                ...prev,
                orderNumber: currentOrderNumber || 'N/A',
                total: total
            }));
        }
    }, []);

    const formatCardNumber = (value) => {
        const numbers = value.replace(/\D/g, '');
        const groups = numbers.match(/.{1,4}/g) || [];
        return groups.join(' ').substr(0, 19);
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            return 'Email is required';
        }
        if (!emailRegex.test(value)) {
            return 'Email is not valid "@" missing';
        }
        return '';
    };

    const validateCardNumber = (value) => {
        const numbers = value.replace(/\s/g, '');
        if (!numbers) {
            return 'Card number is required';
        }
        if (numbers.length !== 16) {
            return 'Card number must be 16 digits';
        }
        return '';
    };

    const validateExpiryDate = (value) => {
        if (!value) {
            return 'Expiry date is required';
        }
        const [month, year] = value.split('/');
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        
        if (!month || !year || month > 12 || month < 1) {
            return 'Invalid expiry date';
        }
        if ((year < currentYear) || (year == currentYear && month < currentMonth)) {
            return 'Card has expired';
        }
        return '';
    };

    const validateCVC = (value) => {
        if (!value) {
            return 'CVC is required';
        }
        if (value.length !== 3) {
            return 'CVC must be 3 digits';
        }
        return '';
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setErrors(prev => ({
            ...prev,
            email: validateEmail(value)
        }));
    };

    const handleCardNumberChange = (e) => {
        const formattedValue = formatCardNumber(e.target.value);
        setCardNumber(formattedValue);
        setErrors(prev => ({
            ...prev,
            cardNumber: validateCardNumber(formattedValue)
        }));
    };

    const handleExpiryDateChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substr(0, 2) + '/' + value.substr(2);
        }
        const formattedValue = value.substr(0, 5);
        setExpiryDate(formattedValue);
        setErrors(prev => ({
            ...prev,
            expiryDate: validateExpiryDate(formattedValue)
        }));
    };

    const handleCvcChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').substr(0, 3);
        setCvc(value);
        setErrors(prev => ({
            ...prev,
            cvc: validateCVC(value)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate all fields
        const newErrors = {
            email: validateEmail(email),
            cardNumber: validateCardNumber(cardNumber),
            expiryDate: validateExpiryDate(expiryDate),
            cvc: validateCVC(cvc)
        };
        
        setErrors(newErrors);

        // Check if there are any errors
        if (Object.values(newErrors).some(error => error !== '')) {
            return;
        }

        // Process payment here
        // Navigate to confirmation page with order details
        navigate('/payment-confirmation', {
            state: {
                orderNumber: orderDetails.orderNumber,
                total: orderDetails.total
            }
        });

        // Clear the cart
        localStorage.removeItem('cart');
        localStorage.removeItem('currentOrderNumber');
        
        // Reset form
        setEmail('');
        setCardNumber('');
        setExpiryDate('');
        setCvc('');
        setErrors({
            email: '',
            cardNumber: '',
            expiryDate: '',
            cvc: ''
        });
    };

    const handleBack = () => {
        navigate('/checkout', {
            state: {
                orderNumber: orderDetails.orderNumber,
                total: orderDetails.total
            }
        });
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
                <h1 className="page-title" style={{ marginTop: '-30px' }}>Payment</h1>
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
            <div className="payment-page">
                <div className="payment-content" style={{ 
                    paddingLeft: '4rem',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <form className="payment-form" onSubmit={handleSubmit}>
                        <div className="form-section" style={{
                            width: '100%',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            <h2 style={{ textAlign: 'center' }}>Details</h2>
                            <div className="input-group" style={{ 
                                position: 'relative',
                                marginLeft: '100px',
                                marginRight: '100px'
                            }}>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="form-input"
                                    style={{ 
                                        borderColor: errors.email ? '#ff6b6b' : '#ddd',
                                        width: '100%'
                                    }}
                                />
                                {errors.email && (
                                    <div style={{
                                        color: '#ff6b6b',
                                        fontSize: '12px',
                                        marginTop: '4px'
                                    }}>
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="form-section payment-details" style={{
                            width: '100%',
                            maxWidth: '600px',
                            margin: '2rem auto'
                        }}>
                            <h2 style={{ textAlign: 'center' }}>Card Details</h2>
                            <div className="card-input-group" style={{
                                margin: '0 100px'
                            }}>
                                <div className="card-number-container" style={{ 
                                    position: 'relative',
                                    marginBottom: '20px'
                                }}>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            placeholder="Card number"
                                            value={cardNumber}
                                            onChange={handleCardNumberChange}
                                            className="form-input"
                                            maxLength="19"
                                            style={{ 
                                                borderColor: errors.cardNumber ? '#ff6b6b' : '#ddd',
                                                width: '100%',
                                                paddingRight: '10px'
                                            }}
                                        />
                                        <div className="card-icons" style={{ 
                                            position: 'absolute',
                                            right: '-85px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            display: 'flex',
                                            gap: '2px',
                                            alignItems: 'center',
                                            backgroundColor: 'white',
                                            padding: '2px',
                                            zIndex: 1
                                        }}>
                                            <MasterCardIcon style={{ fontSize: '18px', color: '#666' }} />
                                            <VisaIcon style={{ fontSize: '18px', color: '#666' }} />
                                            <AmexIcon style={{ fontSize: '18px', color: '#666' }} />
                                        </div>
                                    </div>
                                    {errors.cardNumber && (
                                        <div style={{
                                            color: '#ff6b6b',
                                            fontSize: '12px',
                                            marginTop: '4px'
                                        }}>
                                            {errors.cardNumber}
                                        </div>
                                    )}
                                </div>
                                <div className="card-details" style={{
                                    display: 'flex',
                                    gap: '80px',
                                    marginTop: '10px'
                                }}>
                                    <div className="expiry-container" style={{ 
                                        position: 'relative',
                                        flex: '1'
                                    }}>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                value={expiryDate}
                                                onChange={handleExpiryDateChange}
                                                className="form-input"
                                                maxLength="5"
                                                style={{ 
                                                    borderColor: errors.expiryDate ? '#ff6b6b' : '#ddd',
                                                    width: '100%',
                                                    paddingRight: '35px'
                                                }}
                                            />
                                            <FaRegCalendarAlt 
                                                className="input-icon" 
                                                style={{ 
                                                    position: 'absolute', 
                                                    right: '-65px', 
                                                    top: '50%', 
                                                    transform: 'translateY(-50%)',
                                                    fontSize: '18px',
                                                    color: '#666',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                        </div>
                                        {errors.expiryDate && (
                                            <div style={{
                                                color: '#ff6b6b',
                                                fontSize: '12px',
                                                marginTop: '4px'
                                            }}>
                                                {errors.expiryDate}
                                            </div>
                                        )}
                                    </div>
                                    <div className="cvc-container" style={{ 
                                        position: 'relative',
                                        flex: '1'
                                    }}>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type="text"
                                                placeholder="CVC"
                                                value={cvc}
                                                onChange={handleCvcChange}
                                                className="form-input"
                                                maxLength="3"
                                                style={{ 
                                                    borderColor: errors.cvc ? '#ff6b6b' : '#ddd',
                                                    width: '100%',
                                                    paddingRight: '35px'
                                                }}
                                            />
                                            <FaQuestionCircle 
                                                className="input-icon" 
                                                style={{ 
                                                    position: 'absolute', 
                                                    right: '-65px', 
                                                    top: '50%', 
                                                    transform: 'translateY(-50%)',
                                                    fontSize: '18px',
                                                    color: '#666'
                                                }} 
                                            />
                                        </div>
                                        {errors.cvc && (
                                            <div style={{
                                                color: '#ff6b6b',
                                                fontSize: '12px',
                                                marginTop: '4px'
                                            }}>
                                                {errors.cvc}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-section order-summary-section" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '2rem',
                            borderTop: '1px solid #e0e0e0',
                            paddingTop: '2rem',
                            width: '100%',
                            maxWidth: '600px',
                            margin: '2rem auto'
                        }}>
                            <div className="order-summary" style={{
                                width: '100%',
                                maxWidth: '400px',
                                padding: '1.5rem',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '8px',
                                textAlign: 'center',
                                margin: '0 auto',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                            }}>
                                <h3>Order Summary</h3>
                                <div className="summary-item" style={{ margin: '0.5rem 0' }}>Order No: {orderDetails.orderNumber}</div>
                                <div className="summary-item" style={{ margin: '0.5rem 0' }}>Time - {orderDetails.time}</div>
                                <div className="summary-divider" style={{ 
                                    margin: '0.25rem 0',
                                    borderTop: '1px solid #eee'
                                }}></div>
                                <div className="total-row" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    margin: '0.25rem 0'
                                }}>
                                    <span>Total</span>
                                    <span>${orderDetails.total.toFixed(2)}</span>
                                </div>
                                <div className="summary-divider" style={{ 
                                    margin: '0.25rem 0',
                                    borderTop: '1px solid #eee'
                                }}></div>
                                <button type="submit" className="pay-button" style={{
                                    width: 'auto',
                                    minWidth: '120px',
                                    padding: '0.75rem 2rem',
                                    backgroundColor: '#D27B44',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    cursor: 'pointer',
                                    margin: '0 auto'
                                }}>
                                    Pay <FaCreditCard />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Payment;