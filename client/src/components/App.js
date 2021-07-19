import Header from './App/Header';
import Main from './App/Main';
import Footer from './App/Footer';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) =>({
    app: {
      height: "100vh",
      display: "flex",
      flexDirection: "column"
    }

}))

function App() {
  const classes = useStyles()
  return (
    <div className={classes.app}>
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
