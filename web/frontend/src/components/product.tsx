import React,{ useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import store2_pic from '../assets/img/trainers/trainer-1-2.jpg';
import { Link } from 'react-router-dom';
import { applicationConfig } from '../common/environment.ts';

export interface IProduct{
id:number;
name:string;
description:string | undefined;
pictureUrl:string | undefined;
price: number;
isSubscription: boolean;
quantity: number;
category: string | undefined;
}
interface ProductProps {
  product: IProduct;
}
export default function Product({ product }: ProductProps){
    useEffect(() => {
        AOS.init({
          duration: 600,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
      }, []);
function getProductPicture(url):string{
  return `${applicationConfig.backendUrl}${url}`;
}
    return (<>
      <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
        <div className="course-item">
          <img src={getProductPicture(product.pictureUrl)} className="img-fluid" alt="..." />
          <div className="course-content">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="category">{product.name}</p>
              <p className="price">${product.price}</p>
            </div>

            <h3><a><Link to={`/product/${product.id}`}>{product.name}</Link></a></h3>
            <p className="description">{product.description}</p>
            <div className="trainer d-flex justify-content-between align-items-center">
              {/* <div className="trainer-profile d-flex align-items-center">
                <img src={store2_pic} className="img-fluid" alt="" />
                <a href="" className="trainer-link">Antonio</a>
              </div> */}
              <div className="trainer-rank d-flex align-items-center">
                <i className="bi bi-person user-icon"></i>&nbsp;50
                &nbsp;&nbsp;
                <i className="bi bi-heart heart-icon"></i>&nbsp;65
              </div>
            </div>
          </div>
        </div>
      </div>
    </>);
}