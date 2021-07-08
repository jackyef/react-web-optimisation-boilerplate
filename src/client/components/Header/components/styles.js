import { css } from 'react-emotion';

export const categorySidebarContainer = css`
  display: flex;
  padding: 16px;
  line-height: 1.2rem;
  transition: 0.3s ease-out;
  transform: translateX(-100vw);
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  box-shadow: -8px -9px 16px 3px #333;
  z-index: 20;
  max-width: 70vw;

  &.show {
    transform: translateX(0);
  }

  .hidden {
    display: none;
  }

  img {
    width: 36px;
    height: 36px;
    margin-right: 8px;
    object-fit: contain;
  }
`;

export const overlay = css`
  background: #333;
  opacity: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  transition: 0.3s ease-out;
  pointer-events: none;
`;

export const overlayActive = css`
  opacity: 0.6;
  pointer-events: auto;
`;

export const tabTitle = css`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;

  &.active {
    color: #42b579;
  }
`;

export const subItemHeading = css`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const subItem2Heading = css`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
`;

export const lowestItem = css`
  font-size: 0.85rem;
`;
