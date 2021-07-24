import React, { useState } from "react";
import { useSelector } from "react-redux";
import Preloader from "../Preloader";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-bootstrap/Carousel";
import video0 from "../../../src/pexels-mikhail-nilov-7469862.mp4";
import video1 from "../../../src/pexels-kampus-production-7516757.mp4";
import video2 from "../../../src/video.mp4";
import img0 from "../../../src/animal.png";
import img1 from "../../../src/people.png";
import img2 from "../../../src/peace.png";
import "bootstrap/dist/css/bootstrap.min.css";

const useStyles = makeStyles({
  imgDiv: {
    backgroundColor: "#000841",
    width: "100%",
    position: "relative",
    marginTop: "10px",
  },
  slideImg: {
    width: "100%",
    maxWidth: "1440px",
    height: "500px",
    userSelect: "none",
    objectFit: 'cover',
    borderRadius: "5px"
  },
  slider: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
    fontSize: "30px"
  },
  arrowLeft: {
    position: "absolute",
    top: "50%",
    left: "50px",
    fontSize: "40px",
  },
  arrowRight: {
    position: "absolute",
    top: "50%",
    right: "50px",
    fontSize: "40px",
  }
});


const videos = [
  {
    id: 0,
    video: video0,
    img: img0,
  },
  {
    id: 1,
    video: video1,
    img: img1,
  },
  {
    id: 2,
    video: video2,
    img: img2,
  },
];

export default function SlideComponent(props) {
  const classes = useStyles();
  const [current, setCurrent] = useState(0);
  const loading = useSelector((state) => state.notes.loading);

  const handleSelect = (selectedIndex, e) => {
    setCurrent(selectedIndex);
  };

  if (loading) {
    return <Preloader />;
  }
  return (
    <div className={classes.slider}>
      <Carousel
        prevLabel=""
        nextLabel=""
        activeIndex={current}
        onSelect={handleSelect}
      >
        {videos.map((item, index) => {
          return (
            <Carousel.Item className={classes.slideImg}>
              <video
                src={item.video}
                autoPlay={true}
                className={classes.slideImg}
                loop={true}
                playsInline={true}
                muted={true}
                poster={item.img}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
