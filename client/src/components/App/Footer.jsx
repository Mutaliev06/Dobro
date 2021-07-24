import React, { useEffect } from "react";
import { Container, Grid, makeStyles, Paper } from "@material-ui/core";

import { AiFillYoutube, GrInstagram } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";
import { loadCategories } from "../../redux/features/categories";
import { NavLink } from "react-router-dom";
import Main from './Main';
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",
    borderRadius: 10,
    marginTop: "auto",
    minWidth: "96%",
  },
  divGrid: {
    width: 570,
    marginTop: 10,
    textAlign: "start",
  },
  a: {
    color: "white",
  },
  iconDiv: {
    width: 200,
    display: "flex",
    justifyContent: "space-between",
  },
  gm: {
    fontSize: 40,
    width: 300,
  },

  linkCss: {
    textDecoration: "none",
    fontSize: 25,
    color: 'white'
  },

  divNavlink: {
    width: 300,
  },

  icon: {
    color: "white",
    textDecoration: 'none'
  },
  paper: {
    backgroundColor: "#000841",
    height: 200,
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",
    borderRadius: 10,
    marginTop: "auto",
    minWidth: "96%",
  },
  bottomDiv :{
    backgroundColor: '#21264f',
    height: 50,
    display: 'flex',
    justifyContent: 'space-around',
    textDecoration: 'none',
    borderRadius: 5,
  },
  divmain: {
    backgroundColor: "#000841",
    borderRadius: 5,
  },

  bottomGrid : {
    width: 50,
  },
  bottomA: {
    textDecoration: 'none',
    color: '#657c87',
    fontSize: 18,
  },
  rowDiv: {
    width: 570,
    textAlign: "start",
    color: '#657c87',
    textDecoration: 'none'
  },
  img: {
    width: 60,
    height: 40,
  },
  divImg: {
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center'
  },
  dobroru: {
    textDecoration: 'none',
    color: '#657c87',
  }

}));

function Footer(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const category = useSelector((state) => state.categories.items);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  return (
    <div>
      <div className={classes.divmain}>
        <div className={classes.container}>
          <div>
            <div  className={classes.divGrid}>
              {category?.map((item) => {
                return (

                  <div className={classes.divNavlink}>
                    <NavLink
                      to={`/category/${item._id}`}
                      className={classes.linkCss}
                    >
                      {" "}
                      {item.title}{" "}
                    </NavLink>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className={classes.divGrid}>
              <h3 className={classes.a}>Контакты</h3>
              <div className={classes.iconDiv}>
                <a href="https://intocode.ru/" className={classes.icon}>
                  intocode.ru
                </a>
                <a
                  href="https://www.instagram.com/intocode/?hl=ru"
                  className={classes.icon}
                >
                  <GrInstagram />
                </a>
                <a href="https://www.youtube.com/" className={classes.icon}>
                  <AiFillYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div >
          {/*<div className={classes.divImg}>*/}
          {/*  <div className={classes.a}><h2>При поддержке</h2></div>{'  '}*/}
          {/*  <div>*/}
          {/*    <img src='http://pngimg.com/uploads/polar_bear/small/polar_bear_PNG23522.png' className={classes.img}/>{' '}*/}
          {/*    <img src='http://pngimg.com/uploads/blm/blm_PNG61.png' className={classes.img} />{' '}*/}
          {/*    <img src='http://pngimg.com/uploads/vegan/small/vegan_PNG24.png' className={classes.img} />{' '}*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        <div className={classes.bottomDiv}>
          <div className={classes.rowDiv}>
            <a href='https://dobro.ru/terms' className={classes.bottomA}>Правила пользования</a>{' '}
            <a href='https://dobro.ru/privacy' className={classes.bottomA}>Политика конфиденциальности</a>
          </div>
          <div className={classes.rowDiv}><NavLink to={'/'} className={classes.dobroru}> © DOBRO.RU </NavLink></div>
        </div>
      </div>
    </div>

  );
}

export default Footer;
