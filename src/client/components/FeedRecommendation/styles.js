import { css } from 'react-emotion';

export const feedContainer = css`
  padding: 16px;
`;

export const feedProductsContainer = css`
  display: flex;
  flex-wrap: wrap;
`;

export const productCard = css`
  display: inline-flex;
  width: 300px;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 2px 5px 3px #e0e0e0;
  margin: 0 8px 8px 0;

  img {
    width: 300px;
    height: 300px;
    object-fit: contain;
  }

  p {
    padding: 8px;
    font-size: 0.9rem;
  }
`;
