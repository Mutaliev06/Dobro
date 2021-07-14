import React from 'react';
import { useSelector } from 'react-redux';
import Preloader from '../Preloader';
import Slider from "react-slick";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  div: {
    height: "495px"
  },
  img:{
    width: "100%",
    height: "100%"
  },
  slideComponent: {
    marginBottom: "50px"
  },
  slider: {
    maxWidth: "90%",
    margin: 'auto'
  }
})

export default function SlideComponent(props) {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    width: "90%",
    height: "500px",
    backgroundSize: "cover",
    marginBottom: "50px"
  };

  const loading = useSelector((state) => state.notes.loading);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className={classes.slideComponent}>
      <h2>Мероприятия</h2>
      <Slider {...settings} className={classes.slider}>
        <div className={classes.div}>
          <img className={classes.img} src="https://volonter.ru/wp-content/uploads/Glavnaya_slayder_3_1-e1523304811430-1.jpg"/>
        </div>
        <div className={classes.div}>
          <img className={classes.img} src="https://volonter.ru/wp-content/uploads/Glavnaya_slayder_1_3-1-e1523285081114-1.jpg"/>
        </div>
        <div className={classes.div}>
          <img className={classes.img} src="https://volonter.ru/wp-content/uploads/Glavnaya_slayder_3-1-e1523304754527-1.jpg"/>
        </div>
      </Slider>
    </div>
  );
}