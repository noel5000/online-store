import React, { useContext, useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import PageHeader from "./pageHeading.tsx";
import PageFooter from "./pageFooting.tsx";
import { HttpService } from "../common/httpService.ts";
import Product from "./product.tsx";
import InfiniteScroll from "react-infinite-scroll-component";
import { IProduct } from "../common/model/product.ts";
import { CartContext } from "../contexts/cartContext.tsx";
import "../assets/css/cart.css";
import { applicationConfig } from "../common/environment.ts";
import { ICartItem } from "../common/model/cart.ts";

export default function Cart() {
  const hasFetched = useRef(false);
  const { items, removeItem } = useContext(CartContext);
  const total = items.reduce((total, item) => total + item.total, 0);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
    if (!hasFetched.current) {
      hasFetched.current = true;
    }
  }, []);

  function getProductPicture(url): string {
    return `${applicationConfig.backendUrl}${url}`;
  }
  return (
    <>
      <div className="container mt-5">
        <h2>Shopping Cart</h2>
        {items.length > 0 ? (
          items.map((item) => {
            return (
              <div className="row cart-item" key={item.product.id}>
                <div className="col-md-2">
                  <img
                    src={getProductPicture(item.product.pictureUrl)}
                    alt={item.product.name}
                  />
                </div>
                <div className="col-md-7">
                  <h5>
                    {item.product.name}: {item.product.description}
                  </h5>
                  <p>In Stock</p>
                  <div>
                    <button className="btn btn-outline-secondary btn-sm">
                      Qty: {item.quantity}
                    </button>
                    <span className="ms-3">
                      <input
                        type="button"
                        className="btn btn-sm btn-danger"
                        value="Delete"
                        onClick={() => removeItem(item.product)}
                      ></input>
                    </span>
                  </div>
                </div>
                <div className="col-md-3 text-end">
                  <span className="price">${item.product.price}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="row text-center">
            <h5>The cart is empty...</h5>
          </div>
        )}

        <div className="cart-summary">
          <h5>
            Subtotal ({totalItems} items): ${total}
          </h5>
        </div>
      </div>
      <PageFooter />
    </>
  );
}
