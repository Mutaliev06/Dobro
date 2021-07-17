import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Admin from '../Admin/Admin';
import Description from '../Main/Description';
import Home from '../Main/Home';
import NotFound from '../NotFound';
import { Container } from '@material-ui/core';

function Main(props) {
  return (
    <div>
      <Container>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login" exact>
            <SignIn/>
          </Route>
          <Route  path="/registration" exact>
            <SignUp/>
          </Route>
          <Route path="/admin" exact>
            <Admin/>
          </Route>
          <Route path='/notes/:id' exact>
            <Description/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default Main;