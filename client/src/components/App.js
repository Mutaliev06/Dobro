import Header from './App/Header';
import Main from './App/Main';
import Footer from './App/Footer';
import { makeStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import React from 'react';
import SignIn from './App/SignIn';
import SignUp from './App/SignUp';
import Admin from './Admin/Admin';

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
      <Route path="/registration" exact>
        <SignUp/>
      </Route>
      <Route path="/admin" exact>
        <Admin/>
      </Route>
    </div>
  );
}

export default App;
