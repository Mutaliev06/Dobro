import React from 'react';
import { useSelector } from 'react-redux';
import Preloader from '../Preloader';
import Slider from "react-slick";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  imgDiv: {
    // textAlign: '-webkit-center',
    backgroundColor: '#000841',
    minWidth: "96%"
  },
  img: {
    height: 480,
    width: '100%'
  }


}))

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
    margin: "auto",
    backgroundColor: "blue"

  };

  const classes = useStyles()

  const loading = useSelector((state) => state.notes.loading);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div>
      <h2>Мероприятия</h2>
      <Slider {...settings}>
        <div className={classes.imgDiv}>
          <img src="https://volonter.ru/wp-content/uploads/Glavnaya_slayder_3_1-e1523304811430-1.jpg" className={classes.img}  />
        </div>
        <div className={classes.imgDiv}>
          <img src="https://volonter.ru/wp-content/uploads/Glavnaya_slayder_1_3-1-e1523285081114-1.jpg" className={classes.img}/>
        </div>
        <div className={classes.imgDiv}>
          <img src="https://volonter.ru/wp-content/uploads/Glavnaya_slayder_3-1-e1523304754527-1.jpg" className={classes.img}/>
        </div>
      </Slider>
    </div>
  );
}