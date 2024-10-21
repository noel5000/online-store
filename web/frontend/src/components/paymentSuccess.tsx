import React, { useContext, useEffect, useRef } from "react";
import "../assets/css/paymentSuccess.css";
import { redirect, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const redirect = function () {
    navigate("/");
  };

  useEffect(()=>{
    let loading = document.getElementById("loadingDiv");
      if (loading) {
        loading.hidden = true;
      }
  },[]);
  return (
    <>
      <div className="container2 text-center" data-aos="fade-up" data-aos-delay="100">
        <i className="bi bi-check-circle-fill checkmark-icon"></i>
        <p className="mt-4 success-message">Payment processed successfully</p>
        <button
          type="button"
          onClick={redirect}
          className="btn my-4 btn-lg btn-warning"
        >
          Continue Shopping
        </button>
      </div>
    </>
  );
}
