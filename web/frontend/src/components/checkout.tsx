import React, { useContext, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { CartContext } from "../contexts/cartContext.tsx";
import "../assets/css/cart.css";
import { applicationConfig } from "../common/environment.ts";
import { Link, useSearchParams } from "react-router-dom";
import { UserService } from "../common/userService.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegisterUser } from "../common/model/user.ts";

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const hasFetched = useRef(false);
  const { items, removeItem } = useContext(CartContext);
  let total = items.reduce((total, item) => total + item.total, 0);
  total = Math.round(total);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
    if (!hasFetched.current) {
      hasFetched.current = true;
    }
    validateUser();
  }, []);

  const userService = new UserService();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterUser>();

  const onSubmit: SubmitHandler<IRegisterUser> = (data) => {
    const from = searchParams.get("from");
    userService.createUser(data, from ? from : "");
  };

  function validateUser() {
    const userService = new UserService();
    if (!userService.isUserLoggedIn()) {
      window.location.href = `/login?from=checkout`;
    }
  }

  function getProductPicture(url): string {
    return `${applicationConfig.backendUrl}${url}`;
  }
  return (
    <>
      <main>
        <div className="py-5 text-center">
          <h2>Checkout</h2>
        </div>

        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last py-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Product name</h6>
                  <small className="text-muted">Brief description</small>
                </div>
                <span className="text-muted">$12</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Second product</h6>
                  <small className="text-muted">Brief description</small>
                </div>
                <span className="text-muted">$8</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Third item</h6>
                  <small className="text-muted">Brief description</small>
                </div>
                <span className="text-muted">$5</span>
              </li>
              <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-success">
                  <h6 className="my-0">Promo code</h6>
                  <small>EXAMPLECODE</small>
                </div>
                <span className="text-success">−$5</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>$20</strong>
              </li>
            </ul>

            <form className="card p-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                />
                <button type="submit" className="btn btn-secondary">
                  Redeem
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation py-3 mx-3">
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder=""
                    value=""
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    value=""
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">@</span>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Username"
                    />
                    <div className="invalid-feedback">
                      Your username is required.
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address2" className="form-label">
                    Address 2 <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    placeholder="Apartment or suite"
                  />
                </div>

                <div className="col-md-5">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <select className="form-select" id="country">
                    <option value="">Choose...</option>
                    <option>United States</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <select className="form-select" id="state">
                    <option value="">Choose...</option>
                    <option>California</option>
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">
                    Zip
                  </label>
                  <input type="text" className="form-control" id="zip" />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>

              <hr className="my-4" />

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="same-address"
                />
                <label className="form-check-label" htmlFor="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="save-info"
                />
                <label className="form-check-label" htmlFor="save-info">
                  Save this information for next time
                </label>
              </div>

              <hr className="my-4" />

              <h4 className="mb-3">Payment</h4>

              <div className="my-3">
                <div className="form-check">
                  <input
                    id="credit"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                  />
                  <label className="form-check-label" htmlFor="credit">
                    Credit card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                  />
                  <label className="form-check-label" htmlFor="debit">
                    Debit card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                  />
                  <label className="form-check-label" htmlFor="paypal">
                    PayPal
                  </label>
                </div>
              </div>

              <div className="row gy-3">
                <div className="col-md-6">
                  <label htmlFor="cc-name" className="form-label">
                    Name on card
                  </label>
                  <input type="text" className="form-control" id="cc-name" />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                  <div className="invalid-feedback">
                    Name on card is required
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="cc-number" className="form-label">
                    Credit card number
                  </label>
                  <input type="text" className="form-control" id="cc-number" />
                  <div className="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="cc-expiration" className="form-label">
                    Expiration
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                  />
                  <div className="invalid-feedback">
                    Expiration date required
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="cc-cvv" className="form-label">
                    CVV
                  </label>
                  <input type="text" className="form-control" id="cc-cvv" />
                  <div className="invalid-feedback">Security code required</div>
                </div>
              </div>

              <hr className="my-4" />

              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
