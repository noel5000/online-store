
import '../assets/css/main.css';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import React from 'react';

function MainMenu(){
  const location = useLocation();
    const routes =[
        {route:"/", label:"Store", id:0},
        {route:"/subscription", label:"Subscriptions", id:2},
        {route:"/contact", label:"Contact Us", id:3},
    ]
    function isRouteActive(route) {
      if (route === '/') {
        return location.pathname === '/';
      } else {
        return location.pathname.startsWith(route);
      }
    }

    function renderMenu(){
        return (<>
        <header id="header" className="header d-flex align-items-center sticky-top">
              <div className="container-fluid container-xl position-relative d-flex align-items-center">
          
                <a className="logo d-flex align-items-center me-auto">
                  <Link to="/"><h1 className="sitename">Mentor</h1></Link>
                </a>
          
                <nav id="navmenu" className="navmenu">
                  <ul>
                    {routes.map(x=>
                    <li  key={x.id}> 
                    <Link to={x.route} className={isRouteActive(x.route)? 'active': ''}  >{x.label}<br /></Link></li>)}
                  </ul>
                  <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
                </nav>

                <Link to="login" className='btn-getstarted'>Login</Link>
          
              </div>
            </header>
        </>)
    }
return renderMenu();
}

export default MainMenu;