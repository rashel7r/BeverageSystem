import './styles/common.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoffeeMenu from './components/CoffeeMenu';
import ShakesMenu from './components/ShakesMenu';
import TeaMenu from './components/TeaMenu';
import BubbleTeaMenu from './components/BubbleTeaMenu';
import CustomizeForm from './components/CustomizeForm';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Payment from './components/Payment';
import PaymentConfirmation from './components/PaymentConfirmation';
import Feedback from './components/Feedback';
import FeedbackDisplay from './components/FeedbackDisplay';
import Admin from './components/Admin';
import Completed from './components/Completed';
import SpecialInstructions from './components/SpecialInstructions';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<CoffeeMenu />} />
                    <Route path="/coffee" element={<CoffeeMenu />} />
                    <Route path="/shakes" element={<ShakesMenu />} />
                    <Route path="/tea" element={<TeaMenu />} />
                    <Route path="/bubbleTea" element={<BubbleTeaMenu />} />
                    <Route path="/customize/:category/:beverageId" element={<CustomizeForm />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/feedback-display" element={<FeedbackDisplay />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/completed" element={<Completed />} />
                    <Route path="/special-instructions" element={<SpecialInstructions />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
