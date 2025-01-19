import React, { useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import { applicationConfig } from "../common/environment.ts";
import { IProduct } from "../common/model/product.ts";
import { CartContext } from "../contexts/cartContext.tsx";

interface ProductProps {
  product: IProduct;
  index: number;
  onClick?: (id:number)=>void;
}
export const  getProductPicture = function(url): string {
  return `${applicationConfig.backendUrl}${url}`;
}
export default function Product({ product, index, onClick }: ProductProps) {
  const { addItem } = useContext(CartContext);
  const navigator = useNavigate();
  useEffect(() => {
  
  }, []);

  const goToProduct = (id:number)=>{
    if(onClick)
      onClick(id);
    else 
      navigator(`/product/${id}`);
  }

  function setToCart() {
    addItem(product);
  }
  return (
    <>
      <div
        className="col-lg-4 col-md-6 d-flex align-items-stretch"
        data-aos="zoom-in"
        data-aos-delay={100 * index}
        key={product.id}
      >
        <div className="course-item">
            <img
             onClick={()=>{goToProduct(product.id)}}
              src={getProductPicture(product.pictureUrl)}
              className="img-fluid"
              alt="..."
            />

          <div className="course-content">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="category" onClick={setToCart}>
                Add to cart
              </p>
              <p className="price">${product.price}</p>
            </div>

            <h3  onClick={()=>{goToProduct(product.id)}}>
             {product.name}
            </h3>
            <p className="description">{product.description}</p>
            <div className="trainer d-flex justify-content-between align-items-center">
              {/* <div className="trainer-profile d-flex align-items-center">
                <img src={store2_pic} className="img-fluid" alt="" />
                <a href="" className="trainer-link">Antonio</a>
              </div> */}
              <div className="trainer-rank d-flex align-items-center">
                <i className="bi bi-person user-icon"></i>&nbsp;50 &nbsp;&nbsp;
                <i className="bi bi-heart heart-icon"></i>&nbsp;65
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
