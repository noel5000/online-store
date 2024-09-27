
import '../assets/css/main.css';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useEffect } from 'react';

function MainMenu(){
    const routes =[
        {route:"/", label:"Home", id:0},
        {route:"/store", label:"Store", id:1},
        {route:"/subscription", label:"Subscriptions", id:2},
        {route:"/contact", label:"Contact Us", id:3},
    ]

    function renderMenu(){
        const urlRoute = window.location.pathname.split('/');
        let activeRoute = urlRoute.length < 2 ? '/' : urlRoute.filter(x=>x)[0];
        return <>
        <header id="header" className="header d-flex align-items-center sticky-top">
              <div className="container-fluid container-xl position-relative d-flex align-items-center">
          
                <a href="#" className="logo d-flex align-items-center me-auto">
                  <h1 className="sitename">Mentor</h1>
                </a>
          
                <nav id="navmenu" className="navmenu">
                  <ul>
                    {routes.map(x=><li  key={x.id}> <Link to={x.route} className={x.route.replace('/','') == activeRoute? 'active': ''}  >{x.label}<br /></Link></li>)}
                  </ul>
                  <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
                </nav>
          
                <a className="btn-getstarted" href="courses.html">Get Started</a>
          
              </div>
            </header>
        </>
    }
return renderMenu();
}

export default MainMenu;