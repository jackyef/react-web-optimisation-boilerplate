import React, { useState } from 'react';
import { string } from 'prop-types';

import useIntersect from '../../hooks/useIntersect';
import { loadedImageClass } from './styles';

const Image = ({ src, placeholderSrc, alt, className, ...rest }) => {
  // initialState taken from image cache
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoadImage = () => {
    // no need to create Image and setup listeners if we already loaded
    if (loaded && !error) {
      return;
    }

    const dummy = new window.Image();

    dummy.src = src;

    dummy.onload = () => {
      setLoaded(true);
    };
    dummy.onerror = () => setError(true);
  };

  const imageRef = useIntersect(handleLoadImage, null, true);
  const usedSrc = loaded && !error ? src : placeholderSrc;
  const classNames = loaded && !error ? `${loadedImageClass} ${className}` : className;

  return (
    <img
      src={usedSrc}
      className={classNames}
      ref={imageRef}
      alt={alt}
      crossOrigin="anonymous"
      {...rest}
    />
  );
};

Image.propTypes = {
  alt: string,
  className: string,
  placeholderSrc: string,
  src: string.isRequired,
};

Image.defaultProps = {
  alt: '',
  className: '',
  placeholderSrc:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAQAAACTbf5ZAAAAiklEQVR42u3PMQEAAAwCoNm/9Cr4Cw3IjYmwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsHDrASUpAHnJhbktAAAAAElFTkSuQmCC',
};

export default Image;
