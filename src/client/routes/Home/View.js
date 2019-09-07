import React from 'react';

import Carousel from '../../components/Carousel';
import FeedRecommendation from '../../components/FeedRecommendation';
import IntroductionParagraphs from './components/IntroductionParagraphs';
// import topedThinking from './assets/toped-thinking.png';
import './styles.css';

const Home = () => {
  return (
    <div className="homeContainer">
      <div>
        <Carousel />
        <IntroductionParagraphs />
        <FeedRecommendation />
      </div>
    </div>
  );
};

export default Home;
