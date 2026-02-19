import { AppProvider, useApp } from './context/AppContext';

// Pages
import HomePage          from './pages/HomePage';
import ShopPage          from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import DoshaQuizPage     from './pages/DoshaQuizPage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import AIConsultPage     from './pages/AIConsultPage';
import CartPage          from './pages/CartPage';
import AccountPage       from './pages/AccountPage';

// Components
import Navbar from './components/Navbar';

// ─── INNER APP (has access to context) ───────────────────────────────────────
function AppInner() {
  const { currentPage, toast } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':    return <HomePage />;
      case 'shop':    return <ShopPage />;
      case 'product': return <ProductDetailPage />;
      case 'quiz':    return <DoshaQuizPage />;
      case 'book':    return <BookAppointmentPage />;
      case 'consult': return <AIConsultPage />;
      case 'cart':    return <CartPage />;
      case 'account': return <AccountPage />;
      default:        return <HomePage />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <Navbar />
      <main>{renderPage()}</main>
      {toast && <div className="toast">✓ {toast}</div>}
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
