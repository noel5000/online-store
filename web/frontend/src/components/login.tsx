import React, { useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInfo } from "../common/model/user";
import { UserContext } from "../contexts/userContext.tsx";
import Input from "./common/input.tsx";



export default function Login() {
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {login} = useContext(UserContext);
  function registerUser() {
    const fromParam = searchParams.get("from");
    navigate(fromParam ? `/register?from=${fromParam}` : "/register");
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInfo>();

  const onSubmit: SubmitHandler<LoginInfo> = (data) => {
    const from = searchParams.get("from");
    login(data, from);
  };
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }, []);
  return (
    <>
      <section id="login" className="contact section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-8">
              <form
                className="php-email-form"
                data-aos="fade-up"
                data-aos-delay="200"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="row gy-4">
                  <div className="col-md-12 ">
              <Input 
              label="Your Email"
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

                  <div className="col-md-12 text-center">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">
                      Your message has been sent. Thank you!
                    </div>

                    <button type="submit">Login</button>
                    <button
                      type="button"
                      className="mx-3 register"
                      onClick={registerUser}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
