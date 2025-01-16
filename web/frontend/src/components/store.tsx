import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import PageHeader from "./pageHeading.tsx";
import PageFooter from "./pageFooting.tsx";
import { HttpService } from "../common/httpService.ts";
import Product from "./product.tsx";
import InfiniteScroll from "react-infinite-scroll-component";
import { IProduct } from "../common/model/product.ts";
import { MessagesService } from "../common/messages.ts";

export default function Store() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(6);
  const [count, setCount] = useState<number>(0);
  const [apiCallsCount, setApiCallsCount] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const hasFetched = useRef(false);
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
    if (!hasFetched.current) {
      fillProducts();
      hasFetched.current = true;
    }
  }, []);
  function setPagingQuery(): string {
    const maxPage = count / size + 1;
    const newPageVal = page > maxPage ? maxPage - 1 : page;
    setPage((previousVal) =>
      previousVal > maxPage ? maxPage - 1 : previousVal
    );
    const skip = page * size;
    const result = `$top=${size}&$skip=${skip}&$count=true`;
    return result;
  }
  function retreiveProducts() {
    if (page * size >= count && apiCallsCount > 0) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    setApiCallsCount((previousVal) => previousVal + 1);
    const api = new HttpService<IProduct>(`product`);
    const result = api.GetOdata(setPagingQuery());
    return result;
  }
  function fetchData() {
    fillProducts();
  }

  function fillProducts() {
    retreiveProducts().then((r) => {
      setCount(r["@odata.count"]);
      setProducts((prevProducts) => [...prevProducts, ...r.value]);
      const newPage = page + 1;
      setPage(newPage);
    })
    .catch(e=>{
      console.log(e);
      new MessagesService().sendErrorMessage('Network error....');
    });;
  }

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
                  <Product product={p} key={index} index={index}></Product>
                ))}
              </div>
            </div>
          </section>
        </InfiniteScroll>
      </main>
    </>
  );
}
