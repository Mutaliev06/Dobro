import React, { useEffect } from 'react';
import SlideComponent from './SlideComponent';
import Notes from './Notes';
import Drawer from './Drawer'
import { makeStyles } from '@material-ui/core/styles';
import Preloader from '../Preloader';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  main: {

  },
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  hr: {
    marginTop: "64px"
  }
});

function Home(props) {
  const classes = useStyles();

  useEffect(() => {
    document.title = "Главная";
  });

  return (
    <div className={classes.main}>
      <Drawer/>
      <div className={classes.mainDiv}>
        <SlideComponent/>
        <hr className={classes.hr}/>
        <Notes/>
      </div>
    </div>
  );
}

export default Home;
