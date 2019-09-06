import React from 'react';
import { arrayOf, object } from 'prop-types';

import './styles.css';

const Carousel = ({ banners }) => {
  console.log({ banners });

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

export default Carousel;