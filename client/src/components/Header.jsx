import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Header.css'

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isCustomizePage = location.pathname.includes('/customize');
  const isCartPage = location.pathname === '/cart';
  const isCheckoutPage = location.pathname === '/checkout';
  const isPaymentPage = location.pathname === '/payment';
  const isPaymentConfirmationPage = location.pathname === '/payment-confirmation';
  const category = location.pathname.split('/')[2];
  const beverage = location.state?.beverage;

  const getImagePath = (beverage, category) => {
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

    const categoryMap = imageMap[category] || {};
    const imageName = categoryMap[beverage.name] || 'default.jpg';
    return `/images/${category}/${imageName}`;
  };

  const CafeLogo = ({ centered }) => (
    <div className={centered ? "header-center" : "header-right"}>
      <div className="cafe-logo" style={centered ? { margin: '0 auto' } : {}}>
        <div className="drink-icon-container">
          <span className="drink-icon">🍵</span>
          <div className="steam-container">
            <span className="steam steam1">)</span>
            <span className="steam steam2">)</span>
            <span className="steam steam3">)</span>
          </div>
        </div>
        <span className="cafe-name"><span> </span></span>
      </div>
    </div>
  );

  if (isPaymentConfirmationPage) {
    return (
      <header className="header payment-confirmation-header">
        <CafeLogo centered={false} />
      </header>
    );
  }

  if (isPaymentPage) {
    return (
      <header className="header payment-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1 className="page-title">Payment</h1>
        <CafeLogo />
      </header>
    );
  }

  if (isCheckoutPage) {
    return (
      <header className="header checkout-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1 className="page-title">Check Out</h1>
        <CafeLogo />
      </header>
    );
  }

  if (isCartPage) {
    return (
      <div className="header cart-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1 className="page-title">Cart</h1>
        <CafeLogo />
      </div>
    );
  }

  if (isCustomizePage && beverage) {
    return (
      <div className="header customize-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <div className="customize-header-content">
          <img 
            src={getImagePath(beverage, category)}
            alt={beverage.name}
            className="customize-beverage-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `/images/${category}/default.jpg`;
            }}
          />
          <h2 className="customize-beverage-name">{beverage.name}</h2>
        </div>
        <CafeLogo />
      </div>
    );
  }

  return (
    <div className="header">
      <CafeLogo />
    </div>
  );
}

export default Header 