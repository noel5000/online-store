import React, { useContext, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import PageHeader from "./pageHeading.tsx";
import { IProduct } from "../common/model/product.ts";
import { HttpService } from "../common/httpService.ts";
import { applicationConfig } from "../common/environment.ts";
import { CartContext } from "../contexts/cartContext.tsx";
import { useParams } from "react-router-dom";
import { MessagesService } from "../common/messages.ts";

export default function ProductDetail() {
  const {id} = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const { addItem } = useContext(CartContext);
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
    getProduct();
  }, []);

  function setToCart() {
    if (product) {
      addItem(product);
      new MessagesService().sendAlertMessage("Item added to the cart successfully");
    }
  }
  const getProduct =async function () {
    const api = new HttpService<IProduct>("product");
    try {
      const apiResult = await api.Get(id? id : '');
      if (apiResult.status < 0) 
        new MessagesService().sendErrorMessage(apiResult.message);
      else
        setProduct(apiResult.data);
    } catch(e) {
      new MessagesService().sendErrorMessage("An error happended processing your request");
      console.log(e);
    }
  };
  function getProductPicture(url): string {
    return url ? `${applicationConfig.backendUrl}${url}` : "";
  }
  return (
    <>
      <main className="main">
        <PageHeader title="Product details" />

        <section
          id="courses-course-details"
          className="courses-course-details section"
        >
          <div className="container" data-aos="fade-up">
            <div className="row">
              <div className="col-lg-8">
                <img
                  src={getProductPicture(product?.pictureUrl)}
                  className="img-fluid"
                  alt=""
                />
                <h3>{product ? product.name : ""}</h3>
                <p>{product ? product.description : ""}</p>
              </div>
              <div className="col-lg-4">
                <div className="course-info d-flex justify-content-between align-items-center">
                  <h5>Price</h5>
                  <p>${product?.price}</p>
                </div>
                <div>
                  <input
                    type="button"
                    value="Add to cart"
                    className="btn btn-lg btn-primary"
                    onClick={setToCart}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
