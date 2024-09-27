
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/home.jsx';
import MainMenu from './components/menu.jsx';
import Store from './components/store.jsx';
import Subscription from './components/subscription.jsx';
import PageHeader from './components/pageHeading.jsx';
import PageFooter from './components/pageFooting.jsx';
import ContactPage from './components/contact.jsx';

function App() {
  return (
    <Router>
      <MainMenu></MainMenu>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/store' element={<Store />} />
        <Route path='/subscription' element={<Subscription />} />
        <Route path='/contact' element={<ContactPage />} />
      </Routes>
    <PageFooter />
    </Router>
  );
}

export default App;
