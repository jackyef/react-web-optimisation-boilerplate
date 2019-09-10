import React, { useState, lazy, Suspense } from 'react';

import Carousel from '../../components/Carousel';
import IntroductionParagraphs from './components/IntroductionParagraphs';
import useIntersect from '../../hooks/useIntersect';

import './styles.css';

const FeedRecommendation = lazy(() =>
  import(/* webpackChunkName: "feed-recom" */ '../../components/FeedRecommendation')
);

const Home = () => {
  const [showFeed, setShowFeed] = useState(false);
  const targetRef = useIntersect(() => setShowFeed(true), null, true);

  return (
    <div className="homeContainer">
      <div>
        <Carousel />
        <IntroductionParagraphs />
        {showFeed ? (
          <Suspense fallback={() => <div>loading...</div>}>
            <FeedRecommendation />
          </Suspense>
        ) : (
          <div ref={targetRef} style={{ height: '1px' }} />
        )}
      </div>
    </div>
  );
};

export default Home;
