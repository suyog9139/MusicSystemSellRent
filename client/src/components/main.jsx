import React from "react";
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
  return (
    <>
     <Carousel variant="dark">
      <Carousel.Item interval={null}>
        <div style={{width:"100vw", height:"32rem",}}>
        <img style={{ width:"100%",height:"100%", }}
          className="d-block "
          src={require("./wallpaperflare.com_wallpaper.jpg")}
          alt="First slide"
        />
        </div>
        
        <Carousel.Caption style={{color:"white"}}>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div style={{width:"100vw", height:"32rem",}}>
        <img style={{ width:"100%",height:"100%", }}
          className="d-block"
          src={require("./wepik-export-20230611162411xtuI.png")}
          alt="First slide"
        />
        </div>
        <Carousel.Caption style={{color:"white"}}>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div style={{width:"100vw", height:"32rem",}}>
        <img style={{ width:"100%",height:"100%", }}
          className="d-block "
          src={require("./image.png")}
          alt="First slide"
        />
        </div>
        <Carousel.Caption style={{color:"white"}}>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>
  );
};
export default Home;