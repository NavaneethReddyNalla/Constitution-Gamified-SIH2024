import React from "react";
import HomePageImage from "../../images/HomePageImage.jpg";
import "./HomePage.css";
function HomePage() {
  return (
    <div className="home-page-main">
      <img className="home-bg" src={HomePageImage} alt="background-image" />
      <h1 className="home-heading">Start The Quiz!</h1>
      <p className="home-subheading fs-4 lead text-center"> Select any Category to start the flash-card quiz</p>
    </div>
  );
}

export default HomePage;
