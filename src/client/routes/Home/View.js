import React, { useContext, useCallback } from 'react';
import { graphql } from 'react-apollo';

import { GlobalContext } from '../../context/global';
import topedThinking from './assets/toped-thinking.png';
import HomeQuery from './queries/home-query.graphql';

import { homeContainer } from './styles';

const Home = props => {
  const { data } = props;
  const [globalState, globalDispatch] = useContext(GlobalContext);
  const { count } = globalState;

  const incrementCounter = useCallback(() => {
    globalDispatch({ type: 'INCREMENT_COUNTER' });
  }, [globalDispatch]);

  return (
    <div className={homeContainer}>
      <div>
        <h1>Hello world!</h1>
        <img src={topedThinking} />
        
        <h4>
          Current counter value: {count}
        </h4>
        
        <button type="button" onClick={incrementCounter}>
          Click me to increase counter by 1
        </button>
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

const gqlOptions = {
  options: {},
  props: ({ data }) => ({
    data,
  }),
};

export default graphql(HomeQuery, gqlOptions)(Home);
