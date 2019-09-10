import React from 'react';
import { arrayOf, object } from 'prop-types';
import { graphql } from 'react-apollo';
import Image from '../Image';

import CarouselQuery from './queries/carousel-query.graphql';
import * as css from './styles';

const Carousel = ({ banners }) => {
  return (
    <div className={css.carouselContainer}>
      {banners.map((banner, index) => {
        const ImgElement = index > 0 ? Image : 'img';
        
        return <ImgElement key={banner.id} src={banner.image_url} alt={banner.title} />;
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