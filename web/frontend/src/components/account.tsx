import React, { useContext, useEffect } from "react";
import "../assets/css/account.css";
import {  useNavigate } from "react-router-dom";
import settings_icon from "../assets/img/settings-cog-svgrepo-com.svg";
import invoice_icon from "../assets/img/invoice-svgrepo-com.svg";
import { UserContext } from "../contexts/userContext.tsx";

export default function Account() {
  const navigate = useNavigate();
  const {isUserLoggedIn} = useContext(UserContext);
  const redirect = function (url: string) {
    navigate(`/${url}`);
  };

  useEffect(() => {
    if (!isUserLoggedIn()) {
      const loading = document.getElementById("loadingDiv");
      if (loading) {
        loading.hidden = true;
      }
      redirect("login");
    }
  }, []);
  return (
    <>
      <div className="container my-5">
        <h2 className="mb-4">Your Account</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div
              className="account-card pointer"
              onClick={() => {
                redirect("user-orders");
              }}
            >
              <div className="icon-section">
                <img src={invoice_icon} alt="Orders icon" />
                <div className="text-section">
                  <h5>Your Orders</h5>
                  <p>
                    Track, return, cancel an order, download invoice or buy
                    again
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 ">
            <div
              className="account-card pointer"
              onClick={() => {
                redirect("account-settings");
              }}
            >
              <div className="icon-section">
                <img src={settings_icon} alt="Login and security icon" />
                <div className="text-section">
                  <h5>Account Settings</h5>
                  <p>Edit login, name, and mobile number</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
