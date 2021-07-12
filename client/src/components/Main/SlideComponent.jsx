import React from 'react';
import { useSelector } from 'react-redux';
import Preloader from '../Preloader';
import Slider from "react-slick";

export default function SlideComponent(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    width: "100%",
    height: "500px",
    backgroundSize: "cover",
    margin: "auto"
  };

  const loading = useSelector((state) => state.notes.loading);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div>
      <h2>Мероприятия</h2>
      <Slider {...settings}>
        <div>
          <img src="https://volonter.ru/wp-content/uploads/Glavnaya_slayder_3_1-e1523304811430-1.jpg"/>
        </div>
        <div>
          <img src="https://volonter.ru/wp-content/uploads/Glavnaya_slayder_1_3-1-e1523285081114-1.jpg"/>
        </div>
        <div>
          <img src="https://volonter.ru/wp-content/uploads/Glavnaya_slayder_3-1-e1523304754527-1.jpg"/>
        </div>
      </Slider>
    </div>
  );
}