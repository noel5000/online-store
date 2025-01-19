import React, { useContext, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { CartContext } from "../contexts/cartContext.tsx";
import "../assets/css/cart.css";
import { Link } from "react-router-dom";
import { getProductPicture } from "./product.tsx";

export default function Cart() {
  const hasFetched = useRef(false);
  const { items, removeItem } = useContext(CartContext);
  let total = items.reduce((total, item) => total + item.total, 0);
  total = Math.round(total);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
    }
  }, []);

  return (
    <>
      <div className="container mt-5" data-aos="fade-up" data-aos-delay="100">
        <h2>Shopping Cart</h2>
        {items.length > 0 ? (
          items.map((item) => {
            return (
              <div className="row cart-item" key={item?.product?.id}>
                <div className="col-md-2">
                  <img
                    src={getProductPicture(item?.product?.pictureUrl)}
                    alt={item?.product?.name}
                  />
                </div>
                <div className="col-md-7">
                  <h5>
                    {item?.product?.name}: {item?.product?.description}
                  </h5>
                  <p>In Stock</p>
                  <div>
                    <button className="btn btn-outline-secondary btn-sm">
                      Qty: {item.quantity}
                    </button>
                    <span className="ms-3">
                      <input
                        type="button"
                        className="btn btn-sm btn-link"
                        value="Delete"
                        onClick={() => removeItem(item.product!)}
                      ></input>
                    </span>
                  </div>
                </div>
                <div className="col-md-3 text-end">
                  <span className="price">${item.product!.price}</span>
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
        <div className="row text-center py-3">
          <Link
            to={"/checkout"}
            hidden={items.length == 0}
            className="btn btn-lg btn-warning"
          >
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
}
