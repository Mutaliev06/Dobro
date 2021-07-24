import React, { useState } from "react";
import { useSelector } from "react-redux";
import Preloader from "../Preloader";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from '@brainhubeu/react-carousel';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { CardMedia } from "material-ui";
import ReactPlayer from "react-player";


const useStyles = makeStyles({
  imgDiv: {
    backgroundColor: "#000841",
    width: "100%",
    position: "relative",
    marginTop: "10px",
  },
  slideImg: {
    width: "100%",
    height: "500px",
    objectFit: "cover",
    userSelect: "none",
  },
  slider: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
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
  },
});

const imgArr = [
  {
    img: "https://cdn23.img.ria.ru/images/155724/99/1557249908_0:88:2560:1528_1920x0_80_0_0_c8054c76281283e0d8c5e6857fb8dc78.jpg",
    id: 0,
  },
  {
    img: "https://cdn.iz.ru/sites/default/files/styles/1920x1080/public/article-2020-03/KK300868_1.jpg?itok=_WnIjbJL",
    id: 1,
  },
  {
    img: "https://cdn22.img.ria.ru/images/07e4/05/08/1571165615_0:0:3072:1728_1920x0_80_0_0_3b8d795cc3d285852582c56e3084deb6.jpg",
    id: 2,
  },
];

const videos = [
  {
    id: 0,
    video: 'https://www.pexels.com/ru-ru/video/7469714/'
  },
  {
    id: 1,
    video: "https://www.pexels.com/ru-ru/video/7516757/"
  },
  {
    id: 2,
    video: "https://www.pexels.com/ru-ru/video/3209571/"
  },

];

export default function SlideComponent(props) {
  const classes = useStyles();
  const [current, setCurrent] = useState(0);
  const length = imgArr.length;
  const loading = useSelector((state) => state.notes.loading);

  if (loading) {
    return <Preloader />;
  }

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    // <div className={classes.slider}>
    //     <FaArrowAltCircleLeft className={classes.arrowLeft} onClick={prevSlide}/>
    //     <FaArrowAltCircleRight className={classes.arrowRight}  onClick={nextSlide}/>
    //   {
    //     imgArr.map((image, index) => {
    //       return(
    //         <div>
    //           {
    //             index === current && (
    //               <img className={classes.slideImg} src={image.img} alt=''/>
    //             )
    //           }
    //         </div>
    //
    //       )
    //     })
    //
    //   }
    // </div>

      //   <div className={classes.slider}>
      //   <FaArrowAltCircleLeft className={classes.arrowLeft} onClick={prevSlide}/>
      //   <FaArrowAltCircleRight className={classes.arrowRight}  onClick={nextSlide}/>
      // {
      //   videos.map((item, index) => {
      //   return(
      //   <div>
      // {
      //   index === current && (
      //   <ReactPlayer
      //     className={classes.slideImg}
      //   url={item.video}
      //   playing={true}
      //   muted={true}
      //   playbackRate={1}
      //   progressInterval={1000}
      //   width="100%"
      //   height="100%"
      //   />
      //   )
      // }
      //   </div>
      //
      //   )
      // })
      //
      // }
      //   </div>



      <div className={classes.slider}>
        <Carousel plugins={['arrows']}>
          {
            videos.map((item, index) => {
              return(
                <div>
                  {
                    index === current && (
                      <ReactPlayer
                        className={classes.slideImg}
                        url={item.video}
                        playing={true}
                        muted={true}
                        playbackRate={1}
                        progressInterval={1000}
                        width="100%"
                        height="300px"
                      />
                    )
                  }
                </div>

              )
            })

          }
        </Carousel>
      </div>

);
}
