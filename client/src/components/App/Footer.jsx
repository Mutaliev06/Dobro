import React, { useEffect } from "react";
import { Container, Grid, makeStyles,} from "@material-ui/core";

import {
  AiFillYoutube,
  GrInstagram,
} from 'react-icons/all';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories } from '../../redux/features/categories';
import { NavLink } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#000841",
    height: 200,
    display: "flex",
    justifyContent: 'space-around',
    textAlign: "center",
    borderRadius: 10,
    marginTop: "auto",
    minWidth: "96%"
  },
  gridLeft: {
    width: 300,
    marginTop: 10,
    textAlign: 'start',
    fontSize: 20,
    textDecoration: 'none'

  },
  a: {
    color: 'white'
  },
  iconDiv : {
    width: 200,
    display: 'flex',
    justifyContent: 'space-around'
  },
  gm: {
    fontSize: 40,
  },

  linkCss: {
    // textDecoration: 'none'
  }

}));

function Footer(props) {
  const classes = useStyles();

  const dispatch = useDispatch()
  const category = useSelector((state) => state.categories.items)


  useEffect(() => {
    dispatch(loadCategories())
  },[dispatch])


  return (
    <Container className={classes.paper}>
      <Grid>
        <Grid item xs={6} className={classes.gridLeft}>
          {category?.map(item => {
            return (
              <p classname={classes.gm} >
               <NavLink to={`/notes/${item._id}`}  classname={classes.linkCss}> {item.title} </NavLink>
             </p>
            )
          })}
        </Grid>
      </Grid>
      <Grid>
        <Grid item xs={6}>
          <h3 className={classes.a}>Контакты</h3>
          <div className={classes.iconDiv}>
            <a href='https://intocode.ru/' >intocode.ru</a>
           <a href='https://www.instagram.com/intocode/?hl=ru'><GrInstagram/></a>
            <a href='https://www.youtube.com/'>
              <AiFillYoutube/>
            </a>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Footer;
