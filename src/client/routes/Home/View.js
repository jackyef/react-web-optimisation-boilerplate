import React, { useContext, useCallback } from 'react';
import { arrayOf, object } from 'prop-types';
import { graphql } from 'react-apollo';

import { GlobalContext } from '../../context/global';
import topedThinking from './assets/toped-thinking.png';
import HomeQuery from './queries/home-query.graphql';

import './styles.css';

const Home = props => {
  const { slides, feedRecom } = props;
  const [globalState, globalDispatch] = useContext(GlobalContext);
  const { count } = globalState;

  const incrementCounter = useCallback(() => {
    globalDispatch({ type: 'INCREMENT_COUNTER' });
  }, [globalDispatch]);

  return (
    <div className="homeContainer">
      <div>
        <h1>Hello world!</h1>
        <img src={topedThinking} />

        <h4>Current counter value: {count}</h4>

        <button type="button" onClick={incrementCounter}>
          Click me to increase counter by 1
        </button>
        <div>
          <p>List of banners:</p>
          {slides.map(slide => {
            return <img key={slide.id} src={slide.image_url} alt={slide.title} />;
          })}
        </div>
        <hr />
        {feedRecom?.map((product, index) => {
          return (
            <div key={index}>
              <img src={product.image_url} />
              <p>{product.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Home.propTypes = {
  feedRecom: arrayOf(object).isRequired,
  slides: arrayOf(object).isRequired,
}

const gqlOptions = {
  options: {},
  props: ({ data }) => ({
    slides: data?.slides?.slides || [],
    feedRecom: data?.get_home_recommendation?.recommendation_product?.product || [],
  }),
};

export default graphql(HomeQuery, gqlOptions)(Home);
