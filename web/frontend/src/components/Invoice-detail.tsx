
import React,{ useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import PageFooter from './pageFooting.tsx';
import { useParams } from 'react-router-dom';
import { HttpService } from '../common/httpService.ts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserService } from '../common/userService.ts';
import { MessagesService } from '../common/messages.ts';

const style ={
    border: '0',
     width: '100%',
      height: '300px'
}

export interface IOrderContact {
  clientName:string;
  clientEmail:string;
  subject:string;
  message:string;
  orderId:string;
}

export interface IInvoiceDetails{
  items:any[],
  date: Date,
  total:number,
  taxes:number
}

export default function InvoceDetail(){
    const {orderid} = useParams();
    const [invoice, setInvoice] = useState<any>({items:[], date: '', total: 0})
    useEffect(() => {
        AOS.init({
          duration: 600,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
        getInvoiceDetails(orderid!);
        fetchData();
      }, []);

      const getInvoiceDetails = function(orderId:string){
        const http = new HttpService<any>('invoice');
        const promise = http.GetGeneric<any>(`GetInvoiceDetails/${orderId}`);
        promise
        .then(r=>{
          if (r.status <0)
            new MessagesService().sendErrorMessage(r.message);
          setInvoice(r.data);
        })
      .catch(e=> {
        new MessagesService().sendErrorMessage('an error happened while retreiving the information');
          console.log(e);
        })
      }
      
  function fetchData() {
    const userService = new UserService()
    if (userService.isUserLoggedIn()){
      const userData = userService.getUser();
      setValue("clientName", `${userData.firstName} ${userData.lastName}` || "");
      setValue("clientEmail", userData.username || "");
      setValue("subject", `Question about order: ${orderid}`);
      setValue("message", "");
      setValue("orderId", orderid!.toString());
    }
     
  }
      const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
      } = useForm<IOrderContact>();
    
      const onSubmit: SubmitHandler<IOrderContact> = (data) => {
       const http = new HttpService<any>('invoice');
       const response = http.Post(data, "AddSupportMessage");
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
    <section id="invoiceDetails" className="contact section">
      
      <div className="col-md-5 col-lg-4 order-md-last py-4" data-aos="fade-up" data-aos-delay="100">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Order: </span>
              <span className="badge bg-primary rounded-pill">
               {orderid}
              </span>
            </h4>
            <ul className="list-group mb-3">
              {invoice.items.map((item, index) => {
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
                <strong>${invoice.total}</strong>
              </li>
            </ul>
          </div>

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
            <form 
            className="php-email-form" 
            data-aos="fade-up" 
            data-aos-delay="200" 
            onSubmit={handleSubmit(onSubmit)}>
              <div className="row gy-4">

                <div className="col-md-6">
                  <input type="text"
                    className="form-control" 
                    placeholder="Your Name"
                    {...register("clientName", {
                      required: "The name is required",
                      maxLength: 50,
                      minLength: 3
                    })}
                     />
                     <div className="invalid-feedback">
                       {errors && errors.clientName ? errors.clientName.message : ""}
                     </div>
                </div>

                <div className="col-md-6 ">
                  <input type="email" className="form-control" placeholder="Your Email"
                  
                  {...register("clientEmail", {
                    required: "The email is required",
                    maxLength: 50,
                    minLength: 3
                  })} />
                  <div className="invalid-feedback">
                    {errors && errors.clientEmail ? errors.clientEmail.message : ""}
                  </div>
                </div>

                <div className="col-md-12">
                  <input type="text" className="form-control" placeholder="Subject"
                  
                  {...register("subject", {
                    required: "The subject is required",
                    maxLength: 200,
                    minLength: 3
                  })}/>
                  <div className="invalid-feedback">
                    {errors && errors.subject ? errors.subject.message : ""}
                  </div>
                </div>

                <div className="col-md-12">
                  <textarea className="form-control" rows={6} placeholder="Message" 
                  
                  {...register("message", {
                    required: "The message is required",
                    maxLength: 500,
                    minLength: 3
                  })}></textarea>
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