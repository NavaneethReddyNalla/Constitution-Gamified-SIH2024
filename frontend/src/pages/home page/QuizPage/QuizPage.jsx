import React, { useEffect, useState } from "react";
// import CardCarousel from "../../../components/card carousel/CardCarousel";
import FlashCard from "../../../components/flash card/FlashCard";
import "./QuizPage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Loader from "../../../components/loader/Loader";
//import { useParams } from "react-router-dom";

function QuizPage() {
  const [flashcards, setFlashcards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // let token = sessionStorage.getItem("token");
  // const axiosWithToken = axios.create({
  //   headers: { authorization: `Bearer ${token}` },
  // });

  // let params = useParams();
  // console.log(params);
  // dummy data
  // class cards {
  //   constructor(id, question, answer, categoryid) {
  //     this.id = id;
  //     this.question = question;
  //     this.answer = answer;
  //     this.categoryid = categoryid;
  //   }
  // }
  // let cardsList = [
  //   new cards(1, "Search Algos?", "LS and BS", 1),
  //   new cards(2, "Sort Algos", "BS,SS,QS,MS", 1),
  //   new cards(3, "Best Sort Algo", "Quick SOrt", 1),
  //   new cards(4, "Search Algos?", "LS and BS", 1),
  //   new cards(5, "Sort Algos", "BS,SS,QS,MS", 1),
  //   new cards(6, "Best Sort Algo", "Quick SOrt", 1),
  //   new cards(7, "Search Algos?", "LS and BS", 1),
  //   new cards(8, "Sort Algos", "BS,SS,QS,MS", 1),
  //   new cards(9, "Best Sort Algo", "Quick SOrt", 1),
  // ];
  // // //above is dummy data

  async function getFlashCards() {
    setIsLoading(true);
    let res = await axios.get(`http://localhost:3001/questions`);
    console.log("in quizpage", res.data);
    setFlashcards(res.data);
    setIsLoading(false);
    console.log(isLoading);
    console.log("flashcards:", flashcards);
  }

  useEffect(() => {
    getFlashCards();
  }, []);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#414042" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#414042" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    // className: "center",
    // centerMode: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="quiz-page   mx-auto">
      <div className="w-25 mx-auto">
        {isLoading === true ? (
          <Loader />
        ) : (
          <Slider {...settings}>
            {flashcards.map((card, index) => {
              return <FlashCard key={card.id} front={card.question} back={card.answer} />;
            })}
          </Slider>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
