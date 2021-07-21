import Header from './App/Header';
import Main from './App/Main';
import Footer from './App/Footer';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Copyright from './Copyright';

const useStyles = makeStyles((theme) =>({
    app: {
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
      <Copyright/>
    </div>
  );
}

export default App;
