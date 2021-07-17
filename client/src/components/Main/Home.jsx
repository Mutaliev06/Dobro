import React from 'react';
import SlideComponent from './SlideComponent';
import Notes from './Notes';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  main: {
    display: "flex",
    flexDirection: 'column'
  }
})

function Home(props) {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <SlideComponent/>
      <Notes/>
    </div>
  );
}

export default Home;