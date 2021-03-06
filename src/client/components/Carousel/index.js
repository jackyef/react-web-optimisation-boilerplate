import React from 'react';
import { arrayOf, object } from 'prop-types';
import { graphql } from 'react-apollo';

import CarouselQuery from './queries/carousel-query.graphql';
import './styles.css';

const Carousel = ({ banners }) => {
  return (
    <div className="carouselContainer">
      {banners.map(banner => {
        return <img key={banner.id} src={banner.image_url} alt={banner.title} />;
      })} 
    </div>
  )
}

Carousel.propTypes = {
  banners: arrayOf(object),
};

Carousel.defaultProps = {
  banners: [],
};

const gqlOptions = {
  options: {},
  props: ({ data }) => ({
    banners: data?.slides?.slides || [],
  }),
};

export default graphql(CarouselQuery, gqlOptions)(Carousel);