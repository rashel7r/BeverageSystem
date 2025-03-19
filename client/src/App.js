import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoffeeMenu from './components/CoffeeMenu';
import Customize from './components/Customize';
import Cart from './components/Cart';
import PaymentConfirmation from './components/PaymentConfirmation';
import Feedback from './components/Feedback';
import FeedbackDisplay from './components/FeedbackDisplay';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoffeeMenu />} />
        <Route path="/customize/:id" element={<Customize />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/feedback-display" element={<FeedbackDisplay />} />
      </Routes>
    </Router>
  );
}

export default App; 