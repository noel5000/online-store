import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInfo } from "../common/model/user";
import { UserService } from "../common/userService.ts";

const style = {
  border: "0",
  width: "100%",
  height: "300px"
};

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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
    const userService = new UserService();
    userService.login(data, from);
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
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                      {...register("email", {
                        required: "The email is required",
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
                        minLength: 5
                      })}
                    />

                    <div className="invalid-feedback">
                      {errors && errors.password ? errors.password.message : ""}
                    </div>
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
