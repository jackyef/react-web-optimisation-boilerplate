import React from 'react';
import { arrayOf, object } from 'prop-types';
import { graphql } from 'react-apollo';

import Carousel from '../../components/Carousel';
import IntroductionParagraphs from './components/IntroductionParagraphs';
// import topedThinking from './assets/toped-thinking.png';
import HomeQuery from './queries/home-query.graphql';

import './styles.css';

const Home = props => {
  const { slides, feedRecom } = props;

  return (
    <div className="homeContainer">
      <div>
        <Carousel banners={slides} />
        <IntroductionParagraphs />
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
