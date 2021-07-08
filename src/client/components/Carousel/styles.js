import { css } from 'react-emotion';

export const carouselContainer = css`
  overflow-x: scroll;
  padding: 32px 16px 16px;
  white-space: nowrap;
  width: calc(100vw - 32px);
  height: calc(170/506 * (100vw - 32px));

  img {
    display: inline-block;
    border-radius: 8px;
    width: calc(100vw - 64px);
    margin-right: 16px;
    height: calc(170/506 * (100vw - 32px));
  }
`;
