
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/home.jsx';
import MainMenu from './components/menu.jsx';

function App() {
  return (
    <Router>
      <MainMenu></MainMenu>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
