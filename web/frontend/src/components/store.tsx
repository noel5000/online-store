import React,{ useEffect, useState } from 'react';
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
  const [getProducts, setProducts] = useState([]);
  const [getPaging, setPaging] = useState({page:0, size:5, count:0});
    useEffect(() => {
        AOS.init({
          duration: 600,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
        retreiveProducts().then(r=>{
          const {page, size} = getPaging;
          setPaging({page, size, count:r['@odata.count']});
          setProducts(r.value);
        });
      }, []);
      function setPagingQuery():string{
        let {page, size, count} = getPaging;
        const maxPage = count/size + 1;
        page = page > maxPage? maxPage - 1 : page;
        const skip = page * size;
        return setPagingQuery();
      }
     function retreiveProducts(){
        const api = new HttpService<IProduct>(`product`);
        const result = api.GetOdata(`$top=5&$skip=0&$count=true`);
        return result;
      }

    return (<>
      <main className="main">
<PageHeader />

<section id="courses" className="courses section">

  <div className="container">

    <div className="row">
    {getProducts.map((p, index)=>
      <Product product={p} key={index} index={index}></Product>
    )}


    </div>

  </div>

</section>

</main>
<PageFooter />
    </>);
}