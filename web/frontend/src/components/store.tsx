import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import PageHeader from "./pageHeading.tsx";
import Product from "./product.tsx";
import InfiniteScroll from "react-infinite-scroll-component";
import useStoreProduct from "./hooks/useStoreProducts.tsx";

export default function Store() {
  const hasFetched = useRef(false);
  const {fillProducts, fetchData, products, hasMore} = useStoreProduct();
  useEffect(() => {

    if (!hasFetched.current) {
      fillProducts();
      hasFetched.current = true;
    }
  }, []);
  



  return (
    <>
      <main className="main">
        <PageHeader title="All products" />
        <input
          type="button"
          hidden={true}
          id="testButton"
          value="probar"
          onClick={fetchData}
        ></input>
        <InfiniteScroll
          dataLength={products.length} //This is important field to render the next data
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <section id="courses" className="courses section">
            <div className="container">
              <div className="row">
                {products.map((p, index) => (
                  <Product product={p} key={p.id} index={index}></Product>
                ))}
              </div>
            </div>
          </section>
        </InfiniteScroll>
      </main>
    </>
  );
}
