import React, { useState, lazy, Suspense } from 'react';
import Helmet from 'react-helmet-async';

import Carousel from '../../components/Carousel';
import IntroductionParagraphs from './components/IntroductionParagraphs';
import useIntersect from '../../hooks/useIntersect';

import * as css from './styles.js';

const FeedRecommendation = lazy(() =>
  import(/* webpackChunkName: "feed-recom" */ '../../components/FeedRecommendation')
);

const Home = () => {
  const [showFeed, setShowFeed] = useState(false);
  const targetRef = useIntersect(() => setShowFeed(true), null, true);

  return (
    <div className={css.homeContainer}>
      <Helmet>
        <title>Dummy Tokopedia | Belanja Online Mudah dan Nyaman</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:image"
          content="https://ecs7.tokopedia.net/img/og_image_default.jpg"
        />
        <meta name="p:domain_verify" content="50de202304b80ee007bc5d73425457ba" />
        <meta name="msvalidate.01" content="3104E882307BB6900F56D266DC8320F6" />
        <meta
          name="description"
          content="Situs jual beli online terlengkap dengan berbagai pilihan toko online terpercaya. Belanja online mudah dan menyenangkan di Tokopedia. Pengiriman cepat."
        />
        <meta
          property="og:description"
          content="Situs jual beli online terlengkap dengan berbagai pilihan toko online terpercaya. Belanja online mudah dan menyenangkan di Tokopedia. Pengiriman cepat."
        />
      </Helmet>
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
