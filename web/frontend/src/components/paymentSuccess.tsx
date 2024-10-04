import React, { useContext, useEffect, useRef } from "react";
import "../assets/css/paymentSuccess.css";
import { redirect } from "react-router-dom";

export default function PaymentSuccess() {
  const redirect = function () {
    window.location.href = "/";
  };
  return (
    <>
      <div className="container2 text-center">
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
