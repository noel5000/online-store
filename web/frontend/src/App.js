
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/home.jsx';
import MainMenu from './components/menu.jsx';
import Store from './components/store.jsx';
import Subscription from './components/subscription.jsx';
import PageHeader from './components/pageHeading.jsx';
import PageFooter from './components/pageFooting.jsx';
import ContactPage from './components/contact.jsx';

import './assets/vendor/bootstrap/js/bootstrap.bundle.min.js';
import './assets/vendor/php-email-form/validate.js';
import './assets/vendor/aos/aos.js';
import './assets/vendor/glightbox/js/glightbox.min.js';
import './assets/vendor/purecounter/purecounter_vanilla.js';
import './assets/vendor/swiper/swiper-bundle.min.js';
import './assets/js/main';
import ProductDetail from './components/productDetail.jsx';
import Login from './components/login.jsx';

function App() {
  return (
    <Router>
      <MainMenu></MainMenu>
      <Routes>
        <Route path='/' element={<Store />} />
        <Route path='/store' element={<Store />} />
        <Route path='/subscription' element={<Subscription />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/product' element={<ProductDetail />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
