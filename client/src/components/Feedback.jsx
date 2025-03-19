import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaStar, FaArrowLeft, FaCamera } from 'react-icons/fa';
import '../styles/Feedback.css';

function Feedback() {
    const navigate = useNavigate();
    const location = useLocation();
    const isEditing = location.state?.isEditing;
    const existingFeedback = location.state?.feedbackData;
    const orderNumber = location.state?.orderNumber;
    const currentDate = new Date();
    
    const formatDateForInput = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatDateForDisplay = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    const [formData, setFormData] = useState({
        name: '',
        date: formatDateForInput(currentDate),
        time: currentDate.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
        }),
        rating: 5,
        comment: '',
        profilePicture: null
    });

    const [showPopup, setShowPopup] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (isEditing && existingFeedback) {
            setFormData({
                name: existingFeedback.name,
                date: existingFeedback.date,
                time: existingFeedback.time,
                rating: existingFeedback.rating,
                comment: existingFeedback.comment,
                profilePicture: existingFeedback.profilePicture
            });
        }
    }, [isEditing, existingFeedback]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'date') {
            // Store the date in the original format but convert for display
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleRatingClick = (rating) => {
        setFormData(prevState => ({
            ...prevState,
            rating
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (limit to 500KB)
            if (file.size > 500 * 1024) {
                alert('Image size should be less than 500KB. Please choose a smaller image.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                // Compress image if needed
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const maxSize = 200; // Max width/height in pixels
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxSize) {
                            height *= maxSize / width;
                            width = maxSize;
                        }
                    } else {
                        if (height > maxSize) {
                            width *= maxSize / height;
                            height = maxSize;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Convert to compressed base64
                    const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    setImagePreview(compressedDataUrl);
                    setFormData(prevState => ({
                        ...prevState,
                        profilePicture: compressedDataUrl
                    }));
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            date: formatDateForInput(new Date()),
            time: currentDate.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: false 
            }),
            rating: 5,
            comment: '',
            profilePicture: null
        });
        setImagePreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Format the date for display
        const formattedDate = new Date(formData.date).toISOString();
        
        const feedbackData = {
            id: isEditing ? existingFeedback.id : Date.now().toString(),
            ...formData,
            date: formattedDate,
            timestamp: new Date().toISOString()
        };

        // Get existing feedbacks
        const storedFeedbacks = localStorage.getItem('feedbacks');
        let feedbacks = storedFeedbacks ? JSON.parse(storedFeedbacks) : [];

        if (isEditing) {
            // Update existing feedback
            feedbacks = feedbacks.map(f => 
                f.id === existingFeedback.id ? feedbackData : f
            );
        } else {
            // Add new feedback
            feedbacks.push(feedbackData);
        }

        // Save to localStorage
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

        // Show success popup
        setShowPopup(true);

        // Reset form
        resetForm();

        // Navigate to display page with the feedback data
        setTimeout(() => {
            setShowPopup(false);
            navigate('/feedback-display', { 
                state: { 
                    feedbackData: feedbackData
                }
            });
        }, 1500);
    };

    const handleBack = () => {
        navigate('/payment-confirmation', {
            state: {
                orderNumber: orderNumber
            }
        });
    };

    const StarRating = ({ rating, onRatingClick }) => {
        return (
            <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        className="star"
                        style={{
                            color: star <= rating ? '#ffc107' : '#e4e5e9'
                        }}
                        onClick={() => onRatingClick(star)}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="feedback-form">
            {showPopup && (
                <div className="success-popup">
                    <div className="success-icon">✓</div>
                    Successfully submitted!
                </div>
            )}
            <div className="background-image" style={{ backgroundImage: "url('/images/feedback2.jpg')" }} />
            
            {/* Back Button */}
            <button
                onClick={handleBack}
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

            <div className="feedback-form-container">
                <div className="feedback-form-content">
                    <div className="feedback-form-box">
                        <h2 style={{
                            color: '#2c3e50',
                            textAlign: 'center',
                            marginBottom: '2rem',
                            width: '100%'
                        }}>{isEditing ? 'Edit Feedback' : 'We Value Your Feedback'}</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="profile-upload">
                                <div className="profile-picture-container">
                                    {imagePreview ? (
                                        <img 
                                            src={imagePreview} 
                                            alt="Profile Preview" 
                                            className="profile-picture"
                                        />
                                    ) : (
                                        <div className="profile-picture-placeholder">
                                            <FaCamera style={{ fontSize: '2rem', color: '#666' }} />
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    id="profilePic"
                                    name="profilePic"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                                <label
                                    htmlFor="profilePic"
                                    style={{
                                        cursor: 'pointer',
                                        color: '#D27B44',
                                        fontSize: '0.9rem',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    {imagePreview ? 'Change Photo' : 'Profile Picture'}
                                </label>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your name"
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="date-time-container">
                                <div>
                                    <label className="form-label" htmlFor="date">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                        max={formatDateForInput(new Date())}
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <label className="form-label" htmlFor="time">
                                        Time
                                    </label>
                                    <input
                                        type="time"
                                        id="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Rating
                                </label>
                                <StarRating rating={formData.rating} onRatingClick={handleRatingClick} />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="comment">
                                    Feedback
                                </label>
                                <textarea
                                    id="comment"
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleInputChange}
                                    placeholder="Share your experience with us..."
                                    required
                                    className="form-textarea"
                                />
                            </div>

                            <div className="button-container">
                                <button type="submit" className="submit-button">
                                    {isEditing ? 'Update Feedback' : 'Submit'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="home-button"
                                >
                                    Home <FaHome style={{ fontSize: '1.1rem' }} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Feedback; 