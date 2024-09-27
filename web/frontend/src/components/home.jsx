
import React,{ useEffect } from 'react';
import hero_logo from '../assets/img/hero-bg.jpg';
import AOS from "aos";
import "aos/dist/aos.css";

import '../assets/vendor/bootstrap/js/bootstrap.bundle.min.js';
import '../assets/vendor/php-email-form/validate.js';

export default function Home(){
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

    return (<>
        <section id="hero" className="hero section dark-background">
    
          <img src={hero_logo} alt="" data-aos="fade-in" />
    
          <div className="container">
            <h2 data-aos="fade-up" data-aos-delay="100">Learning Today,<br />Leading Tomorrow</h2>
            <p data-aos="fade-up" data-aos-delay="200">We are team of talented designers making websites with Bootstrap</p>
            <div className="d-flex mt-4" data-aos="fade-up" data-aos-delay="300">
              <a href="courses.html" className="btn-get-started">Get Started</a>
            </div>
          </div>
    
        </section>
    </>)
}