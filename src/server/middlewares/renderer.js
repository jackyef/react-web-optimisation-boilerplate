require('dotenv').config();

const renderer = async (ctx, next) => {
  console.log('Incoming request for url', ctx.url);
  /**
   * implement SSR later here.
   * For now it's just serving generic HTML that include script tags for main bundles (client and vendor)
   */

  ctx.set('content-type', 'text/html');
  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href="http://localhost:${process.env.CLIENT_PORT}/client.css" rel="stylesheet">
      <title>React Boilerplate</title>
      <script>
        window.isSSR = false;
      </script>
      <style>
        html, body {
            margin: 0;
            padding: 0;
            font-family: system-ui, Arial, sans-serif;
        }
      </style>
      </head>
      <body>
      <div id="root"></div>
      <noscript>This web-app need javascript to run.</noscript>
      <script src="http://localhost:${process.env.CLIENT_PORT}/client.js"></script>
      <script src="http://localhost:${process.env.CLIENT_PORT}/vendor.js"></script>
    </body>
    </html>
  `.trim();

  await next();
}

export default renderer;
