import Header from './App/Header';
import Main from './App/Main';
import Footer from './App/Footer';
import { makeStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import React from 'react';
import SignIn from './App/SignIn';

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
      <Route path="/" exact>
        <Header/>
        <Main/>
        <Footer/>
      </Route>
      <Route path="/login" exact>
       <SignIn/>
      </Route>
    </div>
  );
}

export default App;
