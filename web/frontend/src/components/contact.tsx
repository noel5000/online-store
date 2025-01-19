
import React from 'react';
import "aos/dist/aos.css";
import ContactUs from '../common/contactUs.tsx';

const style ={
    border: '0',
     width: '100%',
      height: '300px'
}

export default function ContactPage(){

    return (<>
    <section id="contact" className="contact section">
      <div className="mb-5" data-aos="fade-up" data-aos-delay="200">
        <iframe style={style} 
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus" frameBorder="0" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>

      <ContactUs />

    </section>
    </>);
}