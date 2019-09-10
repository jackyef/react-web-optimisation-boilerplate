import React from 'react';
import { object } from 'prop-types';
import { Route, Switch } from 'react-router';

import { HomeView } from './Home';
import Header from '../components/Header';

import './styles.js';

const Routes = () => {
  return (
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={HomeView} />
        </Switch>
      </>
  );
};

Routes.propTypes = {
  history: object.isRequired,
};

export default Routes;
