import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaArrowLeft } from 'react-icons/fa';
import '../styles/PaymentConfirmation.css';

function PaymentConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderNumber, total } = location.state || {};
    const estimatedTime = '15min'; // Default estimated time

    const handleBack = () => {
        navigate('/payment', { 
            state: { 
                orderNumber: orderNumber,
                total: total 
            }
        });
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: 'transparent'
        }}>
            <div style={{
                position: 'fixed',
                top: '80px',
                left: '20px',
                zIndex: 999,
                padding: '1rem',
                paddingBottom: 0
            }}>
                <button
                    onClick={handleBack}
                    className="back-button"
                >
                    <FaArrowLeft style={{ fontSize: '1rem', color: 'white' }} />
                </button>
            </div>
            <div style={{
                position: 'fixed',
                top: '1rem',
                right: '20px',
                zIndex: 10,
                padding: '1rem',
                paddingBottom: 0
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ 
                        fontSize: '1.5rem',
                        display: 'flex',
                        alignItems: 'center'
                    }}>🍵</span>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        marginTop: '4px'
                    }}>
                        <span style={{ 
                            fontSize: '1.2rem', 
                            fontWeight: 'bold',
                            color: '#E4794A',
                            display: 'flex',
                            alignItems: 'center'
                        }}>Cafe</span>
                        <span style={{ 
                            fontSize: '1.2rem', 
                            fontWeight: 'bold',
                            color: '#6E7061',
                            marginLeft: '4px',
                            display: 'flex',
                            alignItems: 'center'
                        }}>Asipiya</span>
                    </div>
                </div>
            </div>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url("/images/paymentconfirmation3.jpg")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: -1,
                opacity: 1
            }} />
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                padding: '1rem',
                position: 'relative',
                zIndex: 1,
                transform: 'translateX(-2%)'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '600px',
                    marginTop: '4rem',
                    marginBottom: '2rem'
                }}>
                    <div style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        borderRadius: '8px',
                        backdropFilter: 'blur(5px)',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        padding: '2rem'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1.5rem',
                            marginBottom: '2rem'
                        }}>
                            <FaCheckCircle style={{
                                fontSize: '48px',
                                color: '#4CAF50'
                            }} />
                            <p style={{
                                fontSize: '1.2rem',
                                color: '#2c3e50',
                                margin: 0,
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                            }}>Payment Successful!</p>
                            <p style={{
                                color: '#2c3e50',
                                margin: 0,
                                fontWeight: 'bold',
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                            }}>Thank you for your purchase!</p>
                        </div>

                        <div style={{
                            borderTop: '1px solid rgba(44, 62, 80, 0.2)',
                            paddingTop: '1rem'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '0.75rem',
                                padding: '0.25rem 0',
                                borderBottom: '1px solid rgba(44, 62, 80, 0.2)'
                            }}>
                                <span style={{ color: '#2c3e50', textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>Order Number:</span>
                                <span style={{ fontWeight: 'bold', color: '#2c3e50', textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>{orderNumber}</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '1rem',
                                padding: '0.5rem 0',
                                borderBottom: '1px solid rgba(44, 62, 80, 0.2)'
                            }}>
                                <span style={{ color: '#2c3e50', textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>Time:</span>
                                <span style={{ fontWeight: 'bold', color: '#2c3e50', textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>{estimatedTime}</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.5rem 0'
                            }}>
                                <span style={{ color: '#2c3e50', textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>Total:</span>
                                <span style={{ fontWeight: 'bold', color: '#2c3e50', textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>${total?.toFixed(2)}</span>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '2rem',
                            borderTop: '1px solid rgba(44, 62, 80, 0.2)',
                            paddingTop: '2rem'
                        }}>
                            <button
                                onClick={handleBackToHome}
                                style={{
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
                                    fontSize: '1rem'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#b86835'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#D27B44'}
                            >
                                Home <FaHome style={{ fontSize: '1.1rem' }} />
                            </button>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '0.5rem'
                        }}>
                            <a
                                onClick={() => navigate('/feedback', { 
                                    state: { 
                                        name: location.state?.name,
                                        orderNumber: orderNumber
                                    }
                                })}
                                style={{
                                    color: '#2c3e50',
                                    textDecoration: 'underline',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.color = '#D27B44';
                                    e.target.style.textDecoration = 'underline';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.color = '#2c3e50';
                                    e.target.style.textDecoration = 'underline';
                                }}
                            >
                                Feedback
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentConfirmation; 