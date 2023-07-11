const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://movies-lib-2zxy.onrender.com:3001',
      changeOrigin: true,
      "secure": false,
      headers: {
        "Connection": "keep-alive"
    },
    })
  );
};