module.exports = {
    devServer: {
      proxy: {
        "^/api": {
          target: "http://localhost:55022/api",
          changeOrigin: true,
          logLevel: "debug",
          pathRewrite: { "^/api": "/" }
            },
        '^/foo': {
            target: 'http://localhost:44372/api',
            changeOrigin: true,
            logLevel: "debug",
            pathRewrite: { "^/foo": "/" }
        }
      }
    }
  };