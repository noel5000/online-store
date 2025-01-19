
import React,{ useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams } from 'react-router-dom';
import { HttpService } from '../common/httpService.ts';
import { MessagesService } from '../common/messages.ts';
import ContactUs from '../common/contactUs.tsx';

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
        getInvoiceDetails(orderid!);
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
        <ContactUs subject={`Question about Order: ${orderid}`} />

      </div>

    </section>
    </>);
}