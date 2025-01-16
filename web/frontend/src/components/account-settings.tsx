import React, { useContext, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { CartContext } from "../contexts/cartContext.tsx";
import "../assets/css/cart.css";
import { applicationConfig } from "../common/environment.ts";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICheckout, IRegisterUser } from "../common/model/user.ts";
import { states } from "../common/model/localizationData.ts";
import { HttpService } from "../common/httpService.ts";
import { MessagesService } from "../common/messages.ts";
import { UserContext } from "../contexts/userContext.tsx";
import Input from "./common/input.tsx";
import Select from "./common/select.tsx";
import Checkbox from "./common/checkbox.tsx";

export default function AccountSettings() {
  const navigator = useNavigate();
  const {isUserLoggedIn, } = useContext(UserContext);
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
        if (r.status < 0) 
          new MessagesService().sendErrorMessage(r.message);
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
    if (isUserLoggedIn())
      userService
        .GetGeneric<IRegisterUser>(`GetUserInfo`)
        .then((r) => {
          if (r.status < 0) 
            new MessagesService().sendErrorMessage(r.message);

          const userData = r.data;
          setValue("firstName", userData?.firstName || "");
          setValue("lastName", userData?.lastName || "");
          setValue("address", userData?.address || "");
          setValue("address2", userData?.address2 || "");
          setValue("zipCode", userData?.zipCode || "");
          setValue("email", userData?.email || "");
          setValue("country", userData?.country || "US");
          setValue("phoneNumber", userData?.phoneNumber || "");
          setValue("state", userData?.state || "");
          setValue("shippingIsBilling", userData?.shippingIsBilling || false);
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
    if (!isUserLoggedIn()) {
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
              <Input 
              label=" First name"
               inputName="firstName"
                type="text" 
                register={register("firstName", {
                  required: "The name is required",
                  maxLength: 50,
                  minLength: 3
                })}
                errors={errors}
                 />
                </div>

                <div className="col-sm-6">
                  <Input 
              label=" Last name"
               inputName="lastName"
                type="text" 
                register={register("lastName", {
                  required: "Last name is required",
                  maxLength: 50,
                  minLength: 3
                })}
                errors={errors}
                 />
                </div>

                <div className="col-12">
                  <Input 
              label="Phone Number"
               inputName="phoneNumber"
                type="tel" 
                register={register("phoneNumber", {
                  required: false,
                  maxLength: 50,
                  minLength: 3
                })}
                errors={errors}
                 />
                </div>

                <div className="col-12">
                  <Input 
              label="Email"
               inputName="email"
                type="email" 
                register={register("email", {
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
                errors={errors}
                 />
                </div>

                <div className="col-12"> 
                  <Input 
              label="Address"
               inputName="address"
                type="text" 
                register={register("address", {
                  required: "Primary address is required",
                  maxLength: 200,
                  minLength: 3
                })}
                errors={errors}
                 />
                </div>

                <div className="col-12">
                  <Input 
              label="Address 2 (optional)"
               inputName="address2"
                type="text" 
                placeholder="Apartment or suite"
                register={register("address2", {
                  required: false,
                  maxLength: 200
                })}
                errors={errors}
                 />
                </div>

                <div className="col-md-5">
              <Select 
              label="Country"
              inputName="country"
              data={[{id:'US', name:'United States'}]}
              dataId="id"
              dataLabel="name"
              errors={errors}
              register={register("country", {
                required: "Country is required",
                maxLength: 2,
              })}
              />
                </div>

                <div className="col-md-4">
              <Select 
              label="State"
              inputName="state"
              data={states}
              dataId="code"
              dataLabel="name"
              errors={errors}
              register={register("state", {
                required: "The state is required",
                maxLength: 2,
              })}
              />
                </div>

                <div className="col-md-3">
               <Input 
              label="Zip Code"
               inputName="zipCode"
                type="text" 
                register={register("zipCode", {
                  required: "The Zip Code is required",
                  maxLength: 10,
                })}
                errors={errors}
                 />
                </div>
              </div>

              <hr className="my-4" />
          <Checkbox 
          inputName="shippingIsBilling"
          label="Shipping address is the same as my billing address"
          register={register("shippingIsBilling", { required: false })}
          />

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
