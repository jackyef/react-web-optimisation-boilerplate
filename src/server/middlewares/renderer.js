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
      <title>React Boilerplate</title>
      <script>
        window.isSSR = false;
      </script>
      <script defer src="http://localhost:${process.env.CLIENT_PORT}/client.js"></script>
      <script defer src="http://localhost:${process.env.CLIENT_PORT}/vendor.js"></script>
    </head>
    <body>
      <div id="root">This web-app need javascript to run.</div>
    </body>
    </html>
  `.trim();

  await next();
}

export default renderer;
