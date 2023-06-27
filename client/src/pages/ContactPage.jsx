import React from 'react'
import './contact.css'
// import {SiGmail} from 'react-icons/si'
// import {GrLinkedin} from 'react-icons/gr'
// import {BsWhatsapp} from 'react-icons/bs'
import { useRef } from 'react';
import emailjs from 'emailjs-com'
import { Navbar } from '../components'


export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_3twzkje', 'template_6ge2bld', form.current, 'jqkCfJNgbukRgedru')
      .then((result) => {
          console.log(result.text);
          console.log("Message sent");
      }, (error) => {
          console.log(error.text);
      });
  };


// const Contact = () => {
//   const form = useRef();

//   const sendEmail = (e) => {
//     e.preventDefault();
//     // Your email sending logic using emailjs
//   };

//   const handleMailto = (e) => {
//     e.preventDefault();
//     window.location.href = 'mailto:tanmaydeshpande2002.com';
//   };

// const Contact = () => {
//   const form = useRef();
//   const sendEmail = (e) => {
//     e.preventDefault();
// //We will get public key from Account>>API keys>>Public Key
//     emailjs.sendForm('service_i91ddvo', 'template_exc5hwq', form.current, '36R9LlocDtQpuAEpE')
//     e.target.reset();
//   };
  return (
    <section id='contact'>
      <Navbar ></Navbar>
      <h2 className='title'>Contact Me</h2>

      <div className="container contact__container">
        <div className="contact__options">
          {/* <article className='contact__option'>
            <SiGmail className='contact_option_icon'/>
            <h4>Email</h4>
            <h5>khushalmalu04@gmail.com</h5>
            <a href="https://mailto:khushalmalu04@gmail.com" target="_blank">Mail</a>
          </article>
          <article className='contact__option'>
            <GrLinkedin className='contact_option_icon'/>
            <h4>LinkedIn</h4>
            <h5>Khushal Malu</h5>
            <a href="https://www.linkedin.com/in/khushal-malu-69b5a3211/" target='_blank'>Send Message</a>
          </article>
          <article className='contact__option'>
            <BsWhatsapp className='contact_option_icon'/>
            <h4>Whatspp</h4>
            <h5>Contact : +91 7666255931</h5>
            <a href="https://api.whatsapp.com/send?phone=917666255931" target='_blank'>Send Message</a>
          </article> */}
        </div>
        <form className='Contact' ref={form} onSubmit={sendEmail}>
          <input type="text" name="name" placeholder='Your Full Name' required/>
          <input type="email" name="email" placeholder='Your Email Id' required/>
          <textarea type="text" rows='7' name='message' placeholder='Your Message' required></textarea>
          <button type='submit' className='btn btn-primary butn'>Send Message</button>
        </form>
      </div>
    </section>
  )
}

export default ContactUs;