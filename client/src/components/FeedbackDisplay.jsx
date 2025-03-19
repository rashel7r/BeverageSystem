import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaArrowLeft } from 'react-icons/fa';
import { BiCoffee } from 'react-icons/bi';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/FeedbackDisplay.css';

function FeedbackDisplay() {
    const location = useLocation();
    const navigate = useNavigate();
    const [allFeedbacks, setAllFeedbacks] = useState([]);
    const [currentRating, setCurrentRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);

    useEffect(() => {
        const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]')
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setAllFeedbacks(storedFeedbacks);
    }, []);

    const handleBackToFeedback = () => {
        navigate('/feedback');
    };

    const handleDelete = (feedbackId) => {
        const updatedFeedbacks = allFeedbacks.filter(feedback => feedback.id !== feedbackId);
        setAllFeedbacks(updatedFeedbacks);
        localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
    };

    const handleStarClick = (rating) => {
        setCurrentRating(rating);
    };

    const handleStarHover = (rating) => {
        setHoveredRating(rating);
    };

    const handleMouseLeave = () => {
        setHoveredRating(0);
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric'
        });
    };

    const formatTime = (timeStr) => {
        const time = new Date(`2000-01-01T${timeStr}`);
        return time.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
        });
    };

    return (
        <div className="feedback-display">
            <div className="background-image" />
            
            {/* Back Button */}
            <button
                onClick={handleBackToFeedback}
                className="back-button"
                style={{
                    position: 'fixed',
                    top: '40px',
                    left: '20px'
                }}
            >
                <FaArrowLeft style={{ fontSize: '1rem', color: 'white' }} />
            </button>

            {/* Cafe Title */}
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

            <div className="feedback-content">
                <div className="rating-section">
                    <h2>Please Rate your Experience</h2>
                    <div className="star-rating" onMouseLeave={handleMouseLeave}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <div 
                                key={star} 
                                className="rating-item"
                                onClick={() => handleStarClick(star)}
                                onMouseEnter={() => handleStarHover(star)}
                            >
                                <FaStar 
                                    className={star <= (hoveredRating || currentRating) ? "star filled" : "star"}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="rating-labels">
                        <span>Hated it</span>
                        <span>Loved it</span>
                    </div>
                </div>

                <div className="reviews-section">
                    {allFeedbacks.map((feedback) => (
                        <div key={feedback.id} className="review-card">
                            <div className="review-header">
                                <div className="reviewer-info">
                                    <div className="avatar">
                                        {feedback.profilePicture ? (
                                            <img 
                                                src={feedback.profilePicture} 
                                                alt={feedback.name} 
                                                className="avatar-image"
                                            />
                                        ) : (
                                            feedback.name[0].toUpperCase()
                                        )}
                                    </div>
                                    <div className="reviewer-details">
                                        <span className="reviewer-name">{feedback.name}</span>
                                    </div>
                                </div>
                                <div className="review-actions">
                                    <div className="review-rating">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar 
                                                key={star}
                                                className={star <= feedback.rating ? "star filled" : "star"}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="review-content">
                                <p className="review-text">{feedback.comment}</p>
                                <div className="review-footer">
                                    <button 
                                        className="delete-button"
                                        onClick={() => handleDelete(feedback.id)}
                                    >
                                        <DeleteIcon style={{ color: '#000000' }} />
                                    </button>
                                    <span className="review-date">
                                        {formatDate(feedback.date)} at {formatTime(feedback.time)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FeedbackDisplay; 