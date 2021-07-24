import React, { useEffect } from "react";
import SlideComponent from "./SlideComponent";
import Notes from "./Notes";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

function Home(props) {
  const classes = useStyles();

  useEffect(() => {
    document.title = "Главная";
  });

  return (
    <div className={classes.main}>
      <SlideComponent />
      <Notes />
    </div>
  );
}

export default Home;
