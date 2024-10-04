import "../assets/css/main.css";
import "../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import cart_icon from "../assets/img/shopping-cart.png";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation
} from "react-router-dom";
import { useContext, useEffect } from "react";
import React from "react";
import { CartContext } from "../contexts/cartContext.tsx";
import { UserService } from "../common/userService.ts";

function MainMenu() {
  const userService = new UserService();
  const { items } = useContext(CartContext);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const location = useLocation();
  const routes = [
    { route: "/", label: "Store", id: 0 },
    { route: "/subscription", label: "Subscriptions", id: 2 },
    { route: "/contact", label: "Contact Us", id: 3 }
  ];
  function isRouteActive(route) {
    if (route === "/") {
      return location.pathname === "/";
    } else {
      return location.pathname.startsWith(route);
    }
  }

  function renderMenu() {
    const logout = function () {
      const userService = new UserService();
      userService.logout();
    };
    return (
      <>
        <header
          id="header"
          className="header d-flex align-items-center sticky-top"
        >
          <div className="container-fluid container-xl position-relative d-flex align-items-center">
            <Link to="/" className="logo d-flex align-items-center me-auto">
              <h1 className="sitename">Mentor</h1>
            </Link>

            <nav id="navmenu" className="navmenu">
              <ul>
                {routes.map((x) => (
                  <li key={x.id}>
                    <Link
                      to={x.route}
                      className={isRouteActive(x.route) ? "active" : ""}
                    >
                      {x.label}
                      <br />
                    </Link>
                  </li>
                ))}
                <li>
                  <a hidden={!userService.isUserLoggedIn()} onClick={logout}>
                    Logout
                  </a>
                </li>
              </ul>
              <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>
            <Link className="cart" to="/cart">
              <div className="cart">
                <img src={cart_icon} alt="Cart Icon"></img>
                <span hidden={totalItems == 0} className="cart-count">
                  {totalItems}
                </span>
              </div>
            </Link>
            <Link
              hidden={userService.isUserLoggedIn()}
              to="/login"
              className="btn-getstarted"
            >
              Login
            </Link>
            <Link
              hidden={!userService.isUserLoggedIn()}
              to="/account"
              className="btn-getstarted"
            >
              My Acount
            </Link>
          </div>
        </header>
      </>
    );
  }
  return renderMenu();
}

export default MainMenu;
