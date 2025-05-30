import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css';

const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div className="home">
      <nav className="navbar">
        <div className="logo">TripMate</div>
        <ul className="nav-links">
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">New Trip</a></li>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Log Out</a></li>
        </ul>
      </nav>

      <div className="hero">
        <h1>Welcome to TripMate</h1>
        <p>Plan and organize your trips with ease.</p>
        <button className="login-btn">Login</button>
      </div>

      <div className="carousel-container">
        <Slider {...sliderSettings}>
          <div><img src="/Machu Picchu2.jpg" alt="Machu Picchu" /></div>
          <div><img src="/paris.jpg" alt="Paris" /></div>
          <div><img src="/Greece.jpg" alt="Greece" /></div>
          <div><img src="/Roatan2.jpg" alt="Roatan" /></div>
        </Slider>
      </div>
    </div>
  );
};

export default Home;
