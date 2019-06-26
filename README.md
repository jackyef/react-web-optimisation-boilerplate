# react-web-optimisation-boilerplate

A template created to learn web performance optimisation

## Introduction
`yarn dev:client` will run a server that serve static assets. The static assets will be requested by browsers.

`yarn dev:server` will run a server that will generate the HTML document to the browser.

// TODO: put image of the architecture here

## Commands
| Commands            | Purpose                                                        |
|---------------------|----------------------------------------------------------------|
| yarn                | install dependencies                                           |
| yarn stats          | run webpack-bundle-analyzer                                    |
| yarn build:client   | to build optimized bundle                                      |
| yarn build:server   | to build optimized server bundle                               |
| yarn dev:server     | to start development server for the server renderer            |
| yarn dev:client     | run webpack-dev-server with hot reload enabled for development | 
