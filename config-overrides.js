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
      vm: require.resolve("vm-browserify"),
      buffer: require.resolve("buffer"),
      https: require.resolve("https-browserify"),
      stream: require.resolve("stream-browserify"),
      url: require.resolve("url"),
      crypto: require.resolve("crypto-browserify"),
      querystring: require.resolve("querystring-es3"),
      "process/browser": require.resolve("process/browser")
    });
  config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"];
  
  // Optimize bundle size
  config.optimization = {
    ...config.optimization,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        crypto: {
          test: /[\\/]node_modules[\\/](@cosmjs|crypto-browserify|elliptic|secp256k1|bip39)[\\/]/,
          name: 'crypto',
          chunks: 'all',
          priority: 10,
        },
        material: {
          test: /[\\/]node_modules[\\/](@material-ui|mui-datatables)[\\/]/,
          name: 'material',
          chunks: 'all',
          priority: 9,
        }
      }
    }
  };
  
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
