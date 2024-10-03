import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useSearchParams } from "react-router-dom";
import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { IRegisterUser } from "../common/model/user";

const style = {
  border: "0",
  width: "100%",
  height: "300px",
};

export default function Register() {
  const states = [
    { code: "AL", name: "Alabama" },
    { code: "AK", name: "Alaska" },
    { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" },
    { code: "CA", name: "California" },
    { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" },
    { code: "DE", name: "Delaware" },
    { code: "FL", name: "Florida" },
    { code: "GA", name: "Georgia" },
    { code: "HI", name: "Hawaii" },
    { code: "ID", name: "Idaho" },
    { code: "IL", name: "Illinois" },
    { code: "IN", name: "Indiana" },
    { code: "IA", name: "Iowa" },
    { code: "KS", name: "Kansas" },
    { code: "KY", name: "Kentucky" },
    { code: "LA", name: "Louisiana" },
    { code: "ME", name: "Maine" },
    { code: "MD", name: "Maryland" },
    { code: "MA", name: "Massachusetts" },
    { code: "MI", name: "Michigan" },
    { code: "MN", name: "Minnesota" },
    { code: "MS", name: "Mississippi" },
    { code: "MO", name: "Missouri" },
    { code: "MT", name: "Montana" },
    { code: "NE", name: "Nebraska" },
    { code: "NV", name: "Nevada" },
    { code: "NH", name: "New Hampshire" },
    { code: "NJ", name: "New Jersey" },
    { code: "NM", name: "New Mexico" },
    { code: "NY", name: "New York" },
    { code: "NC", name: "North Carolina" },
    { code: "ND", name: "North Dakota" },
    { code: "OH", name: "Ohio" },
    { code: "OK", name: "Oklahoma" },
    { code: "OR", name: "Oregon" },
    { code: "PA", name: "Pennsylvania" },
    { code: "RI", name: "Rhode Island" },
    { code: "SC", name: "South Carolina" },
    { code: "SD", name: "South Dakota" },
    { code: "TN", name: "Tennessee" },
    { code: "TX", name: "Texas" },
    { code: "UT", name: "Utah" },
    { code: "VT", name: "Vermont" },
    { code: "VA", name: "Virginia" },
    { code: "WA", name: "Washington" },
    { code: "WV", name: "West Virginia" },
    { code: "WI", name: "Wisconsin" },
    { code: "WY", name: "Wyoming" },
  ];
  const [searchParams] = useSearchParams();
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  const { register, handleSubmit } = useForm<IRegisterUser>();
  const onSubmit: SubmitHandler<IRegisterUser> = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="col-md-11 col-lg-11 mx-3">
        <h4 className="mb-3">Register Account</h4>
        <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="firstName" className="form-label">
                First name
              </label>
              <input
                type="text"
                required={true}
                {...register("firstName", {
                  required: true,
                  maxLength: 50,
                  minLength: 3,
                })}
                className="form-control"
                id="firstName"
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
                required={true}
                {...register("lastName", {
                  required: true,
                  maxLength: 50,
                  minLength: 3,
                })}
              />
              <div className="invalid-feedback">
                Valid last name is required.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
                required={true}
                {...register("email", {
                  required: true,
                  maxLength: 50,
                  minLength: 3,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "A valid email is required.",
                  },
                })}
              />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                required={true}
                {...register("password", {
                  required: true,
                  maxLength: 100,
                  minLength: 5,
                })}
              />
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
                required={true}
                {...register("address", {
                  required: true,
                  maxLength: 200,
                  minLength: 3,
                })}
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
                {...register("address", { required: false, maxLength: 200 })}
              />
            </div>

            <div className="col-md-5">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <select
                className="form-select"
                id="country"
                defaultValue={"US"}
                required={true}
                disabled={true}
                {...register("country", { required: true, maxLength: 2 })}
              >
                <option value="US">United States</option>
              </select>
              <div className="invalid-feedback">
                Please select a valid country.
              </div>
            </div>

            <div className="col-md-4">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <select
                className="form-select"
                id="state"
                required={true}
                {...register("state", { required: true, maxLength: 2 })}
              >
                <option value="">Choose...</option>
                {states.map((state) => {
                  return (
                    <option value={state.code} key={state.code}>
                      {state.name}
                    </option>
                  );
                })}
              </select>
              <div className="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor="zip" className="form-label">
                Zip
              </label>
              <input
                type="text"
                className="form-control"
                id="zipCode"
                placeholder=""
                required={true}
                {...register("zipCode", { required: true, maxLength: 10 })}
              />
              <div className="invalid-feedback">Zip code required.</div>
            </div>
          </div>

          <hr className="my-4" />

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="shippingIsBilling"
              {...register("shippingIsBilling", { required: false })}
            />
            <label className="form-check-label" htmlFor="same-address">
              Shipping address is the same as my billing address
            </label>
          </div>

          <button className="w-100 btn btn-primary btn-lg my-3" type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
}
