import { css } from 'react-emotion';

export const homeContainer = css`
  display: flex;
  min-height: 100vh;
  max-width: 100vw;
  padding: 16px;
  font-size: 24px;
  
  img {
    width: 300px;
    height: auto;
  }

  button {
    background: #42b579;
    color: white;
    border-radius: 4px;
    padding: 16px;
    border: none;
    outline: none;
    font-size: 1.2rem;
  }
`;