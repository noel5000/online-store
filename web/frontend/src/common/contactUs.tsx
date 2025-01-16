import React, { useContext, useEffect } from "react";
import Input from "../components/common/input.tsx";
import TextArea from "../components/common/textArea.tsx";
import { IOrderContact } from "../components/Invoice-detail.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { HttpService } from "./httpService.ts";
import {MessagesService} from './messages.ts'
import { UserContext } from "../contexts/userContext.tsx";
import { AOS } from "aos";

interface IContactUs {
    subject?: string | undefined;
}

const ContactUs : React.FC<IContactUs> = ({subject})=>{

    const {isUserLoggedIn, getUser} = useContext(UserContext);
    useEffect(() => {
        fetchData();
      }, [subject]);

      function fetchData() {
        if (isUserLoggedIn()){
          const userData = getUser();
          setValue("clientName", `${userData?.firstName} ${userData?.lastName}` || "");
          setValue("clientEmail", userData?.username || "");
          setValue('subject', subject ?? '');
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

    return <div className="container" data-aos="fade-up" data-aos-delay="100">

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
          <Input 
          label=""
          placeholder='Your name'
           inputName="clientName"
            type="text" 
            register={register("clientName", {
              required: "The name is required",
              maxLength: 50,
              minLength: 3
            })}
            errors={errors}
             />
            </div>

            <div className="col-md-6 ">
          <Input 
          label=""
           inputName="clientEmail"
           placeholder='Your email'
            type="email" 
            register={register("clientEmail", {
              required: "The email is required",
              maxLength: 50,
              minLength: 3
            })}
            errors={errors}
             />
            </div>

            <div className="col-md-12">
          <Input 
          label=""
          placeholder='Subject'
           inputName="subject"
            type="text" 
            register={register("subject", {
              required: "The subject is required",
              maxLength: 200,
              minLength: 3
            })}
            errors={errors}
             />
            </div>

            <div className="col-md-12">
          <TextArea 
          label=""
          placeholder='Your message'
           inputName="message"
            register={register("message", {
              required: "The message is required",
              maxLength: 500,
              minLength: 3
            })}
            errors={errors}
             />
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

  </div>;
}


export default ContactUs;