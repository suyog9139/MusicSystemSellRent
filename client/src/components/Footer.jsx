import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="mb-0 text-center text-body" style={{ backgroundColor: '#b3e5fc', color: '#343a40' }}>
        <div className="d-flex align-items-center justify-content-center pb-5">
          <div className="col-md-6">
            <p className="mb-3 mb-md-0">Made with ❤️ by {"Suyog, Tanmay, Nayan, Aditya"}
             
            </p>
            <a className="text-dark fs-4" href="https://github.com/suyog9139/MusicSystemSellRent" target="_blank" rel="noreferrer">
              <i className="fa fa-github"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
