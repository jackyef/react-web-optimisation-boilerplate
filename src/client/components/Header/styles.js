import { css, injectGlobal } from 'react-emotion';

injectGlobal`
body, html {
  font-size: 16px;
`;

export const headerContainer = css`
  display: flex;
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  padding: 8px 48px;
  align-items: center;
  box-shadow: 0 -9px 14px 3px #333;
`;

export const headerContainerLogo = css`
  width: 200px;
  margin-right: 16px;
`;

export const headerContainerCategoryItem = css`
  width: 100px;
  text-align: center;
`;

export const headerContainerSearchInputContainer = css`
  flex: 1;
  margin-left: 16px;
  display: flex;

  input {
    display: block;
    flex: 1;
    outline: none;
    border: 1px solid #dedede;
    padding: 8px;
    border-radius: 8px;
    font-size: 1.2rem;
  }
`;
