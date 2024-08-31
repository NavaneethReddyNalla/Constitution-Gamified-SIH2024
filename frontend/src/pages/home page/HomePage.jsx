import React from "react";
import { Link } from "react-router-dom";
//import HomePageImage from "../../images/HomePageImage.jpg";
import book_zoom from '../../images/book_zoom.mp4'
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page-main">
      <video className="home-bg-video" autoPlay loop muted>
         <source src={book_zoom} type="video/mp4" /> 
        Your browser does not support the video tag.
      </video>
      <h1 className="home-heading">Sansthaein Aur Samvidhan</h1>
      <p className="home-subheading fs-4 lead text-center">"Play, Learn, Empower: Master the Constitution Through Fun and Games!"</p>
      <Link to="/chatbot-vidhur" className="btn btn-primary me-3">Learn the Constitution </Link>
      <Link to="/flash" className="btn btn-secondary">Test Your Knowledge</Link>
    </div>
  );
}

export default HomePage;
