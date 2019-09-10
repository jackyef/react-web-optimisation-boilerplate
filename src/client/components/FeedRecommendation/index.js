import React from 'react';
import { arrayOf, object } from 'prop-types';
import { graphql } from 'react-apollo';
import Image from '../Image';

import FeedQuery from './queries/feed-query.graphql';

import * as css from './styles';

const FeedRecommendation = ({ feedRecom }) => {
  return (
    <div className={css.feedContainer}>
      <h1>Rekomendasi untuk Anda</h1>
      <div className={css.feedProductsContainer}>
        {feedRecom?.map((product, index) => {
          return (
            <div key={index} className={css.productCard}>
              <Image src={product.image_url} />
              <p>{product.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

FeedRecommendation.propTypes = {
  feedRecom: arrayOf(object),
};

FeedRecommendation.defaultProps = {
  feedRecom: [],
};

const gqlOptions = {
  options: {},
  props: ({ data }) => ({
    feedRecom: data?.get_home_recommendation?.recommendation_product?.product || [],
  }),
};

export default graphql(FeedQuery, gqlOptions)(FeedRecommendation);
