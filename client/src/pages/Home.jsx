import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

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
      <Navbar />

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

      <footer className="footer">
        <p>© 2025 TripMate. All rights reserved.</p>
        <div className="footer-icons">
          <a
            href="https://github.com/lunahoushmand16/Tripmate-travel-planner-App"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;