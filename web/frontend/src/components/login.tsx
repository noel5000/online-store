import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useSearchParams } from "react-router-dom";

const style = {
  border: "0",
  width: "100%",
  height: "300px",
};

export default function Login() {
  const [searchParams] = useSearchParams();
  function registerUser() {
    const fromParam = searchParams.get("from");
    window.location.href = fromParam
      ? `/register?from=${fromParam}`
      : "/register";
  }
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
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
              >
                <div className="row gy-4">
                  <div className="col-md-12 ">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Your Email"
                      required={true}
                    />
                  </div>

                  <div className="col-md-12">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      required={true}
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
