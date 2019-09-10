import { css, keyframes } from 'react-emotion';

const fadeIn = keyframes`
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
`;

export const loadedImageClass = css`
  animation: ${fadeIn} 0.3s;
`;
