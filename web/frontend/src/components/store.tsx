import React,{ useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import store1_pic from '../assets/img/course-1.jpg';
import store2_pic from '../assets/img/trainers/trainer-1-2.jpg';
import store3_pic from '../assets/img/course-2.jpg';
import store4_pic from '../assets/img/trainers/trainer-2-2.jpg';
import store5_pic from '../assets/img/course-3.jpg';
import store6_pic from '../assets/img/trainers/trainer-3-2.jpg';
import PageHeader from './pageHeading.tsx';
import { Link } from 'react-router-dom';
import PageFooter from './pageFooting.tsx';
import { HttpService } from '../common/httpService.ts';
import Product, { IProduct } from './product.tsx';
import { applicationConfig } from '../common/environment.ts';

export default function Store(){
  let products = [];
    useEffect(() => {
        AOS.init({
          duration: 600,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
        getProducts().then(r=>{
          products = r.value;
          console.log(products);
        });
      }, []);

     function getProducts(){
        const api = new HttpService<IProduct>(`product`);
        const result = api.GetOdata('$top=5&$skip=0&$count=true');
        return result;
      }

    return (<>
      <main className="main">
<PageHeader />

<section id="courses" className="courses section">

  <div className="container">

    <div className="row">
    {products.map(p=>
      <Product product={p}></Product>
    )}


    </div>

  </div>

</section>

</main>
<PageFooter />
    </>);
}