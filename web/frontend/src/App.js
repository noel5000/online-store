import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MainMenu from "./components/menu.tsx";
import Store from "./components/store.tsx";
import Subscription from "./components/subscription.tsx";
import ContactPage from "./components/contact.tsx";

import "./assets/vendor/bootstrap/js/bootstrap.bundle.min.js";
import "./assets/vendor/php-email-form/validate.js";
import "./assets/vendor/aos/aos.js";
import "./assets/vendor/glightbox/js/glightbox.min.js";
import "./assets/vendor/purecounter/purecounter_vanilla.js";
import "./assets/vendor/swiper/swiper-bundle.min.js";
import "./assets/js/main";
import ProductDetail from "./components/productDetail.tsx";
import Login from "./components/login.tsx";
import { CartProvider } from "./contexts/cartContext.tsx";
import Cart from "./components/cart.tsx";
import Checkout from "./components/checkout.tsx";
import Register from "./components/register.tsx";
import PaymentSuccess from "./components/paymentSuccess.tsx";

function App() {
  return (
    <CartProvider>
      <Router>
        <MainMenu></MainMenu>
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/store" element={<Store />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/product" element={<ProductDetail />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
