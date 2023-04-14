import React from "react";

const Footer = () => {
  return (
    
    <div className="container-fluid d-flex flex-column vh-100">
      <footer className="mt-auto text-center text-body sticky-bottom" style={{ backgroundColor: '#18004d', color: 'white' }}>
        <div className="d-flex align-items-center justify-content-center pb-5">
          <div className="col-md-6">
            <p className=" text-white mb-3 mb-md-0">Made with ❤️ by {"Suyog, Tanmay, Nayan, Aditya"}
             
            </p>
            <a className="text-white fs-4" href="https://github.com/suyog9139/MusicSystemSellRent" target="_blank" rel="noreferrer">
              <i className="fa fa-github"></i>
            </a>
          </div>
        </div>
      </footer>
      </div> 
    
  );
};

export default Footer;
