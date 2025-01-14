
import React,{ useContext, useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import PageFooter from './pageFooting.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IOrderContact } from './Invoice-detail.tsx';
import { MessagesService } from '../common/messages.ts';
import { HttpService } from '../common/httpService.ts';
import { UserContext } from '../contexts/userContext.tsx';

const style ={
    border: '0',
     width: '100%',
      height: '300px'
}

export default function ContactPage(){
  const {isUserLoggedIn, getUser} = useContext(UserContext);
    useEffect(() => {
        AOS.init({
          duration: 600,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
        fetchData();
      }, []);

      function fetchData() {
        if (isUserLoggedIn()){
          const userData = getUser();
          setValue("clientName", `${userData?.firstName} ${userData?.lastName}` || "");
          setValue("clientEmail", userData?.username || "");
        }
         
      }
      const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
      } = useForm<IOrderContact>();
    
      const onSubmit: SubmitHandler<IOrderContact> = (data) => {
       const http = new HttpService<any>('customerMessage');
       const response = http.Post(data, "");
       response.then(r=>{
        if(r.status< 0)
          new MessagesService().sendErrorMessage(r.message);
        else
        new MessagesService().sendAlertMessage('Your message has been sent. Someone from customer support service will contact you as soon as possible');
       })
       .catch(e=>{
        new MessagesService().sendErrorMessage('An error happened while sending your message. Please try again later');
        console.log(e);
       })
      };
    return (<>
        
    <section id="contact" className="contact section">

      <div className="mb-5" data-aos="fade-up" data-aos-delay="200">
        <iframe style={style} 
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus" frameBorder="0" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">

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
            <form className="php-email-form" data-aos="fade-up" data-aos-delay="200" 
            onSubmit={handleSubmit(onSubmit)}>
              <div className="row gy-4">

                <div className="col-md-6">
                  <input type="text" className="form-control" placeholder="Your Name"
                    {...register("clientName", {
                      required: "The name is required",
                      maxLength: 50,
                      minLength: 3
                    })} />
                    <div className="invalid-feedback">
                      {errors && errors.clientName ? errors.clientName.message : ""}
                    </div>
                </div>

                <div className="col-md-6 ">
                  <input type="email" className="form-control"placeholder="Your Email" {...register("clientEmail", {
                    required: "The email is required",
                    maxLength: 50,
                    minLength: 3
                  })}  />
                     <div className="invalid-feedback">
                       {errors && errors.clientEmail ? errors.clientEmail.message : ""}
                     </div>
                </div>

                <div className="col-md-12">
                  <input type="text" className="form-control"placeholder="Subject" {...register("subject", {
                    required: "The subject is required",
                    maxLength: 200,
                    minLength: 3
                  })}/>
                     <div className="invalid-feedback">
                       {errors && errors.subject ? errors.subject.message : ""}
                     </div>
                </div>

                <div className="col-md-12">
                  <textarea className="form-control" rows={6} placeholder="Message" {...register("message", {
                    required: "The message is required",
                    maxLength: 500,
                    minLength: 3
                  })}>
                     </textarea>
                     <div className="invalid-feedback">
                       {errors && errors.message ? errors.message.message : ""}
                     </div>
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