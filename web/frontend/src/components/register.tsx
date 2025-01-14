import React, { useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useSearchParams } from "react-router-dom";
import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { IRegisterUser } from "../common/model/user";
import { states } from "../common/model/localizationData.ts";
import { UserContext } from "../contexts/userContext.tsx";

export default function Register() {
  const [searchParams] = useSearchParams();
  const {createUser} = useContext(UserContext);
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterUser>();

  const onSubmit: SubmitHandler<IRegisterUser> = (data) => {
    const from = searchParams.get("from");
    createUser(data, from ? from : "");
  };

  return (
    <>
      <div className="col-md-11 col-lg-11 mx-3"  data-aos="fade-up" data-aos-delay="100">
        <h4 className="mb-3">Register Account</h4>
        <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="firstName" className="form-label">
                First name
              </label>
              <input
                type="text"
                {...register("firstName", {
                  required: "The name is required",
                  maxLength: 50,
                  minLength: 3,
                })}
                className="form-control"
                id="firstName"
              />
              <div className="invalid-feedback">
                {errors && errors.firstName ? errors.firstName.message : ""}
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
                {...register("lastName", {
                  required: "Last name is required",
                  maxLength: 50,
                  minLength: 3,
                })}
              />
              <div className="invalid-feedback">
                {errors && errors.lastName ? errors.lastName.message : ""}
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
                {...register("email", {
                  required: "The email is required",
                  maxLength: 50,
                  minLength: 3,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "A valid email is required.",
                  },
                })}
              />
              <div className="invalid-feedback">
                {errors && errors.email ? errors.email.message : ""}
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
                {...register("password", {
                  required: "Password is required",
                  maxLength: 100,
                  minLength: 5,
                })}
              />

              <div className="invalid-feedback">
                {errors && errors.password ? errors.password.message : ""}
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
                {...register("address", {
                  required: "Primary address is required",
                  maxLength: 200,
                  minLength: 3,
                })}
              />
              <div className="invalid-feedback">
                {errors && errors.address ? errors.address.message : ""}
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
                {...register("address2", { required: false, maxLength: 200 })}
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
                {...register("country", {
                  required: "Country is required",
                  maxLength: 2,
                })}
              >
                <option value="US">United States</option>
              </select>
              <div className="invalid-feedback">
                {errors && errors.country ? errors.country.message : ""}
              </div>
            </div>

            <div className="col-md-4">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <select
                className="form-select"
                id="state"
                {...register("state", {
                  required: "The state is required",
                  maxLength: 2,
                })}
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
                {errors && errors.state ? errors.state.message : ""}
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor="zipCode" className="form-label">
                Zip
              </label>
              <input
                type="text"
                className="form-control"
                id="zipCode"
                placeholder=""
                {...register("zipCode", {
                  required: "The Zip Code is required",
                  maxLength: 10,
                })}
              />
              <div className="invalid-feedback">
                {errors && errors.zipCode ? errors.zipCode.message : ""}
              </div>
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
