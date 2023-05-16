const webpack = require("webpack");

module.exports = function override(config, env) {
  (config.module = {
    rules: [
      ...config.module.rules,
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false
        }
      }
    ]
  }),
    (config.ignoreWarnings = [/Failed to parse source map/]),
    (config.resolve.fallback = {
      assert: false,
      fs: false,
      tls: false,
      net: false,
      http: false,
      buffer: require.resolve("buffer"),
      https: require.resolve("https-browserify"),
      stream: require.resolve("stream-browserify"),
      url: require.resolve("url"),
      crypto: require.resolve("crypto-browserify"),
      querystring: require.resolve("querystring-es3"),
      "process/browser": require.resolve("process/browser")
    });
  config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"];
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"]
    }),
    new webpack.ProvidePlugin({
      process: "process/browser"
    })
  ];

  return config;
};
