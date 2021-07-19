import React from "react";
import { useSelector } from "react-redux";
import Preloader from "../Preloader";
import { makeStyles } from "@material-ui/core/styles";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
} from "mdb-react-ui-kit";

const useStyles = makeStyles ({
  imgDiv: {
    backgroundColor: "#000841",
    maxWidth: "96%",
  },
  img: {
    maxWidth: "100%",
  },
});

export default function SlideComponent(props) {
  const classes = useStyles();

  const loading = useSelector((state) => state.notes.loading);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className={classes.slide}>
      <h2>Мероприятия</h2>
      <MDBCarousel showControls interval={500}>
        <MDBCarouselInner className={classes.imgDiv} >
          <MDBCarouselItem itemId={0}>
            <MDBCarouselElement
              className={classes.img}
              src="https://cdn23.img.ria.ru/images/155724/99/1557249908_0:88:2560:1528_1920x0_80_0_0_c8054c76281283e0d8c5e6857fb8dc78.jpg"
              alt="..."
            />
          </MDBCarouselItem>
          <MDBCarouselItem itemId={1}>
            <MDBCarouselElement
              className={classes.img}
              src="https://cdn.iz.ru/sites/default/files/styles/1920x1080/public/article-2020-03/KK300868_1.jpg?itok=_WnIjbJL"
              alt="..."
            />
          </MDBCarouselItem>
          <MDBCarouselItem itemId={2}>
            <MDBCarouselElement
              className={classes.img}
              src="https://cdn22.img.ria.ru/images/07e4/05/08/1571165615_0:0:3072:1728_1920x0_80_0_0_3b8d795cc3d285852582c56e3084deb6.jpg"
              alt="..."
            />
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </div>
  );
}
