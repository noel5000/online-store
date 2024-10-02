import React, { useContext, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import store1_pic from "../assets/img/course-details.jpg";
import store2_pic from "../assets/img/tabs/tab-1.png";
import store3_pic from "../assets/img/tabs/tab-2.png";
import store4_pic from "../assets/img/tabs/tab-3.png";
import store5_pic from "../assets/img/tabs/tab-4.png";
import store6_pic from "../assets/img/tabs/tab-5.png";
import PageHeader from "./pageHeading.tsx";
import { IProduct } from "../common/model/product.ts";
import { HttpService } from "../common/httpService.ts";
import { applicationConfig } from "../common/environment.ts";
import { CartContext } from "../contexts/cartContext.tsx";

export default function ProductDetail() {
  const [id, setId] = useState<number>(
    parseInt(window.location.pathname.split("/").slice(-1)[0])
  );
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
      alert("Item added to the cart successfully");
    }
  }
  const getProduct = function () {
    const api = new HttpService<IProduct>("product");
    try {
      const apiResult = api
        .Get(id)
        .then((r) => {
          if (r.status < 0) alert(r.message);
          setProduct(r.data);
        })
        .catch((e) => {
          alert("An error happended processing your request");
          console.log(e);
        });
    } catch {
      alert("An error happended processing your request");
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
        <section id="tabs" hidden={true} className="tabs section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row">
              <div className="col-lg-3">
                <ul className="nav nav-tabs flex-column">
                  <li className="nav-item">
                    <a
                      className="nav-link active show"
                      data-bs-toggle="tab"
                      href="#tab-1"
                    >
                      Modi sit est
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#tab-2">
                      Unde praesentium sed
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#tab-3">
                      Pariatur explicabo vel
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#tab-4">
                      Nostrum qui quasi
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#tab-5">
                      Iusto ut expedita aut
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-9 mt-4 mt-lg-0">
                <div className="tab-content">
                  <div className="tab-pane active show" id="tab-1">
                    <div className="row">
                      <div className="col-lg-8 details order-2 order-lg-1">
                        <h3>Architecto ut aperiam autem id</h3>
                        <p className="fst-italic">
                          Qui laudantium consequatur laborum sit qui ad sapiente
                          dila parde sonata raqer a videna mareta paulona marka
                        </p>
                        <p>
                          Et nobis maiores eius. Voluptatibus ut enim blanditiis
                          atque harum sint. Laborum eos ipsum ipsa odit magni.
                          Incidunt hic ut molestiae aut qui. Est repellat minima
                          eveniet eius et quis magni nihil. Consequatur dolorem
                          quaerat quos qui similique accusamus nostrum rem vero
                        </p>
                      </div>
                      <div className="col-lg-4 text-center order-1 order-lg-2">
                        <img src={store2_pic} alt="" className="img-fluid" />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="tab-2">
                    <div className="row">
                      <div className="col-lg-8 details order-2 order-lg-1">
                        <h3>Et blanditiis nemo veritatis excepturi</h3>
                        <p className="fst-italic">
                          Qui laudantium consequatur laborum sit qui ad sapiente
                          dila parde sonata raqer a videna mareta paulona marka
                        </p>
                        <p>
                          Ea ipsum voluptatem consequatur quis est. Illum error
                          ullam omnis quia et reiciendis sunt sunt est. Non
                          aliquid repellendus itaque accusamus eius et velit
                          ipsa voluptates. Optio nesciunt eaque beatae accusamus
                          lerode pakto madirna desera vafle de nideran pal
                        </p>
                      </div>
                      <div className="col-lg-4 text-center order-1 order-lg-2">
                        <img src={store3_pic} alt="" className="img-fluid" />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="tab-3">
                    <div className="row">
                      <div className="col-lg-8 details order-2 order-lg-1">
                        <h3>
                          Impedit facilis occaecati odio neque aperiam sit
                        </h3>
                        <p className="fst-italic">
                          Eos voluptatibus quo. Odio similique illum id quidem
                          non enim fuga. Qui natus non sunt dicta dolor et. In
                          asperiores velit quaerat perferendis aut
                        </p>
                        <p>
                          Iure officiis odit rerum. Harum sequi eum illum
                          corrupti culpa veritatis quisquam. Neque
                          necessitatibus illo rerum eum ut. Commodi ipsam minima
                          molestiae sed laboriosam a iste odio. Earum odit
                          nesciunt fugiat sit ullam. Soluta et harum voluptatem
                          optio quae
                        </p>
                      </div>
                      <div className="col-lg-4 text-center order-1 order-lg-2">
                        <img src={store4_pic} alt="" className="img-fluid" />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="tab-4">
                    <div className="row">
                      <div className="col-lg-8 details order-2 order-lg-1">
                        <h3>
                          Fuga dolores inventore laboriosam ut est accusamus
                          laboriosam dolore
                        </h3>
                        <p className="fst-italic">
                          Totam aperiam accusamus. Repellat consequuntur iure
                          voluptas iure porro quis delectus
                        </p>
                        <p>
                          Eaque consequuntur consequuntur libero expedita in
                          voluptas. Nostrum ipsam necessitatibus aliquam fugiat
                          debitis quis velit. Eum ex maxime error in consequatur
                          corporis atque. Eligendi asperiores sed qui veritatis
                          aperiam quia a laborum inventore
                        </p>
                      </div>
                      <div className="col-lg-4 text-center order-1 order-lg-2">
                        <img src={store5_pic} alt="" className="img-fluid" />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="tab-5">
                    <div className="row">
                      <div className="col-lg-8 details order-2 order-lg-1">
                        <h3>
                          Est eveniet ipsam sindera pad rone matrelat sando reda
                        </h3>
                        <p className="fst-italic">
                          Omnis blanditiis saepe eos autem qui sunt debitis
                          porro quia.
                        </p>
                        <p>
                          Exercitationem nostrum omnis. Ut reiciendis
                          repudiandae minus. Omnis recusandae ut non quam ut
                          quod eius qui. Ipsum quia odit vero atque qui
                          quibusdam amet. Occaecati sed est sint aut vitae
                          molestiae voluptate vel
                        </p>
                      </div>
                      <div className="col-lg-4 text-center order-1 order-lg-2">
                        <img src={store6_pic} alt="" className="img-fluid" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
