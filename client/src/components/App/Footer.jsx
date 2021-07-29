import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import { AiFillYoutube, GrInstagram } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";
import { loadCategories } from "../../redux/features/categories";
import { NavLink } from "react-router-dom";
import Link from '@material-ui/core/Link';
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",
    borderRadius: 10,
    marginTop: "auto",
    padding: "30px 20px"
  },
  divGrid: {
    width: "100%",
    marginTop: 20,
    textAlign: "start",
    display: "flex",
    justifyContent: "space-around",
  },
  a: {
    color: "white",
  },
  iconDiv: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
  gm: {
    fontSize: 40,
    width: 300,
  },

  linkCss: {
    textDecoration: "none",
    fontSize: 16,
    color: 'white'
  },
  divNavLink: {
    width: 200,
  },
  divContact: {
    backgroundColor: "#e5266e",
    padding: "20px 10px",
    borderRadius: "5px"
  },
  category: {
    width: "50%"
  },
  contact: {
    width: "20%"
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
  },
  bottomDiv :{
    backgroundColor: '#21264f',
    height: 50,
    display: 'flex',
    justifyContent: 'space-around',
    textDecoration: 'none',
    borderRadius: 5,
    padding: "5px 20px"
  },
  divMain: {
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
    marginRight: "20px",
    marginLeft: "16px"
  },
  rowDiv1: {
    width: "50%",
    textAlign: "start",
    color: '#657c87',
    textDecoration: 'none'
  },
  rowDiv2: {
    width: "20%",
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
  dobroRu: {
    textDecoration: 'none',
    color: '#657c87',
  }

}));

function Footer() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const category = useSelector((state) => state.categories.items);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  return (
    <div>
      <div className={classes.divMain}>
        <div className={classes.container}>
          <div className={classes.category}>
            <div  className={classes.divGrid}>
              {category?.map((item) => {
                return (
                  <div className={classes.divNavLink}>
                    <NavLink
                      to={`/notes/category/${item._id}`}
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
          <div className={classes.contact}>
            <div className={classes.divContact}>
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
        <div className={classes.bottomDiv}>
          <div className={classes.rowDiv1}>
            <a href='https://dobro.ru/terms' className={classes.bottomA}>Правила пользования</a>{' '}
            <a href='https://dobro.ru/privacy' className={classes.bottomA}>Политика конфиденциальности</a>
          </div>
          <div className={classes.rowDiv2}>
            <Link
              className={classes.dobroRu}
              color="inherit"
              href="/">
              © DOBRO.RU
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
