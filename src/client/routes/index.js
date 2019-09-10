import React from 'react';
import { object } from 'prop-types';
import { Route, Switch } from 'react-router';
import { Router } from 'react-router-dom';

import { HomeView } from './Home';
import Header from '../components/Header';

import './styles.js';

const Routes = ({ history }) => {
  return (
    <Router history={history}>
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={HomeView} />
        </Switch>
      </>
    </Router>
  );
};

Routes.propTypes = {
  history: object.isRequired,
};

export default Routes;
