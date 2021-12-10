module.exports = {
  reactStrictMode: true,
  webpack: function (config) {

    config.resolve.fallback = { fs: false, path: false };

    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    })
    return config
  }
}
