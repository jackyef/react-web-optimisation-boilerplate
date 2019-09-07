# react-web-optimisation-boilerplate

A template created to learn web performance optimisation

## Introduction
`yarn dev:client` will run a server that serve static assets. The static assets will be requested by browsers.

`yarn dev:server` will run a frontend server that will generate the HTML document to the browser.

![image](https://user-images.githubusercontent.com/7252454/60248069-1562a180-98ec-11e9-904c-1447a7914b2a.png)

## Instruction
1. Install dependencies
```
yarn OR npm install
```
2. Setup .env file
```
cp .env.example .env
```
3. Run static assets server (this will be running on `localhost:3001`, configurable from .env file)
```
yarn dev:client
```
4. Run frontend server (this will be running on `localhost:3000`, configurable from .env file)
```
yarn dev:server
```
5. Go to `localhost:3000`, you should see stuffs.
6. Play around! Look at `./src/client/routes/Home` for starter.


## Commands
| Commands            | Purpose                                                        |
|---------------------|----------------------------------------------------------------|
| yarn                | install dependencies                                           |
| yarn stats          | run webpack-bundle-analyzer                                    |
| yarn build:client   | to build optimized bundle                                      |
| yarn build:server   | to build optimized server bundle                               |
| yarn dev:server     | to start development server for the server renderer            |
| yarn dev:client     | run webpack-dev-server with hot reload enabled for development | 


## Goals for performance optimisation
- Prepare full page that has the following
  - Header with searchbar and category sidebar (done)
  - Banner that occupies 50% of the page height (done)
  - Add some static text to fill the rest of the above the fold part (done)
  - Add product list from search below the fold (done)

vendor.js (89.29 KB)
client.js (28.74 KB)

- Lazyloadimg image (runtime performance) (prepare imageholder)
- React component profiling (runtime performance) 
  Show how to solve it from profiling, identifying where the problem lies, then fix it. 
- Lighthouse (show the initial score, explain about load performance) done
- Code splitting (prepare multi routes app, explain codesplitting)
- Server Side Rendering (SSR)
  - GraphQL SSR (with react-apollo)
- CSS-in-JS SSR
- React Helmet SEO
- Browser Rendering Optimization
- Webpack ?
- Nodejs + React + React Router ?
- Universal Redux ?