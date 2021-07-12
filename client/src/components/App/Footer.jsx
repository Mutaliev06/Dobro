import React from "react";
import { Container, Grid, makeStyles, Paper } from "@material-ui/core";
import {
  AiFillYoutube,
  GiLetterBomb,
  GrInstagram,
  RiInstagramFill,
  SiOdnoklassniki
} from 'react-icons/all';
const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#000841",
    height: 200,
    display: "flex",
    justifyContent: 'space-around',
    textAlign: "center",
    borderRadius: 10,


  },
  gridLeft: {
    width: 300,
    marginTop: 10,
    textAlign: 'start',
    display: 'flex',
    flexDirection: 'column'
  },
  a: {
    color: 'white'
  },
  iconDiv : {
    width: 200,
    display: 'flex',
    justifyContent: 'space-around'
  }

}));

function Footer(props) {
  const classes = useStyles();

  return (
    <Container fixed className={classes.paper}>
      <Grid>
        <Grid item xs={6} className={classes.gridLeft}>
          <a href='' className={classes.a}>Мероприятия</a>
          <a href='' className={classes.a} >Помощь животным</a>
          <a href='' className={classes.a}>Помошь людям</a>
          <a href='' className={classes.a}>Проекты</a>
          <a href='' className={classes.a}>О нас</a>
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
