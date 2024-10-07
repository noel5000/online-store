
import React,{ useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import PageFooter from './pageFooting.tsx';
import { useParams } from 'react-router-dom';

const style ={
    border: '0',
     width: '100%',
      height: '300px'
}

export default function InvoceDetail(){
    const {orderid} = useParams();
    console.log(orderid);
    useEffect(() => {
        AOS.init({
          duration: 600,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
      }, []);
    return (<>
        
    <section id="invoiceDetails" className="contact section">

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div>
          
        </div>
        <div className="row gy-4">

          <div className="col-lg-4">
            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
              <i className="bi bi-geo-alt flex-shrink-0"></i>
              <div>
                <h3>Address</h3>
                <p>A108 Adam Street, New York, NY 535022</p>
              </div>
            </div>

            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
              <i className="bi bi-telephone flex-shrink-0"></i>
              <div>
                <h3>Call Us</h3>
                <p>+1 5589 55488 55</p>
              </div>
            </div>

            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="500">
              <i className="bi bi-envelope flex-shrink-0"></i>
              <div>
                <h3>Email Us</h3>
                <p>info@example.com</p>
              </div>
            </div>

          </div>

          <div className="col-lg-8">
            <form className="php-email-form" data-aos="fade-up" data-aos-delay="200">
              <div className="row gy-4">

                <div className="col-md-6">
                  <input type="text" name="name" className="form-control" placeholder="Your Name" required={false} />
                </div>

                <div className="col-md-6 ">
                  <input type="email" className="form-control" name="email" placeholder="Your Email" required={false} />
                </div>

                <div className="col-md-12">
                  <input type="text" className="form-control" name="subject" placeholder="Subject" required={false}/>
                </div>

                <div className="col-md-12">
                  <textarea className="form-control" name="message" rows={6} placeholder="Message" required={false}></textarea>
                </div>

                <div className="col-md-12 text-center">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">Your message has been sent. Thank you!</div>

                  <button type="submit">Send Message</button>
                </div>

              </div>
            </form>
          </div>

        </div>

      </div>

    </section>
    <PageFooter />
    </>);
}