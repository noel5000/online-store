import React, { useContext, useEffect, useRef } from "react";
import "aos/dist/aos.css";
import { CartContext } from "../contexts/cartContext.tsx";
import "../assets/css/cart.css";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICheckout, IRegisterUser } from "../common/model/user.ts";
import { states } from "../common/model/localizationData.ts";
import { HttpService } from "../common/httpService.ts";
import { MessagesService } from "../common/messages.ts";
import { UserContext } from "../contexts/userContext.tsx";
import Input from "./common/input.tsx";
import Select from "./common/select.tsx";
import Checkbox from "./common/checkbox.tsx";

export default function Checkout() {
  const { items, clear } = useContext(CartContext);
  const {isUserLoggedIn} = useContext(UserContext);
  const navigator = useNavigate();
  let total = items.reduce((total, item) => total + item.total, 0);
  total = Math.round(total);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const hasFetched = useRef(false);
  useEffect(() => {
    validateUser();
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchUserData();
    }
  }, []);

  function processCheckout(data: ICheckout) {
    data.items = items.map((item) => {
      return {
        quantity: item.quantity,
        productId: item.product?.id,
        total: item.total,
        product: null
      };
    });
    const service = new HttpService<any>("invoice");
    service
      .Post(data, "")

      .then((r) => {
        if (r.status < 0) new MessagesService().sendErrorMessage(r.message);
        else {
          clear();
          navigator("/paymentsuccess");
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
          if (r.status < 0) new MessagesService().sendErrorMessage(r.message);
          const userData = r.data;
          setValue("firstName", userData.firstName || "");
          setValue("lastName", userData.lastName || "");
          setValue("address", userData.address || "");
          setValue("address2", userData.address2 || "");
          setValue("zipCode", userData.zipCode || "");
          setValue("email", userData.email || "");
          setValue("country", userData.country || "US");
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
    processCheckout(data);
  };

  function validateUser() {
    if (!isUserLoggedIn()) {
      navigator(`/login?from=checkout`);
    }
  }

  return (
    <>
      <main>
        <div className="py-5 text-center">
          <h2>Checkout</h2>
        </div>

        <div className="row g-5" data-aos="fade-up" data-aos-delay="100">
          <div className="col-md-5 col-lg-4 order-md-last py-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">
                {totalItems}
              </span>
            </h4>
            <ul className="list-group mb-3">
              {items.map((item, index) => {
                return (
                  <li
                    className="list-group-item d-flex justify-content-between lh-sm"
                    key={index}
                  >
                    <div>
                      <h6 className="my-0">{item.product?.name}</h6>
                    </div>
                    <span className="text-muted">
                      ({item.quantity}) ${item.product?.price}
                    </span>
                  </li>
                );
              })}

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${total}</strong>
              </li>
            </ul>
          </div>
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
              label="Last name"
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
              label="Email"
               inputName="email"
                type="email" 
                register={register("email", {
                  required: "The email is required",
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
              label="Address 2 (Optional)"
               inputName="address2"
                type="text" 
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

              <h4 className="mb-3">Payment</h4>

              <div className="row gy-3">
                <div className="col-md-6">
               <Input 
              label="Name on card"
               inputName="nameOnCard"
                type="text" 
                placeholder="Full name as displayed on card"
                register={register("nameOnCard", {
                  required: "The name on the card is required",
                  maxLength: 50,
                  minLength: 3
                })}
                errors={errors}
                 />
                </div>

                <div className="col-md-6">
               <Input 
              label="Credit card number"
               inputName="cardNumber"
               placeholder="16 digits credit card number"
                type="text" 
                register={register("cardNumber", {
                  required: "The card number is required",
                  maxLength: 16,
                  minLength: 16,
                  pattern: {
                    value: /^[0-9]{16}$/,
                    message: "Card number must be a 16-digit number."
                  }
                })}
                errors={errors}
                 />
                </div>

                <div className="col-md-3">
               <Input 
              label="Expiration"
              placeholder="MM/YY"
               inputName="expiration"
                type="text" 
                register={register("expiration", {
                  required: "The card expiration date is required",
                  maxLength: 5,
                  minLength: 5,
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                    message: "Expiration date must be in MM/YY format."
                  }
                })}
                errors={errors}
                 />
                </div>

                <div className="col-md-3">
               <Input 
              label="CVV"
              placeholder="Last three digits in the back "
               inputName="cvv"
                type="text" 
                register={register("cvv", {
                  required: true,
                  maxLength: 3,
                  minLength: 3,
                  pattern: {
                    value: /^[0-9]{3}$/,
                    message: "CVV must be a 3-digit number."
                  }
                })}
                errors={errors}
                 />
                </div>
              </div>

              <hr className="my-4" />

              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Complete Order
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
