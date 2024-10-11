import React, { useContext, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { CartContext } from "../contexts/cartContext.tsx";
import "../assets/css/cart.css";
import { applicationConfig } from "../common/environment.ts";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { UserService } from "../common/userService.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICheckout, IRegisterUser } from "../common/model/user.ts";
import { states } from "../common/model/localizationData.ts";
import { HttpService } from "../common/httpService.ts";
import { MessagesService } from "../common/messages.ts";

export default function AccountSettings() {
  const navigator = useNavigate();
  const hasFetched = useRef(false);
  useEffect(() => {
    validateUser();
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchUserData();
    }
  }, []);

  function saveUserInfo(data: ICheckout) {
   
    const service = new HttpService<any>("auth");
    service
      .Put(data, "UpdateUser")

      .then((r) => {
        if (r.status < 0) new MessagesService().sendErrorMessage(r.message);
        else {
          new MessagesService().sendAlertMessage('Information updated successfully');
          navigator("/account");
        }
      })
      .catch(e=>{
        console.log(e);
        new MessagesService().sendErrorMessage('Network error....');
      });
  }

  function fetchUserData() {
    if (new UserService().isUserLoggedIn())
      userService
        .GetGeneric<IRegisterUser>(`GetUserInfo`)
        .then((r) => {
          if (r.status < 0) new MessagesService().sendErrorMessage(r.message);
          const userData = r.data;
          setValue("firstName", userData.firstName || "");
          setValue("lastName", userData.lastName || "");
          setValue("address", userData.address || "");
          setValue("address2", userData.address2 || "");
          setValue("zipCode", userData.zipCode || "");
          setValue("email", userData.email || "");
          setValue("country", userData.country || "US");
          setValue("phoneNumber", userData.phoneNumber || "");
          setValue("state", userData.state || "");
          setValue("shippingIsBilling", userData.shippingIsBilling || false);
        })
        .catch(e=>{
          console.log(e);
          new MessagesService().sendErrorMessage('Network error....');
        });
  }

  const userService = new HttpService<IRegisterUser>("auth");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ICheckout>();

  const onSubmit: SubmitHandler<ICheckout> = (data) => {
    saveUserInfo(data);
  };

  function validateUser() {
    const userService = new UserService();
    if (!userService.isUserLoggedIn()) {
      navigator(`/login?from=checkout`);
    }
  }

  return (
    < >
      <main  data-aos="fade-up" data-aos-delay="100">
        <div className="py-5 text-center">
          <h2>Account Settings</h2>
        </div>

        <div className="row g-5">
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Billing address</h4>
            <form
              className="needs-validation py-3 mx-3"
              onSubmit={handleSubmit(onSubmit)}
            >
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
                      minLength: 3
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
                      minLength: 3
                    })}
                  />
                  <div className="invalid-feedback">
                    {errors && errors.lastName ? errors.lastName.message : ""}
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    {...register("phoneNumber", {
                      required: false,
                      maxLength: 50,
                      minLength: 3
                    })}
                  />
                  <div className="invalid-feedback">
                    {errors && errors.phoneNumber ? errors.phoneNumber.message : ""}
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
                      disabled:true,
                      maxLength: 50,
                      minLength: 3,
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "A valid email is required."
                      }
                    })}
                  />
                  <div className="invalid-feedback">
                    {errors && errors.email ? errors.email.message : ""}
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
                      minLength: 3
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
                    {...register("address2", {
                      required: false,
                      maxLength: 200
                    })}
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
                      maxLength: 2
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
                      maxLength: 2
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
                      maxLength: 10
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

              <hr className="my-4" />

              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Save changes
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
