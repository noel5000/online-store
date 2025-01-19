import { useEffect, useRef, useState } from "react";
import React from "react";
import '../assets/css/orders.css';
import { HttpService } from "../common/httpService.ts";
import { getProductPicture } from "./product.tsx";
import { useNavigate } from "react-router-dom";
import { MessagesService } from "../common/messages.ts";

export const formatDate = function(date:Date):string{
    return date.toString().split('T')[0];
}
export default function UserOrders(){
    const [invoices, setInvoices] = useState<any[]>([]);
    const [fromDate, setFromDate] = useState<number>(0);
    const nav = useNavigate();
    const fromDates = [
        {name: '3 Months', value:0},
        {name: '6 Months', value:1},
        {name: '12 Months', value:2},
        {name: `${new Date().getFullYear()- 1}`, value:3},
    ];
    const hasFetched = useRef(false);
    useEffect(()=>{
        if (!hasFetched.current) {
            GetInvoices();
            hasFetched.current = true;
          }
    },[]);

    function navigate(to:string){
        nav(to);
    }

    async function setFromDates(value:number){
       await GetInvoices(value);
    }

    function encodeUrl(data:string){
     return  data.toString();
    }
    async function GetInvoices(fromOption:number =0){
        try{
            setFromDate(fromOption);
            const http = new HttpService<any>('invoice');
            const result = await http.GetAll(`GetUserHistory/${fromOption}`);
            if(result.status<0)
                new MessagesService().sendErrorMessage(result.message);
            else
                setInvoices(result.data);
        }
        catch(e){
            console.log(e);
            new MessagesService().sendErrorMessage('Network error....');
        }
    }

    return (<>
     <div className="container my-4"  data-aos="fade-up" data-aos-delay="100">

        <div className="mb-4">
            {fromDates.map((d, index)=>{
                return (<button 
                    className={d.value == fromDate? "btn btn-outline-secondary me-2 selected-btn": "btn btn-outline-secondary me-2"}
                     key={index} onClick={()=>{setFromDates(d.value)}}>{d.name}</button>)
            })}
            
        </div>
        {invoices.map((invoice,index)=>{

            return (
                <div className="order-container row" key={index}  data-aos="fade-up" data-aos-delay={index * 100}>
                    <div className="col-md-2">
                        <img src={getProductPicture(invoice.product?.pictureUrl)} alt="Product" className="order-img" />
                    </div>
                    <div className="col-md-6">
                        <div className="order-details">
                            <p>Order date: <strong>{formatDate(invoice.date)}</strong> - Order total: <strong>US ${invoice.totalAmount}</strong></p>
                            <p>Order number: <strong>{invoice.orderId}</strong></p>
                            <p><a href="#" className="text-decoration-none">{invoice.product?.name}: {invoice.product?.description}</a></p>
                        </div>
                    </div>
                    <div className="col-md-4 text-end order-actions">
                        <button className="btn btn-primary btn-small" onClick={() =>{navigate(`/product/${invoice.product.id}`)}}>Buy again</button>
                        <button className="btn btn-outline-secondary btn-small" onClick={() =>{navigate(`/invoice-details/${encodeUrl(invoice.orderId)}`)}}>View order details</button>
                    </div>
                </div>)
        })}

    </div>
    </>);
}