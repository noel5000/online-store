import React, { useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSearchParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { IRegisterUser } from "../common/model/user";
import { states } from "../common/model/localizationData.ts";
import { UserContext } from "../contexts/userContext.tsx";
import Input from "./common/input.tsx";
import Select from "./common/select.tsx";
import Checkbox from "./common/checkbox.tsx";

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

  const onSubmit: SubmitHandler<IRegisterUser> = async (data) => {
    const from = searchParams.get("from");
    await createUser(data, from ? from : "");
  };

  return (
    <>
      <div className="col-md-11 col-lg-11 mx-3"  data-aos="fade-up" data-aos-delay="100">
        <h4 className="mb-3">Register Account</h4>
        <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3">
            <div className="col-sm-6">
              <Input 
              label="First Name"
               inputName="firstName"
                type="text" 
                register={register("firstName", {
                  required: "The name is required",
                  maxLength: 50,
                  minLength: 3,
                })}
                errors={errors}
                 />
            </div>

            <div className="col-sm-6">
              <Input 
              label="Last Name"
               inputName="lastName"
                type="text" 
                register={register("lastName", {
                  required: "Last name is required",
                  maxLength: 50,
                  minLength: 3,
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
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "A valid email is required.",
                  },
                })}
                errors={errors}
                 />
            </div>

            <div className="col-12">
              <Input 
              label="Password"
               inputName="password"
                type="password" 
                register={register("password", {
                  required: "Password is required",
                  maxLength: 100,
                  minLength: 5,
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
                  minLength: 3,
                })}
                errors={errors}
                 />
            </div>

            <div className="col-12">
               <Input 
              label="Address 2 (Optional)"
               inputName="address2"
                type="text" 
                register={register("address2", { required: false, maxLength: 200 })}
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

          <button className="w-100 btn btn-primary btn-lg my-3" type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
}
