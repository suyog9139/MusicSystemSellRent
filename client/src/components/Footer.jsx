import React from "react";

const Footer = () => {
  return (
    
    <div className="container-fluid d-flex flex-column w-auto">
      <footer className="mt-auto text-center" style={{ backgroundColor: '#0b1941', color: 'white' }}>
  <div className="container">
    <a className="text-white fs-4" href="https://github.com/suyog9139/MusicSystemSellRent" target="_blank" rel="noreferrer">
      <i className="fa fa-github"></i>
    </a>
  </div>
  <hr style={{ borderColor: '#fff' }} />
  <p className="text-center">© 2023 Your Music Website. All rights reserved.</p>
</footer>

      </div> 
    
  );
};

export default Footer;
