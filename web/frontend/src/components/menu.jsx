
import '../assets/css/main.css';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useEffect } from 'react';
import '../assets/vendor/bootstrap/js/bootstrap.bundle.min.js';
import '../assets/vendor/php-email-form/validate.js';
import '../assets/vendor/aos/aos.js';
import '../assets/vendor/glightbox/js/glightbox.min.js';
import '../assets/vendor/purecounter/purecounter_vanilla.js';
import '../assets/vendor/swiper/swiper-bundle.min.js';
import '../assets/js/main';

function MainMenu(){
    
return (
<>
<header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
  
        <a href="#" className="logo d-flex align-items-center me-auto">
          <h1 className="sitename">Mentor</h1>
        </a>
  
        <nav id="navmenu" className="navmenu">
          <ul>
            <li> <Link to="/" className='active'>Home<br /></Link></li>
            <li><Link to="/store">Store<br /></Link></li>
            <li><Link to="/subscription">Subscriptions<br /></Link></li>
            <li className="dropdown"><a href="#"><span>Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
              <ul>
                <li><a href="#">Dropdown 1</a></li>
                <li className="dropdown"><a href="#"><span>Deep Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                  <ul>
                    <li><a href="#">Deep Dropdown 1</a></li>
                    <li><a href="#">Deep Dropdown 2</a></li>
                    <li><a href="#">Deep Dropdown 3</a></li>
                    <li><a href="#">Deep Dropdown 4</a></li>
                    <li><a href="#">Deep Dropdown 5</a></li>
                  </ul>
                </li>
                <li><a href="#">Dropdown 2</a></li>
                <li><a href="#">Dropdown 3</a></li>
                <li><a href="#">Dropdown 4</a></li>
              </ul>
            </li>
            <li><Link to="/contact">Contact<br /></Link></li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>
  
        <a className="btn-getstarted" href="courses.html">Get Started</a>
  
      </div>
    </header>
</>
)
}

export default MainMenu;