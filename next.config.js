/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    includePaths: ['./src/assets/scss'],
  },
  webpack: (config, { isServer }) => {
    // Add fallbacks for Node.js modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
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
    };

    // Handle SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false,
            titleProp: true,
          },
        },
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/images/',
            outputPath: 'static/images/',
          },
        },
      ],
    });

    // Add plugins
    config.plugins.push(
      new (require('webpack')).ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
        process: "process/browser"
      })
    );

    return config;
  },
  // For static export (if needed)
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
